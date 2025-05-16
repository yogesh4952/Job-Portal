import React from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import Loader from "../components/Loader";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState(false);

  //  Function to fetch company Job Applications Data

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: {
          token: companyToken,
        },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to update Job Application Status

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        {
          id,
          status,
        },
        {
          headers: { token: companyToken },
        }
      );

      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);
  return applicants ? (
    applicants.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">No Applications Available </p>
      </div>
    ) : (
      <div className="container mx-auto p-4">
        <div>
          <table className="w-full  max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-4 text-left">#</th>
                <th className="py-4 text-left">User name</th>
                <th className="py-4 text-left max-sm:hidden">Job Title</th>
                <th className="py-4 text-left max-sm:hidden">Location</th>
                <th className="py-4 text-left">Resume</th>
                <th className="py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="text-gray-700">
                    <td className="py-2 px-4 border-b text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border-b items-center text-center flex">
                      <img
                        className="w-10 h-10 rounded-full mr-3 max-sm:hidden"
                        src={applicant.imgSrc}
                        alt=""
                      />
                      <span>{applicant.userId.name}</span>
                    </td>

                    <td className="py-2 px-4 border-b text-center max-sm:hidden">
                      {applicant.jobId.jobTitle}
                    </td>

                    <td className="py-2 px-4 border-b text-center max-sm:hidden">
                      {applicant.jobId.location}
                    </td>

                    <td className="py-2 px-4 border-b">
                      <a
                        className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center"
                        href={applicant.userId.resume}
                        target="_blank"
                      >
                        Resume <img src={assets.resume_download_icon} alt="" />
                      </a>
                    </td>

                    <td className="py-2 px-4 border-b relative">
                      {applicant.status === "Pending" ? (
                        <div className=" relative inline-block text-left group">
                          <button className="text-gray-500 action-button">
                            ...
                          </button>
                          <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block">
                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Accepted"
                                )
                              }
                              className="block w-full text-left py-2 px-4 text-blue-500 hover:bg-gray-100"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Rejected"
                                )
                              }
                              className="block w-full text-left py-2 px-4 text-red-500 hover:bg-gray-100"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>{applicant.status}</div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loader />
  );
};

export default ViewApplications;
