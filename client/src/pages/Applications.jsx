import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import moment from "moment";
import { assets } from "../assets/assets";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Applications = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
    isLoadingUserData,
  } = useContext(AppContext);

  const updateResume = async () => {
    if (!resume) {
      toast.error("Please select a resume file.");
      return;
    }

    console.log("Starting resume update with file:", resume);
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();
      console.log("Sending request with token:", token);
      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update resume response:", data);
      if (data.success) {
        toast.success(data.message);
        console.log("Fetching user data after resume update");
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("updateResume error:", error);
      toast.error(error.message);
    }
    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        {isLoadingUserData ? (
          <p>Loading resume...</p>
        ) : userData ? (
          <div className="flex gap-2 mb-6 mt-3">
            {isEdit || !userData.resume ? (
              <>
                <label className="flex items-center" htmlFor="resumeUpload">
                  <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 border border-blue-200">
                    {resume ? resume.name : "Select Resume"}
                  </p>
                  <input
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.type === "application/pdf") {
                        console.log("Selected file:", file);
                        setResume(file);
                      } else {
                        toast.error("Please select a valid PDF file.");
                      }
                    }}
                    accept="application/pdf"
                    type="file"
                    hidden
                    name=""
                    id="resumeUpload"
                  />
                  <img src={assets.profile_upload_icon} alt="Upload icon" />
                </label>
                <button
                  onClick={updateResume}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-lg border border-green-300 hover:border-green-400 transition"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <a
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:border-blue-300 transition"
                  href={userData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
                <button
                  onClick={() => setIsEdit(true)}
                  className="text-gray-500 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-red-600">Failed to load resume data.</p>
            <button
              onClick={fetchUserData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
            >
              Retry
            </button>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white border border-gray-100 rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-100 text-left">
                Company
              </th>
              <th className="py-3 px-4 border-b border-gray-100 text-left">
                Job Title
              </th>
              <th className="py-3 px-4 border-b border-gray-100 text-left max-sm:hidden">
                Location
              </th>
              <th className="py-3 px-4 border-b border-gray-100 text-left max-sm:hidden">
                Date
              </th>
              <th className="py-3 px-4 border-b border-gray-100 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {userApplications.length > 0 ? (
              userApplications.map((job, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-100 align-middle">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-8 h-8"
                        src={job.companyId.image}
                        alt={`${job.companyId.name} logo`}
                      />
                      <span>{job.companyId.name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100 align-middle">
                    {job.jobId.title}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100 max-sm:hidden align-middle">
                    {job.jobId.location}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100 max-sm:hidden align-middle">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-100 align-middle">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : job.status === "Rejected"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      } px-4 py-1.5 rounded`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
