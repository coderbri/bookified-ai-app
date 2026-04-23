# Bookified: AI Learning Assistant | Changelog

## [ v0.8.0 ] – Fetch Books from Database
**Release Date:** April 23, 2026

- **Implemented book retrieval query**
  - Added `getAllBooks` server action to fetch books from MongoDB.
  - Supported optional search functionality using case-insensitive regex on title and author.
  - Escaped user input with `escapeRegex` to prevent malformed queries or security issues.
  - Sorted results by `createdAt` (newest first) for better UX.
  - Serialized Mongoose documents for safe client consumption.
- **Integrated database data into homepage**
  - Replaced mock data with live database queries in `app/(root)/page.tsx`.
  - Converted page component to async server component for direct data fetching.
  - Mapped over fetched books to render `BookCard` components dynamically.
- **Added defensive data handling**
  - Ensured fallback to an empty array when query fails or returns undefined.
  - Prevented runtime errors during rendering.
- **Updated image configuration for external sources**
  - Configured `next.config.ts` to allow remote images from Vercel Blob storage.
  - Resolved image loading errors caused by newly integrated database content.
- **Completed transition from static to dynamic data**
  - Fully replaced mock dataset with persistent database-backed content.


---

## [ v0.7.1 ] – Create Book Flow and File Processing Pipeline (Part 2)
**Release Date:** April 23, 2026

- **Diagnosed upload failures in local development**
  - Identified environment variable issues preventing successful Blob storage uploads.
  - Verified UI feedback flow (loading state and toast error handling).
- **Deployed application to Vercel**
  - Deployed project to enable full environment configuration and access to Vercel storage features.
  - Retrieved required Blob storage environment variables from Vercel dashboard.
- **Configured Vercel Blob storage**
  - Created Blob store (Fast Object Storage) with public access.
  - Selected region based on proximity for performance optimization.
  - Added generated storage credentials to environment variables.
- **Implemented server-side upload route**
  - Created `app/api/upload/route.ts` to securely handle file uploads.
  - Integrated `handleUpload` from `@vercel/blob/client` for direct client-to-storage uploads.
- **Secured upload pipeline with authentication**
  - Used Clerk’s `auth()` to validate user identity before അനുവദing uploads.
  - Rejected unauthorized requests with appropriate error handling.
- **Enforced upload constraints and validation**
  - Restricted allowed file types (PDF and image formats).
  - Applied maximum file size limits using shared constants.
  - Enabled random suffix generation to prevent filename collisions.
- **Added upload lifecycle handling**
  - Implemented `onBeforeGenerateToken` to validate user and define upload rules.
  - Implemented `onUploadCompleted` to log uploaded file metadata and prepare for future analytics integration.
- **Standardized API error handling**
  - Returned structured JSON responses with appropriate HTTP status codes.
  - Differentiated between authentication and general upload failures.
- **Completed end-to-end upload functionality**
  - Established secure, scalable pipeline from client upload → server validation → Blob storage.

---

## [ v0.7.0 ] – Create Book Flow and File Processing Pipeline (Part 1)
**Release Date:** April 17, 2026

- **Implemented server actions for book creation**
  - Created `lib/actions/book.actions.ts` to handle database operations using server actions.
  - Added `checkBookExists` to prevent duplicate books by generating a slug and querying the database.
  - Built `createBook` to insert a new book document or return an existing one if already present.
  - Implemented `saveBookSegments` to batch insert parsed text segments and update total segment count.
  - Centralized error handling and response structure for consistent API behavior.
- **Enhanced utility layer for data processing**
  - Added `generateSlug` to normalize titles into URL-friendly identifiers.
  - Introduced `serializeData` to convert Mongoose documents into plain JSON objects.
  - Built `splitIntoSegments` to chunk large text into overlapping segments for search and AI processing.
  - Implemented `parsePDFFile` to:
    - Extract full text content from uploaded PDFs.
    - Generate a cover image from the first page using canvas.
    - Convert text into structured segments for database storage.
- **Integrated file upload and storage workflow**
  - Used Vercel Blob API to upload PDF files and cover images.
  - Supported both user-uploaded covers and auto-generated covers from parsed PDFs.
- **Added form validation with Zod**
  - Created `UploadSchema` to validate inputs (title, author, PDF, optional image).
  - Enforced file size/type constraints for reliability and security.
- **Implemented UploadForm submission flow**
  - Validates authentication before allowing uploads.
  - Checks for existing books and redirects if a duplicate is found.
  - Parses uploaded PDF to extract text and generate cover.
  - Uploads PDF and cover image to cloud storage.
  - Creates book record in database with metadata and file references.
  - Saves parsed text segments for search and AI processing.
  - Handles success/error states with toast notifications and redirects.
- **Improved user feedback and UX**
  - Integrated `sonner` toaster for real-time success/error messages.
  - Added loading overlay during async operations to prevent duplicate submissions.

---

## [ v0.6.0 ] – Database Integration and Schema Design
**Release Date:** April 16, 2026

- **Set up MongoDB Atlas database**
  - Created cloud cluster using free tier with AWS provider and automatic security configuration.
  - Selected region based on proximity for lower latency.
- **Established database connection layer**
  - Installed `mongodb` and `mongoose` dependencies.
  - Stored connection string securely in environment variables.
  - Implemented `database/mongoose.ts` to manage database connections.
    - Used a global cache to persist connections across hot reloads in development.
    - Prevented multiple connections by reusing an existing promise/connection.
    - Added error handling and logging for connection reliability.
- **Implemented Book schema and model**
  - Created `book.model.ts` using Mongoose schema aligned with `IBook` TypeScript interface.
  - Defined required fields (title, author, file metadata) and optional fields (persona, cover).
  - Enforced uniqueness and formatting on `slug` for clean routing.
  - Enabled timestamps for automatic tracking of creation and updates.
- Designed BookSegment schema for content processing
  - Created `book-segment.model.ts` to store segmented book content.
  - Linked segments to parent book using ObjectId references.
  - Added indexing for efficient querying by book, segment order, and page number.
  - Implemented compound unique index (`bookId + segmentIndex`) to prevent duplicate segments.
  - Enabled full-text search indexing on content for future AI/query features.
- **Built VoiceSession schema for usage tracking**
  - Created `voice-session.model.ts` to track user voice interactions.
  - Stored session duration, timestamps, and billing period data.
  - Indexed fields for efficient queries on user activity and billing cycles.
- **Standardized model structure**
  - Used `models || model` pattern to prevent model recompilation issues in Next.js.
  - Maintained type safety by aligning all schemas with shared TypeScript interfaces.

---

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