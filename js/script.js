// Sticky Navigation
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu (Hamburger)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Modal Logic
const modal = document.getElementById('enquiryModal');

function openModal() {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    }
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Initialize Intl Tel Input
const phoneInput = document.querySelector("#enquiry_mobile");
let iti;

if (phoneInput && window.intlTelInput) {
    iti = window.intlTelInput(phoneInput, {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
        separateDialCode: true,
        initialCountry: "auto",
        geoIpLookup: callback => {
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => callback(data.country_code))
                .catch(() => callback("us"));
        }
    });
}

// Form Submission using Formspree (No backend needed!)
const enquiryForm = document.querySelector('#tripEnquiryForm');
const submitBtn = document.querySelector('#enquirySubmitBtn');

if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Update button state
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        const formData = {
            // Email subject and reply-to
            _subject: '🎫 New Trip Enquiry - Rovers Vacations',
            _replyto: document.getElementById('enquiry_email').value,

            // Customer Details
            'Customer Name': document.getElementById('enquiry_name').value,
            'Email Address': document.getElementById('enquiry_email').value,
            'Mobile Number': iti ? iti.getNumber() : document.getElementById('enquiry_mobile').value,
            'Number of Travelers': document.getElementById('enquiry_members').value,

            // Additional Info
            'Enquiry Type': 'Trip Planning',
            'Submission Date': new Date().toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'short'
            })
        };

        try {
            // Send to Formspree - Replace YOUR_FORM_ID with your actual Formspree form ID
            const response = await fetch('https://formspree.io/f/xlggobpy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Enquiry submitted successfully! We will contact you soon.');
                enquiryForm.reset();
                if (iti) iti.setNumber('');
                closeModal();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit enquiry. Please try again or contact us directly at azzim811@gmail.com');
        } finally {
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Testimonial Slide (Simple Auto-scroll implementation)
const testimonialTrack = document.querySelector('.testimonials-grid');
if (testimonialTrack) {
    // Note: In case the user wants a more complex slider later, 
    // this handles the basic presence of cards.
    console.log('Testimonials initialized');
}

// Newsletter Form Submission using Formspree
const newsletterForm = document.querySelector('#newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter_email');
        const email = emailInput.value;
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;

        try {
            // Send to Formspree - Replace YOUR_NEWSLETTER_FORM_ID with your actual form ID
            const response = await fetch('https://formspree.io/f/xpqqodbw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _subject: '📧 New Newsletter Subscription - Rovers Vacations',
                    'Subscriber Email': email,
                    'Subscription Type': 'Newsletter',
                    'Subscription Date': new Date().toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        dateStyle: 'full',
                        timeStyle: 'short'
                    }),
                    'Source': 'Website Footer Newsletter Form'
                })
            });

            if (response.ok) {
                alert(`Thank you for subscribing! You'll receive our latest travel updates at ${email}`);
                newsletterForm.reset();
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Subscription failed. Please try again.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Scroll Reveal Animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

// Observe sections for scroll animations
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    observer.observe(section);
});

// Add reveal class styles dynamically for smooth animations
const style = document.createElement('style');
style.textContent = `
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section.reveal {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1 !important;
        transform: none !important;
    }
`;
document.head.appendChild(style);
