import Table from "../../components/Tables";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useJobService } from "../../services/JobService";
import { JobDataVo } from "../../ValueObject";
import Loader from "../../common/Loader";
import { Box, TextField } from "@mui/material";
import { debounce } from "../../utils";

const cols = [
  {
    label: "Id",
    key: "id",
  },
  {
    label: "Job Title",
    key: "job_title",
  },
  {
    label: "Description",
    key: "description",
  },
  {
    label: "Requirement (Skills)",
    key: "requirement",
  },
  {
    label: "Salary",
    key: "salary",
  },
  {
    label: "Location",
    key: "location",
  },
  {
    label: "Created At",
    key: "created_at",
  },
  {
    label: "created By",
    key: "created_by",
  },
  {
    label: "Job Status",
    key: "job_status",
  },
  {
    label: "Action",
    key: "action",
  },
];


const Listing = () => {
  const jobService = useJobService();
  const [data, setData] = useState<Array<JobDataVo>>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState("");

  const handleGetAllPostedJobs = async () => {
    try {
      setLoading(true);
      const { data } = await jobService.getAllJobs();
      const dataVo = data.data.map(
        (ele: any) =>
          new JobDataVo(
            ele.id,
            ele.job_title,
            ele.job_description,
            ele.skills,
            ele.salary,
            ele.location,
            ele.is_active,
            ele.created_at,
            ele.created_by
          )
        );
      setData(dataVo);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleRefetchData = () => handleGetAllPostedJobs();
  
  const debouncedChange = useCallback(
    debounce(async (value: string) => {
    setLoading(true)
    const  {data} = await jobService.searchJob(value);
    const dataVo = data.data.map(
      (ele: any) =>
        new JobDataVo(
          ele.id,
          ele.job_title,
          ele.job_description,
          ele.skills,
          ele.salary,
          ele.location,
          ele.is_active,
          ele.created_at,
          ele.created_by
        )
      );
      setData(dataVo)
      setLoading(false)
    }, 600),
    []
);


  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
        setSearchParams(value);
        debouncedChange(value);
  }

  useEffect(() => {
    handleGetAllPostedJobs();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="w-[100%] flex justify-between items-center">
        <div className="text-2xl">Job Listing</div>
        <Box sx={{display:"flex", gap:"20px"}}>
        <TextField variant={"outlined"} label={"Search...."} value={searchParams} onChange={handleChange}/>
        <Link
          to="/dashboard/job/posting"
          className="inline-flex gap-5 items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <svg
            height="25px"
            width="25px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 392.598 392.598"
            xmlSpace="preserve"
            fill="#000000"
            stroke="#000000"
            strokeWidth="0.003925980000000001"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                style={{ fill: "#FFFFFF" }}
                d="M150.073,238.158c0-51.459,41.891-93.285,93.285-93.285c13.964,0,27.216,3.168,39.111,8.727v-49.455 h-71.305c-2.844,0-5.624-1.164-7.758-3.168c-2.004-2.004-3.168-4.784-3.168-7.758V21.786H32.739 c-6.012,0-10.925,4.848-10.925,10.925v327.111c0,6.012,4.848,10.925,10.925,10.925h238.933c6.012,0,10.925-4.848,10.925-10.925 v-37.107c-11.895,5.56-25.083,8.727-39.111,8.727C191.964,331.442,150.073,289.552,150.073,238.158z"
              />
              <polygon
                style={{ fill: "#FFFFFFFF" }}
                points="222.089,37.236 222.089,82.295 267.147,82.295 "
              />
              <path
                style={{ fill: "#FFFFFF" }}
                d="M243.422,166.594c-39.434,0-71.499,32.065-71.499,71.499s32.129,71.434,71.499,71.434 s71.499-32.065,71.499-71.499S282.857,166.594,243.422,166.594z"
              />
              <path
                style={{ fill: "#FFFFFFFF" }}
                d="M243.422,287.806c-27.41,0-49.713-22.238-49.713-49.713s22.238-49.713,49.713-49.713 s49.713,22.238,49.713,49.713C293.135,265.503,270.768,287.806,243.422,287.806z"
              />
              <g>
                <path
                  style={{ fill: "#FFFFFFFF" }}
                  d="M57.822,166.723h90.505c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925 H57.822c-6.012,0-10.925,4.848-10.925,10.925C46.897,161.81,51.81,166.723,57.822,166.723z"
                />
                <path
                  style={{ fill: "#FFFFFFFF" }}
                  d="M57.822,222.836h66.715c6.012,0,10.925-4.848,10.925-10.925c0-6.012-4.848-10.925-10.925-10.925 H57.822c-6.012,0-10.925,4.848-10.925,10.925S51.81,222.836,57.822,222.836z"
                />
                <path
                  style={{ fill: "#FFFFFFFF" }}
                  d="M57.822,278.95h66.715c6.012,0,10.925-4.849,10.925-10.925s-4.848-10.925-10.925-10.925H57.822 c-6.012,0-10.925,4.849-10.925,10.925S51.81,278.95,57.822,278.95z"
                />
                <path
                  style={{ fill: "#FFFFFFFF" }}
                  d="M148.327,313.277H57.822c-6.012,0-10.925,4.848-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925 h90.505c6.012,0,10.925-4.848,10.925-10.925C159.188,318.125,154.339,313.277,148.327,313.277z"
                />
              </g>
              <g>
                <path
                  style={{ fill: "#FFFFFFFF" }}
                  d="M46.444,53.333h14.675v26.505c0,7.434-4.073,8.275-5.624,8.275c-3.232,0-6.335-1.875-9.374-5.495 l-5.689,9.051c4.396,5.236,9.632,7.887,15.515,7.887c4.784,0,16.291-1.939,16.291-20.17V42.537H46.444V53.333z"
                />
                <path
                  style={{ fill: "#FFFFFFFF" }}
                  d="M171.859,69.624c0.84-0.453,7.24-2.78,7.24-12.218c0-14.998-14.158-14.998-17.455-14.998H142.38 v56.501h21.657c6.788,0,17.39-1.939,17.842-15.709C182.202,73.568,174.962,70.4,171.859,69.624z M153.499,53.139h5.301 c3.232,0,5.56,0.388,6.982,1.228c1.422,0.776,2.069,2.457,2.069,4.913c0,2.457-0.776,4.202-2.263,4.848 c-1.487,0.776-3.814,1.164-6.788,1.164h-5.236V53.075h-0.065V53.139z M168.174,87.014c-1.552,0.905-3.943,1.293-7.111,1.293h-7.564 V75.313h6.465c3.685,0,6.335,0.388,8.016,1.228c1.681,0.84,2.457,2.521,2.457,5.172C170.566,84.364,169.725,86.044,168.174,87.014z "
                />
                <path
                  style={{ fill: "#FFFFFFFF" }}
                  d="M107.147,41.18c-17.261,0-25.988,15.709-25.988,29.22c0,11.055,6.853,29.22,25.988,29.22 c17.261,0,25.988-15.709,25.988-29.22C133.071,59.345,126.218,41.18,107.147,41.18z M121.822,70.4 c0,8.727-5.624,18.166-14.675,18.166c-7.564,0-14.675-7.564-14.675-18.166h0.065c0-8.727,5.624-18.166,14.675-18.166 C114.776,52.17,121.822,59.733,121.822,70.4L121.822,70.4z"
                />
                <path
                  style={{ fill: "#FFFFFFFF" }}
                  d="M312.659,300.671c-0.065,0-0.129,0-0.259,0c-2.521,2.78-5.367,5.366-8.727,7.176l0.971-0.84 l-0.844,0.711c-3.232,2.004-6.653,3.685-10.289,5.043c-0.065,0-0.13,0-0.13,0.065c-1.875,0.647-3.75,1.16-5.689,1.552 c-6.915,1.422-14.356,2.004-22.432,2.004c-0.971,0-1.939,0-2.91,0c-16.419-0.323-31.014-3.879-42.725-10.021l-3.685-1.939 l-0.193-0.065c-18.166-9.24-31.07-25.988-36.258-46.168c-0.065-0.065,0-0.065,0-0.13c0-0.065,0-0.065-0.065-0.13 c-1.164-4.333-1.939-8.727-2.388-13.257c-0.065-0.13,0-0.13,0-0.26c-0.647-5.043-0.971-10.157-0.971-15.198 c0-0.195,0-0.323,0-0.518c0-0.26,0-0.518,0.065-0.711c0.065-1.293,0.13-2.521,0.26-3.814c0.065-0.065,0.065-0.13,0.065-0.195 c4.718-44.361,38.002-80.568,81.104-86.353c1.293-0.065,2.521-0.195,3.814-0.26c0.065,0,0.195,0,0.26-0.065 c0.84-0.065,1.755-0.065,2.715-0.065c2.91,0,5.689,0.129,8.468,0.324c1.875,0.13,3.685,0.26,5.495,0.647 c0.065,0,0.13,0,0.195,0.065c22.821,4.523,42.269,17.39,55.892,35.049l1.293,1.68l0.065,0.13 c9.632,13.449,16.682,28.775,20.827,45.571c1.164,4.587,2.004,9.24,2.521,13.963c0,0.065,0.065,0.13,0.065,0.195 c0.065,1.094,0.13,2.263,0.26,3.358c0,0.065,0,0.13,0.065,0.26c0.26,2.972,0.518,6.02,0.65,9.112v0.84 c-0.129,4.268-0.518,8.596-1.04,12.799l-0.065,0.259c-2.004,13.841-7.434,26.241-15.961,36.191l-0.065,0.065 c-4.333,4.396-9.371,8.146-14.994,11.195c-3.232,1.619-6.653,2.972-10.289,4.005c-5.821,1.552-12.222,2.78-19.138,3.557 C315.643,300.353,314.229,300.548,312.659,300.671z"
                />
              </g>
            </g>
          </svg>
          Post a Job
        </Link>
        </Box>
      </div>
      {!loading ? <Table columns={cols} data={data ?? []} refetchData={handleRefetchData}/> : <Loader/> }
    </div>
  );
};

export default Listing;
