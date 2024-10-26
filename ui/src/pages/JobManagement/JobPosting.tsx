import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { jobSchema } from "../../utils/validators";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Alert, FormControlLabel, Switch } from "@mui/material";
import { useJobService } from "../../services/JobService";

type snackbarPropsType = {
  alertType: "error" | "success" | "warning";
  title: string;
  message: string;
  isOpen: boolean;
};

const JobPosting = () => {
  const navigate = useNavigate();
  const param = useParams<any>();
  const jobService = useJobService();
  const formik = useFormik({
    initialValues: {
      job_title: "",
      job_description: "",
      skills: "",
      location: "",
      salary: undefined,
      is_active: true,
    },
    validationSchema: jobSchema,
    onSubmit: (values) => {
      handleCreateJob(values);
    },
  });
  const [snackbarProps, setSnackbarProps] = useState<snackbarPropsType>({
    isOpen: false,
    title: "",
    alertType: "success",
    message: "",
  });

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarProps((prev) => {
      return {
        ...prev,
        isOpen: false,
      };
    });
  };
  const { handleSubmit } = formik;

  const handleCreateJob = async (values: any) => {
    try {
      if (param.id) {
        await jobService.updateJob(param.id, values);
        setSnackbarProps({
          isOpen: true,
          alertType: "success",
          title: "Success",
          message: "Job Updated Successfully",
        });
      } else {
        await jobService.createJob(values);
        setSnackbarProps({
          isOpen: true,
          alertType: "success",
          title: "Success",
          message: "Job Created Successfully",
        });
      }
      setTimeout(() => navigate("/dashboard/job/listing"), 1000);
    } catch (err: any) {
      console.log(err);
      setSnackbarProps({
        isOpen: true,
        alertType: "error",
        title: "Error : ",
        message: err?.response?.data?.message ?? "Error signing up",
      });
    }
  };

  const handleGetSavedJobsParam = async () => {
    try {
      const { data } = await jobService.getJobById(param.id as string);
      const { job_title, job_description, skills, salary, is_active, location } =
        data.data as any;
      formik.setFieldValue("job_title", job_title);
      formik.setFieldValue("job_description", job_description);
      formik.setFieldValue("skills", skills);
      formik.setFieldValue("salary", salary);
      formik.setFieldValue("is_active", is_active);
      formik.setFieldValue("location", location);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetSavedJobsParam();
  }, [param.id]);

  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="w-[100%] flex justify-between items-center">
        <div className="text-2xl">Job Posting</div>
        <Link
          to="/dashboard/job/listing"
          className="inline-flex gap-5 items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <svg
            fill="#FFFFFFFF"
            width="18px"
            height="18px"
            viewBox="0 0 52.00 52.00"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#FFFFFFFF"
            strokeWidth="0.00052"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" />
            </g>
          </svg>
          Back
        </Link>
      </div>
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-1 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Job</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Job Title <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Job Title..."
                    className={`${
                      formik.touched.job_title && formik.errors.job_title
                        ? "border-red-600"
                        : "focus:border-primary"
                    } w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition  active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    id="job_title"
                    name="job_title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.job_title}
                  />
                  {formik.touched.job_title && formik.errors.job_title ? (
                    <div className="text-red-600">{formik.errors.job_title}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Description <span className="text-meta-1">*</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Type your message"
                  className={`${
                    formik.touched.job_description && formik.errors.job_description
                      ? "border-red-600"
                      : "focus:border-primary"
                  } w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition  active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  id="job_description"
                  name="job_description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.job_description}
                ></textarea>
                {formik.touched.job_description && formik.errors.job_description ? (
                  <div className="text-red-600">{formik.errors.job_description}</div>
                ) : null}
              </div>

              <div className="mb-4.5 flex  justify-between gap-2">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Requirement (Skills) <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Requirement (Skills)"
                    className={`${
                      formik.touched.skills && formik.errors.skills
                        ? "border-red-600"
                        : "focus:border-primary"
                    } w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition  active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    id="skills"
                    name="skills"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.skills}
                  />
                  {formik.touched.skills && formik.errors.skills ? (
                    <div className="text-red-600">{formik.errors.skills}</div>
                  ) : null}
                </div>

                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Location <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Location"
                    className={`${
                      formik.touched.location && formik.errors.location
                        ? "border-red-600"
                        : "focus:border-primary"
                    } w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition  active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                    id="location"
                    name="location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                  />
                  {formik.touched.location && formik.errors.location ? (
                    <div className="text-red-600">{formik.errors.location}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Salary <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter Salary"
                  className={`${
                    formik.touched.salary && formik.errors.salary
                      ? "border-red-600"
                      : "focus:border-primary"
                  } w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition  active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  id="salary"
                  name="salary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.salary}
                />
                {formik.touched.salary && formik.errors.salary ? (
                  <div className="text-red-600">{formik.errors.salary}</div>
                ) : null}
              </div>

              {param.id && (
                <FormControlLabel
                  sx={{ marginBottom: "10px" }}
                  label={"Job Status"}
                  id={"is_active"}
                  name={"is_active"}
                  control={
                    <Switch
                      checked={formik.values.is_active}
                      onChange={formik.handleChange}
                    />
                  }
                />
              )}

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={snackbarProps.isOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarProps.alertType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarProps.title} {snackbarProps.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default JobPosting;
