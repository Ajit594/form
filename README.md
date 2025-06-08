# Matrix Registration Form

A modern, responsive registration form built with **React**, **React Router**, and **Tailwind CSS**. The app features real-time validation, a Matrix-themed animated GIF background, and a details page to review submitted data.

![Matrix GIF Background](https://media.giphy.com/media/WoD6JZnwap6s8/giphy.gif)

## Features

- **Matrix GIF background** that covers the entire viewport, even while scrolling
- Responsive and accessible form UI using Tailwind CSS
- Real-time validation with helpful error messages
- Prevents use of temporary email domains
- Password visibility toggle
- Country and city dropdowns with dynamic options
- Details page to review submitted form data
- Navigation between form and details using React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/matrix-registration-form.git
   cd matrix-registration-form
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── App.jsx         # Main app with Matrix GIF background and routing
├── Form.jsx        # Registration form component
├── Details.jsx     # Details review component
├── App.css         # Global styles (includes Tailwind and background fixes)
└── index.js        # Entry point
```

## Customization

- **Styling:**  
  All styling is done with Tailwind CSS utility classes. You can further customize the look by editing class names or extending Tailwind config.

## Notes

- The form uses real-time validation and only shows errors after a field is touched.
- Default browser autofill backgrounds are overridden for consistent appearance.

## License

MIT

---

**Made with ❤️ and React**