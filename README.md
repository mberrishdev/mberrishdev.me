# Mikheil Berishvili – Portfolio

A minimal, elegant, and responsive personal portfolio built with Next.js and Tailwind CSS.

## Features
- Clean, modern design with good spacing and clear typography
- Responsive layout for all devices
- Intro section with name, bio, and contact info
- Companies section with logos and roles
- Projects section loaded from GitHub and custom highlights
- Scroll-to-top button for easy navigation
- Social/meta image for sharing (Open Graph & Twitter)
- **Easy meta tag customization via JSON**

## Tech Stack
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure
- `src/app/` – Main app and page components
- `src/data/companies.json` – Companies data
- `src/data/meta.json` – Site meta tags (title, description, social image, etc.)
- `src/components/ScrollToTopButton.tsx` – Scroll-to-top button
- `public/companies/` – Company logos
- `public/og-image.png` – Social/meta image (update as needed)

## Customization
- Update your info in `src/data/companies.json` and project data source
- **Update site meta tags in `src/data/meta.json`** (title, description, Open Graph/Twitter image, etc.)
- Replace `public/og-image.png` with your own Open Graph image for better social sharing

## Meta Tag Customization
All meta tags (title, description, Open Graph/Twitter image, etc.) are managed in `src/data/meta.json`. Just edit this file to update your site's meta info for SEO and social sharing. No code changes needed!

Example `src/data/meta.json`:
```json
{
  "title": "Mikheil Berishvili – Portfolio",
  "description": "Full-Stack Developer from Georgia 🇬🇪",
  "ogImage": "/og-image.png",
  "twitterHandle": "@mberrishdev",
  "siteUrl": "https://mberrishdev.me"
}
```

## Contact
- **Email:** [mikheil.berishvili@outlook.com](mailto:mikheil.berishvili@outlook.com)
- **LinkedIn:** [linkedin.com/in/mberrishdev](https://linkedin.com/in/mberrishdev)
- **Phone:** +995 591 30 05 69

