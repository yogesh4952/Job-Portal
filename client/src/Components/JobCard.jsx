import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 shadow-md border border-base-200 p-6">
      <div className="flex justify-between items-center">
        <img
          className="h-8"
          src={job.companyId.image}
          alt={job.companyId.name || "Company Logo"}
        />
      </div>

      <h4 className="font-medium text-xl mt-2 text-base-content">
        {job.title}
      </h4>

      <div className="flex items-center gap-3 mt-2 text-sm">
        <span className="bg-primary/10 border border-primary/20 px-4 py-1.5 rounded">
          {job.location}
        </span>
        <span className="bg-secondary/10 border border-secondary/20 px-4 py-1.5 rounded">
          {job.level}
        </span>
      </div>

      <p
        className="text-base-content/80 text-sm mt-4"
        dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}
      ></p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
          }}
          className="btn btn-primary btn-sm"
        >
          Apply Now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
          }}
          className="btn btn-outline btn-sm"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
