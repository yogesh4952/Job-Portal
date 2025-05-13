import express from "express";
import {
  ChangeJobApplicationsStatus,
  changeVisibility,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a company
router.post("/register", upload.single("image"), registerCompany);

// Company login
router.post("/login", loginCompany);

// Get company Data
router.get("/", protectCompany, getCompanyData);

// Post a job
router.post("/post-job", protectCompany, postJob);

// Get applicants data of company
router.get("/applicants", protectCompany, getCompanyJobApplicants);

// Get company job list
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);

// Change Applications Status
router.post("/change-status", protectCompany, ChangeJobApplicationsStatus);

// Change Applications Visibility
router.post("/change-visibility", protectCompany, changeVisibility);

export default router;
