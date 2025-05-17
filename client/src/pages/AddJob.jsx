import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const AddJob = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Lamki");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner Level");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const { backendUrl, companyToken } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const description = quillRef.current.root.innerHTML;

      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        {
          title,
          description,
          location,
          salary,
          level,
          category,
        },
        {
          headers: {
            token: companyToken,
          },
        }
      );

      if (data.success) {
        toast.success("Job added successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
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
    // Initialize Quill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
      });

      // Apply theme-aware styles to Quill editor
      const editor = editorRef.current;
      editor.classList.add(
        "bg-base-100",
        "border",
        "border-base-200",
        "rounded"
      );
      const toolbar = editor.previousSibling;
      toolbar.classList.add("bg-base-200", "border-b", "border-base-200");
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="container p-4 flex flex-col w-full items-start gap-4 bg-base-100 text-base-content"
    >
      <div className="w-full max-w-lg">
        <label className="label">
          <span className="label-text">Job Title</span>
        </label>
        <input
          type="text"
          placeholder="Type Here"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          className="input input-bordered w-full rounded"
        />
      </div>

      <div className="w-full max-w-lg">
        <label className="label">
          <span className="label-text">Job Description</span>
        </label>
        <div ref={editorRef} className="min-h-[200px]"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8">
        <div className="w-full sm:w-1/3">
          <label className="label">
            <span className="label-text">Job Category</span>
          </label>
          <select
            className="select select-bordered w-full rounded"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {JobCategories.map((category, index) => (
              <option value={category} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/3">
          <label className="label">
            <span className="label-text">Job Location</span>
          </label>
          <select
            className="select select-bordered w-full rounded"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          >
            {JobLocations.map((location, index) => (
              <option value={location} key={index}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/3">
          <label className="label">
            <span className="label-text">Job Level</span>
          </label>
          <select
            className="select select-bordered w-full rounded"
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          >
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      <div className="w-full max-w-lg">
        <label className="label">
          <span className="label-text">Job Salary</span>
        </label>
        <input
          min={0}
          className="active:outline-none input-bordered outlinno w-full sm:w-32 rounded"
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          placeholder="2500"
          value={salary}
        />
      </div>

      <button type="submit" className="btn btn-primary w-28 rounded mt-4">
        Add
      </button>
    </form>
  );
};

export default AddJob;
