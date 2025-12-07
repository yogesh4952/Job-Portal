# Job Portal

A full-stack job portal designed to connect job seekers with employers. This platform allows users to browse and apply for jobs, while recruiters can post opportunities, manage listings, and view applications through a dedicated dashboard.

## Features

- **Dual Authentication System**: Secure sign-in/sign-up for job seekers via Clerk and a separate JWT-based authentication for recruiters.
- **Recruiter Dashboard**: A dedicated panel for recruiters to post new jobs, manage existing listings (toggle visibility), and view all applications for their postings.
- **Job Seeker Experience**: Users can search for jobs by title and location, apply for positions with their saved resume, and track the status of their applications.
- **Dynamic Filtering**: Filter job listings by categories and locations.
- **Rich Text Job Descriptions**: Employers can create detailed and formatted job descriptions using a rich text editor.
- **File Uploads**: Supports image uploads for company logos and PDF uploads for user resumes, handled via Cloudinary.
- **Responsive Design**: A mobile-first, responsive interface built with Tailwind CSS and daisyUI.

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, daisyUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **User Authentication**: Clerk
- **Recruiter Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary, Multer
- **Deployment**: Vercel (Frontend), Render (Backend)

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB URI
- Clerk API Keys
- Cloudinary Account Credentials

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yogesh4952/job-portal.git
    cd job-portal
    ```

2.  **Set up the Backend:**
    Navigate to the `server` directory and install the dependencies.
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory and add the following environment variables:
    ```env
    JWT_SECRET=your_jwt_secret
    MONGODB_URI=your_mongodb_uri
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
    CLOUDINARY_NAME=your_cloudinary_name
    CLERK_SECRET_KEY=your_clerk_secret_key
    CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
    ```
    Start the backend server:
    ```bash
    npm run server
    ```

3.  **Set up the Frontend:**
    In a new terminal, navigate to the `client` directory and install the dependencies.
    ```bash
    cd client
    npm install
    ```
    Create a `.env` file in the `client` directory and add the following:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    VITE_BACKEND_URL=http://localhost:5000
    ```
    Start the frontend development server:
    ```bash
    npm run dev
    ```

4.  **Access the Application:**
    Open your browser and go to `http://localhost:5173`.

## Screenshots

**Light Mode**
![Light Mode View](https://raw.githubusercontent.com/yogesh4952/Job-Portal/main/client/public/image.png)

**Dark Mode**
![Dark Mode View](https://raw.githubusercontent.com/yogesh4952/Job-Portal/main/client/public/image-1.png)

**Recruiter Dashboard**
![Recruiter Dashboard](https://raw.githubusercontent.com/yogesh4952/Job-Portal/main/client/public/image-2.png)

## Deployment

The application is deployed and can be accessed at: [job-portal-hazel-gamma.vercel.app](https://job-portal-hazel-gamma.vercel.app)
