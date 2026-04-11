# Bookified: AI Learning Assistant | Changelog

## [ v0.5.0 ] – Create Book Page and Upload Form
**Release Date:** April 11, 2026

- **Restructured routing with root layout**
  - Created `(root)` directory and moved existing `page.tsx` into it.
- **Initialized book creation route**
  - Added `books/new/` directory within `(root)/` with its own `page.tsx`.
- **Built Create Book page structure**
  - Implemented header content and integrated form layout for book uploads.
- **Developed UploadForm component**
  - Created `UploadForm.tsx` as a `'use client'` component for interactive form handling.
  - Leveraged shadcn/ui components with React Hook Form for flexible and scalable form management.
- **Applied LLM-assisted UI scaffolding**
  - Used the same structured prompting approach as the homepage to generate and refine form UI components.
- **Prepared form system for future functionality**
  - Set up foundational structure for handling user input, validation, and submission logic.

---

## [ v0.4.0 ] – Homepage UI and Book Grid Implementation
**Release Date:** April 10, 2026

- **Implemented homepage layout**
  - Structured `app/page.tsx` with a hero section and dynamic book grid.
- **Built Hero section component**
  - Generated `Hero.tsx` using LLM-assisted UI scaffolding based on detailed prompt and design mockup.
- **Initialized book grid system**
  - Created a responsive grid layout to display library books on the homepage.
- **Added mock data and constants management**
  - Introduced `lib/constants.ts` to store reusable data, including sample book data for development.
- **Developed reusable BookCard component**
  - Built `BookCard.tsx` to display book cover, title, and author with dynamic routing.
  - Utilized typed props via `types.d.ts` for type safety and component consistency.
- **Enabled dynamic routing for books**
  - Linked each book card to a unique route using its slug.
- **Configured external image handling**
  - Updated `next.config.ts` to allow remote image sources for book covers.
- **Extended Next.js configuration**
  - Adjusted server action limits and TypeScript settings to support development workflow.

---

## [ v0.3.0 ] – Authentication Integration with Clerk
**Release Date:** April 10, 2026

- **Integrated Clerk authentication**
  - Configured Clerk for user authentication and session management across the app.
- **Implemented auth-aware UI in Navbar**
  - Added conditional rendering using `Show` to display sign-in/sign-up buttons or user controls based on auth state.
- **Added user session handling**
  - Utilized `useUser` hook to access authenticated user data within client components.
- **Displayed user-specific information**
  - Rendered the authenticated user’s first name in the navigation for a personalized UI experience.
- **Enabled user account management**
  - Integrated Clerk’s `UserButton` for profile access and account actions.
- **Streamlined setup using LLM-assisted integration**
  - Leveraged Clerk’s quickstart prompt with an LLM to efficiently scaffold required authentication components and configuration.


---

## [ v0.2.0 ] - Navbar Component and Navigation State Handling
**Release Date:** April 9, 2026

- **Implemented Navbar component**
  - Created a reusable `Navbar.tsx` client component for global navigation.
- **Structured navigation configuration**
  - Defined a `navItems` array to manage route labels and paths for scalable link management.
- **Integrated Next.js navigation hooks**
  - Used `usePathname` to access the current route for dynamic UI updates.
- **Added active link state handling**
  - Implemented conditional logic to highlight active routes, including nested paths.
- **Built dynamic navigation rendering**
  - Mapped `navItems` to generate navigation links with conditional styling.
- **Prepared static assets**
  - Organized `/assets` directory and integrated logo using Next.js `Image` component.

---

## [ v0.1.0 ] - Project Setup
**Release Date**: April 8, 2026

- **Initialized project foundation**
    - Created Next.js application using the app router as the core framework.
- **Installed and configured UI dependencies**
    - Integrated shadcn/ui for reusable, accessible component styling.
- **Established global styling system**
    - Customized base styles and theme to ensure consistent design across the app.
- **Set up initial layout structure**
    - Created a minimal base layout to serve as a scalable starting point for future features.

---

<section align="center">
  <code>coderBri © 2026</code>
</section>