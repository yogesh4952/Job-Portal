import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

// Get user data
export const getUserData = async (req, res) => {
  // const userId = req.auth.userId;
  const { userId } = req.headers;

  try {
    const user = await User.findOne(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found ",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  // Validate jobId
  if (!jobId) {
    return res
      .status(400)
      .json({ success: false, message: "Job ID is required" });
  }
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ success: false, message: "Invalid Job ID" });
  }

  try {
    // Check if user has already applied
    const alreadyApplied = await JobApplication.findOne({ jobId, userId });
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // Find job by _id
    const jobData = await Job.findOne({ _id: jobId });
    if (!jobData) {
      return res
        .status(404)
        .json({ success: false, message: "Job not found." });
    }

    // Create job application
    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: new Date(),
    });

    res.status(200).json({
      success: true,
      message: "Applied successfully.",
    });
  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Get user applied applications
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    if (!applications) {
      return res.json({
        success: false,
        message: "No Job applications found for this user",
      });
    }

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Update user profile (resume)

import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = new Clerk({ apiKey: process.env.CLERK_SECRET_KEY });

export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId; // Clerk user ID
    console.log("Updating resume for userId:", userId);

    const resumeFile = req.file;
    console.log("Resume file:", resumeFile);

    // Find user by _id (Clerk user ID)
    let userData = await User.findById(userId);
    if (!userData) {
      console.log("Creating new user for userId:", userId);

      // Fetch user data from Clerk
      const clerkUser = await clerk.users.getUser(userId);
      if (!clerkUser) {
        console.error("Clerk user not found:", userId);
        return res.status(404).json({
          success: false,
          message: "Clerk user not found",
        });
      }

      userData = new User({
        _id: userId,
        email:
          clerkUser.emailAddresses?.[0]?.emailAddress ||
          `user_${userId}@example.com`,
        name:
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          "Unknown User",
        image: clerkUser.imageUrl || "https://via.placeholder.com/150", // Use Clerk image or fallback
        resume: "",
      });
      await userData.save();
      console.log("New user created:", userData);
    }

    if (!resumeFile) {
      console.error("No resume file provided");
      return res.status(400).json({
        success: false,
        message: "No resume file provided",
      });
    }

    // Upload resume to Cloudinary
    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path, {
      folder: "resumes",
    });
    console.log("Cloudinary upload result:", resumeUpload);

    // Update user's resume field
    userData.resume = resumeUpload.secure_url;
    await userData.save();

    console.log("User updated successfully:", userData);

    return res.json({
      success: true,
      message: "Resume updated successfully",
    });
  } catch (error) {
    console.error("Error in updateUserResume:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
