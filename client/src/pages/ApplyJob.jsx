import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loader from "../Components/Loader";
import Navbar from "../Components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../Components/JobCard";
import Footer from "../Components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const [jobData, setJobData] = useState(null);
  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const fetchJob = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);

      if (data.success) {
        setIsLoading(false);
        setJobData(data.job);
      } else {
        setIsLoading(false);
        toast.error(data.message, {
          theme: "colored",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message, {
        theme: "colored",
      });
    }
  };

  const applyHandler = async () => {
    setIsLoading(true);

    try {
      if (!userData) {
        toast.error("Please log in to apply for jobs", {
          theme: "colored",
        });
        return;
      }

      if (!userData.resume) {
        navigate("/applications");
        toast.error("Please upload a resume to apply", {
          theme: "colored",
        });
        return;
      }

      const token = await getToken();
      if (!token) {
        toast.error("Authentication failed. Please log in again.", {
          theme: "colored",
        });
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        {
          jobId: jobData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
        fetchUserApplications();
      } else {
        toast.error(data.message, {
          theme: "colored",
        });
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.error("Apply Job Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      toast.error(error.response?.data?.message || "Failed to apply for job", {
        theme: "colored",
      });
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(
      (item) => item.jobId._id === jobData._id
    );

    setIsApplied(hasApplied);
  };

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkAlreadyApplied();
    }
  }, [jobData, userApplications, id]);

  useEffect(() => {
    fetchJob();
  }, [id]);

  return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto bg-base-100 text-base-content">
        <div className="card bg-base-100 rounded-lg w-full shadow-md">
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-4 sm:px-14 py-10 sm:py-20 mb-6 bg-primary/10 border border-primary/20 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 bg-base-100 rounded-lg p-4 mr-4 max-md:mb-4 border border-base-200"
                src={jobData.companyId.image}
                alt={`${jobData.companyId.name} logo`}
              />
              <div className="text-center md:text-left">
                <h1 className="text-2xl sm:text-4xl font-medium text-base-content">
                  {jobData.title}
                </h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-base-content/80 mt-2">
                  <span className="flex items-center gap-1">
                    <img
                      src={assets.suitcase_icon}
                      alt="Company"
                      className="w-4 h-4"
                    />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src={assets.location_icon}
                      alt="Location"
                      className="w-4 h-4"
                    />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src={assets.person_icon}
                      alt="Level"
                      className="w-4 h-4"
                    />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <img
                      src={assets.money_icon}
                      alt="Salary"
                      className="w-4 h-4"
                    />
                    CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button
                onClick={applyHandler}
                className="btn btn-primary px-10 disabled:btn-disabled"
                disabled={isLoading}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </button>
              <p className="mt-1 text-base-content/80">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-start px-4 sm:px-0">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4 text-base-content">
                Job Description
              </h2>
              <div
                className="rich-text text-base-content"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>
              <button
                onClick={applyHandler}
                className="btn btn-primary px-10 mt-4 disabled:btn-disabled"
                disabled={isLoading}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </button>
            </div>
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2 className="text-lg font-semibold text-base-content">
                More jobs from {jobData.companyId.name}
              </h2>
              {jobs
                .filter(
                  (job) =>
                    job._id !== jobData._id &&
                    job.companyId._id === jobData.companyId._id
                )
                .filter((job) => {
                  const appliedJobsId = new Set(
                    userApplications.map((app) => app.jobId && app.jobId._id)
                  );
                  return !appliedJobsId.has(job._id);
                })
                .slice(0, 4)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <Loader />
    </div>
  );
};

export default ApplyJob;
