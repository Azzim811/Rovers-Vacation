# Rovers Vacations - Travel Website

A modern, responsive travel agency website featuring a clean design, tour packages, testimonials, and an enquiry system with international phone number support.

## 🚀 Technologies Used

### Frontend
- **HTML5 & CSS3**: Custom-built using semantic HTML and vanilla CSS for high performance and design flexibility.
- **JavaScript (ES6+)**: Handles UI interactions, modal logic, and form submissions.
- **Google Fonts**: Uses 'Poppins' and 'Montserrat' for a premium typography experience.
- **Ionicons**: High-quality SVG icons for a modern look.

### Backend
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Nodemailer**: Module for Node.js applications to allow easy email sending.
- **Dotenv**: Zero-dependency module that loads environment variables from a `.env` file.

## 📦 Key Packages & Libraries

### Frontend Libraries
- **[intl-tel-input](https://github.com/jackocnr/intl-tel-input)**: Used for the international phone number input with flag dropdowns and automatic dial code formatting.

### Backend Dependencies
- `express`: Core web server framework.
- `nodemailer`: Handles email enquiries sent from the contact form.
- `dotenv`: Manage sensitive configuration (like email credentials).
- `cors`: Cross-Origin Resource Sharing for backend-frontend communication.
- `body-parser`: Middleware to parse incoming request bodies.

## 🛠️ Setup and Installation

1. **Clone the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```
4. **Run the server**:
   ```bash
   npm start
   ```
   The website will be available at `http://localhost:3000`.

## ✨ Features
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices.
- **Enquiry Modal**: Interactive form with international phone validation.
- **Animations**: Smooth scroll animations and hover effects for an engaging user experience.
- **Sticky Navbar**: Transparent navbar that blurs on scroll.
