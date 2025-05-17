# Job Portal

A full-stack Job Portal application designed to connect job seekers with employers. This platform allows users to browse and apply for jobs, while employers can post and manage job listings.

## Features

- **User Authentication**: Secure login and registration for both job seekers and employers.
- **Job Listings**: Employers can create, update, and delete job postings.
- **Job Applications**: Job seekers can apply to available positions.
- **Responsive Design**: Optimized for various devices to ensure a seamless user experience.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Vercel (Frontend), Render (Backend)

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database (local or hosted).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yogesh4952/Job-Portal.git
   cd Job-Portal
   ```

2. **Setup Backend**:

   ```bash
   cd server
   npm install
   ```

   - Create a `.env` file in the `server` directory and add the following:

     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

   - Start the backend server:

     ```bash
     npm start
     ```

3. **Setup Frontend**:

   ```bash
   cd ../client
   npm install
   ```

   - Create a `.env` file in the `client` directory and add the following:

     ```env
     REACT_APP_API_URL=http://localhost:5000
     ```

   - Start the frontend development server:

     ```bash
     npm start
     ```

4. **Access the Application**:

   Open your browser and navigate to `http://localhost:3000` to use the Job Portal.

## Deployment

The application is deployed and accessible at: [job-portal-hazel-gamma.vercel.app](https://job-portal-hazel-gamma.vercel.app)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is open-source and available under the [MIT License](LICENSE).