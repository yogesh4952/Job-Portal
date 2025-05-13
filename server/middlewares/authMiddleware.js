import Company from "../models/Company.js";
import jwt from "jsonwebtoken";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token; // Now we look for the custom token header

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized, Login Again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.company = await Company.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Token invalid or expired",
    });
  }
};
