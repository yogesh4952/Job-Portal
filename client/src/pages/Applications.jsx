import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import moment from "moment";
import { assets } from "../assets/assets";
import Footer from "../Components/Footer";
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
      toast.error("Please select a resume file.", {
        theme: "colored",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/users/update-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        await fetchUserData();
      } else {
        toast.error(data.message, {
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
      });
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
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 bg-base-100 text-base-content">
        <h2 className="text-xl font-semibold mb-4">Your Resume</h2>
        {isLoadingUserData ? (
          <p className="text-base-content/80">Loading resume...</p>
        ) : userData ? (
          <div className="flex flex-wrap gap-4 mb-6 mt-3">
            {isEdit || !userData.resume ? (
              <>
                <label className="flex items-center" htmlFor="resumeUpload">
                  <span className="bg-primary/10 text-primary px-4 py-2 rounded-lg mr-2 border border-primary/20">
                    {resume ? resume.name : "Select Resume"}
                  </span>
                  <input
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && file.type === "application/pdf") {
                        setResume(file);
                      } else {
                        toast.error("Please select a valid PDF file.", {
                          theme: "colored",
                        });
                      }
                    }}
                    accept="application/pdf"
                    type="file"
                    hidden
                    id="resumeUpload"
                  />
                  <img
                    src={assets.profile_upload_icon}
                    alt="Upload resume"
                    className="w-6 h-6"
                  />
                </label>
                <button
                  onClick={updateResume}
                  className="btn btn-success btn-sm"
                >
                  Save
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <a
                  className="btn btn-primary btn-sm"
                  href={userData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
                <button
                  onClick={() => setIsEdit(true)}
                  className="btn btn-outline btn-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-error">Failed to load resume data.</p>
            <button
              onClick={fetchUserData}
              className="btn btn-primary btn-sm mt-2"
            >
              Retry
            </button>
          </div>
        )}

        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <div className="overflow-x-auto">
          <table className="table w-full border border-base-200 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Company</th>
                <th className="py-3 px-4 text-left">Job Title</th>
                <th className="py-3 px-4 text-left max-sm:hidden">Location</th>
                <th className="py-3 px-4 text-left max-sm:hidden">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.length > 0 ? (
                userApplications.map((job, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 align-middle">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-8 h-8 rounded"
                          src={job.companyId.image}
                          alt={`${job.companyId.name} logo`}
                        />
                        <span className="text-base-content">
                          {job.companyId.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-4 align-middle text-base-content">
                      {job.jobId.title}
                    </td>
                    <td className="py-2 px-4 max-sm:hidden align-middle text-base-content">
                      {job.jobId.location}
                    </td>
                    <td className="py-2 px-4 max-sm:hidden align-middle text-base-content">
                      {moment(job.date).format("ll")}
                    </td>
                    <td className="py-2 px-4 align-middle">
                      <span
                        className={`badge ${
                          job.status === "Accepted"
                            ? "badge-success"
                            : job.status === "Rejected"
                            ? "badge-error"
                            : "badge-info"
                        } px-4 py-3 rounded`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-4 text-center text-base-content/80"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
