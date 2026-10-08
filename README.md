# SMART KIDZZ Preschool & Kindergarten Website

SMART KIDZZ is a modern, child-friendly preschool and kindergarten website designed to attract parents, showcase the school experience, and encourage admissions. The project is a responsive landing page with engaging visuals, program details, teacher information, daily routines, testimonials, gallery highlights, and enrollment inquiry forms.

## Overview

This project presents a complete front-end experience for a preschool brand. It helps parents:

- understand the school mission and values
- explore age-based learning programs
- view daily schedules and classroom routines
- learn about teachers and staff
- review testimonials from families
- request a campus tour or child enrollment

The website is built as a static front-end project, making it fast, lightweight, and easy to customize.

## Features

- Attractive hero section with clear enrollment and tour calls-to-action
- Responsive navigation menu for desktop and mobile devices
- Program overview cards for toddler, nursery, junior kindergarten, and senior kindergarten
- Interactive daily routine timeline
- Teacher section with qualifications and roles
- Parent testimonials and trust-building content
- Gallery-style visual section
- Tuition calculator and fee summary
- Inquiry and enrollment modal forms
- Fully responsive design for different screen sizes

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Node.js built-in HTTP server for deployment
- Google Fonts
- Static image assets

## Project Structure

```text
pre-School/
├── index.html          # Main website page
├── styles.css          # Styling and responsive layout
├── script.js           # Interactive behaviors and UI logic
├── server.js           # Dependency-free web server for Render
├── package.json        # Start command
├── images/             # School and classroom images
├── .vscode/            # Editor configuration
└── README.md           # Project documentation
```

## How to Run

Since this is a static website, you can run it in two easy ways:

### Option 1: Open directly in a browser

Open `index.html` in any browser.

### Option 2: Run the web server

From the project folder, run:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

You can also run the site without Node.js using a local static server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deploying to Render

Deploy this project as a **Web Service**. Set the Root Directory to the folder containing `package.json`, use `yarn install` as the Build Command, and use `yarn start` as the Start Command. The server listens on Render's assigned `PORT`, so no port setting is needed.

## Customization

You can easily customize the project by editing:

- `index.html` for content, headings, schedules, forms, and sections
- `styles.css` for colors, spacing, layout, and style changes
- `script.js` for interactive behavior like menus, tabs, counters, and modals
- `images/` for new school or classroom photos

## Notes

This project is a front-end website only. It does not include a backend database, authentication, or server-side form processing. If you want to make the admissions forms functional, you can connect them to a backend service, email API, or CRM system.

## Recommended Next Enhancements

- Add real admissions form submissions via backend or email service
- Integrate a database for student inquiries
- Add animations and more interactive sections
- Convert to a React or Django-based application for scalability
- Add SEO improvements and meta tags for production deployment

## Summary

This project provides a polished preschool website template that can be used as a marketing landing page for a childcare or early-learning institution. It is clean, colorful, responsive, and suitable for showcasing a warm and engaging school environment.
