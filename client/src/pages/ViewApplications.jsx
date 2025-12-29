import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false);

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
        toast.error(data.message, {
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
      });
    }
  };

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        {
          headers: { token: companyToken },
        }
      );

      if (data.success) {
        toast.success(data.message || "Status updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        fetchCompanyJobApplications();
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
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  return applicants ? (
    applicants.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh] bg-base-100 text-base-content">
        <p className="text-xl sm:text-2xl text-base-content/80">
          No applications available
        </p>
      </div>
    ) : (
      <div className="container mx-auto p-4 max-w-5xl bg-base-100 text-base-content">
        <div className="overflow-x-auto">
          <table className="table w-full border border-base-200 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th scope="col" className="py-4 px-4 text-left">
                  #
                </th>
                <th scope="col" className="py-4 px-4 text-left">
                  User Name
                </th>
                <th scope="col" className="py-4 px-4 text-left max-sm:hidden">
                  Job Title
                </th>
                <th scope="col" className="py-4 px-4 text-left max-sm:hidden">
                  Location
                </th>
                <th scope="col" className="py-4 px-4 text-left">
                  Resume
                </th>
                <th scope="col" className="py-4 px-4 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="text-base-content">
                    <td className="py-2 px-4 align-middle text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 align-middle text-center">
                      <div className="flex items-center justify-center gap-3">
                        <img
                          className="w-10 h-10 rounded-full max-sm:hidden"
                          src={applicant.userId.image || assets.default_user}
                          alt={`${applicant.userId.name} profile`}
                        />
                        <span>{applicant.userId.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 align-middle text-center max-sm:hidden">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-2 px-4 align-middle text-center max-sm:hidden">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-2 px-4 align-middle text-center">
                      <a
                        className="btn btn-primary btn-xs inline-flex items-center gap-2"
                        href={applicant.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resume
                        <img
                          src={assets.resume_download_icon}
                          alt="Download"
                          className="w-4 h-4"
                        />
                      </a>
                    </td>
                    <td className="py-2 px-4 align-middle">
                      {applicant.status === "Pending" ? (
                        <div className="dropdown dropdown-end">
                          <label tabIndex={0} className="btn btn-ghost btn-xs">
                            <span className="text-base-content">...</span>
                          </label>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-md border border-base-200 p-2 shadow-md w-32"
                          >
                            <li>
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(
                                    applicant._id,
                                    "Accepted"
                                  )
                                }
                                className="text-success hover:bg-base-200"
                              >
                                Accept
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() =>
                                  changeJobApplicationStatus(
                                    applicant._id,
                                    "Rejected"
                                  )
                                }
                                className="text-error hover:bg-base-200"
                              >
                                Reject
                              </button>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <span
                          className={`badge ${
                            applicant.status === "Accepted"
                              ? "badge-success"
                              : "badge-error"
                          } px-4 py-3 rounded`}
                        >
                          {applicant.status}
                        </span>
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
