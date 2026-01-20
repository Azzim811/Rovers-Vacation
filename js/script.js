// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Active Link Handling
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
    item.addEventListener('click', function () {
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');

        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Set active based on hash on load
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const activeLink = document.querySelector(`.nav-links a[href="${hash}"]`);
        if (activeLink) {
            navItems.forEach(nav => nav.classList.remove('active'));
            activeLink.classList.add('active');
        }
    }
});

// Modal Functionality
const modal = document.getElementById('enquiryModal');

function openModal() {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Hero Slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Initialize Intl Tel Input
const phoneInput = document.querySelector("#enquiry_mobile");
let iti;
if (phoneInput) {
    iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
        separateDialCode: true,
        initialCountry: "auto",
        dropdownContainer: document.body, // Attachment to body is CRITICAL for iOS in modals
        autoPlaceholder: "polite",
        geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("in")); // Default to 'in' or 'us'
        },
    });
}

// Toast Notification Function
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'success' : 'error'}`;

    const iconName = type === 'success' ? 'checkmark-circle-outline' : 'alert-circle-outline';
    const title = type === 'success' ? 'Success' : 'Error';

    toast.innerHTML = `
        <div class="toast-icon">
            <ion-icon name="${iconName}"></ion-icon>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-close" onclick="this.parentElement.remove()">
            <ion-icon name="close-outline"></ion-icon>
        </div>
    `;

    container.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'toastSlideOut 0.5s ease forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }
    }, 5000);
}

// Handle Form Submission
const enquiryForm = document.getElementById('tripEnquiryForm');
if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('enquiry_name').value;
        const mobile = iti ? iti.getNumber() : document.getElementById('enquiry_mobile').value;
        const email = document.getElementById('enquiry_email').value;
        const members = document.getElementById('enquiry_members').value;

        const submitBtn = document.getElementById('enquirySubmitBtn');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, mobile, email, members }),
        })
            .then(response => {
                if (response.ok) {
                    showToast('Enquiry submitted successfully!', 'success');
                    enquiryForm.reset();
                    if (iti) iti.setCountry(iti.getSelectedCountryData().iso2); // Reset phone state
                    closeModal();
                } else {
                    showToast('Failed to submit. Please try again.', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('Server connection error. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});
