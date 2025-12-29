import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const ManageJob = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: {
          token: companyToken,
        },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
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

  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Visibility updated successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        fetchCompanyJobs();
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
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return jobs ? (
    jobs.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh] bg-base-100 text-base-content">
        <p className="text-xl sm:text-2xl text-base-content/80">
          No jobs available or posted
        </p>
      </div>
    ) : (
      <div className="container p-4 max-w-5xl mx-auto bg-base-100 text-base-content">
        <div className="overflow-x-auto">
          <table className="table w-full border border-base-200 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left max-sm:hidden">#</th>
                <th className="py-3 px-4 text-left">Job Title</th>
                <th className="py-3 px-4 text-left max-sm:hidden">Date</th>
                <th className="py-3 px-4 text-left max-sm:hidden">Location</th>
                <th className="py-3 px-4 text-center">Applicants</th>
                <th className="py-3 px-4 text-left">Visible</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className="text-base-content">
                  <td className="py-2 px-4 align-middle max-sm:hidden">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 align-middle">{job.title}</td>
                  <td className="py-2 px-4 align-middle max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 align-middle max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 px-4 align-middle text-center">
                    {job.applicants}
                  </td>
                  <td className="py-2 px-4 align-middle">
                    <input
                      className="checkbox checkbox-primary"
                      type="checkbox"
                      checked={job.visible}
                      onChange={() => changeJobVisibility(job._id)}
                      aria-label={`Toggle visibility for ${job.title}`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => navigate("/dashboard/add-job")}
            className="btn btn-primary btn-sm"
          >
            Add New Job
          </button>
        </div>
      </div>
    )
  ) : (
    <Loader />
  );
};

export default ManageJob;
