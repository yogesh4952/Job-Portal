import React, { useState } from "react";
import Navbar from "../components/Navbar";
import moment from "moment";
import { assets, jobsApplied } from "../assets/assets";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />

      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 border border-blue-200">
                  Select Resume
                </p>
                <input
                  onChange={(e) => setResume(e.target.files[0])}
                  accept="application/pdf"
                  type="file"
                  hidden
                  name=""
                  id="resumeUpload"
                />
                <img src={assets.profile_upload_icon} alt="Upload icon" />
              </label>

              <button
                onClick={() => setIsEdit(false)}
                className="bg-green-100 text-green-700 px-4 py-2 rounded-lg border border-green-300 hover:border-green-400 transition"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:border-blue-300 transition"
                href=""
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
            {jobsApplied.map((job, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b border-gray-100 align-middle">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 h-8"
                      src={job.logo}
                      alt={`${job.company} logo`}
                    />
                    <span>{job.company}</span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b border-gray-100 align-middle">
                  {job.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-100 max-sm:hidden align-middle">
                  {job.location}
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
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default Applications;
