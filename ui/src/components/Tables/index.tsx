import { useNavigate } from "react-router-dom";
import { getFormattedSalary } from "../../utils";
import moment from "moment";
import { useJobService } from "../../services/JobService";
import AlertDialog from "../Dialog";
import { useState } from "react";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";

type snackbarPropsType = {
  alertType: "error" | "success" | "warning";
  title: string;
  message: string;
  isOpen: boolean;
};


const Table = (props: any) => {
  const { columns = [], data = [], refetchData } = props;
  const navigate = useNavigate();
  const [snackbarProps, setSnackbarProps] = useState<snackbarPropsType>({
    isOpen: false,
    title: "",
    alertType: "success",
    message: "",
  });
  const [dialogProps, setDialogProps] = useState({
    title: "",
    message: "",
    isOpen: false,
    purgeId:"",
  });
  const jobService = useJobService();

  const handleNavigate = (id: string) => {
    navigate(`/dashboard/job/posting/${id}`);
  };

  const handleOpen = (id:string) => {
    setDialogProps(prev => {
      return {
        title:"Confirm",
        message: "Are you sure you want to delete this job?",
        isOpen:true,
        purgeId:id
      }
    });
  };

  const handleClose = () => {
   setDialogProps(prev => ({title:"", message:"", purgeId:"",isOpen:false}))
  };
  

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

  const handlePurgeData = async () => {
    try {
     await jobService.purgeJob(dialogProps.purgeId)
     setSnackbarProps({
      isOpen: true,
      alertType: "success",
      title: "Success",
      message: "Job Deleted Successfully",
    });
    }catch (err:any) {
      console.log(err)
      setSnackbarProps({
        isOpen: true,
        alertType: "error",
        title: "Error : ",
        message: err?.response?.data?.message ?? "something went wrong",
      });
    }finally {
      handleClose();
      refetchData()
    }
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {columns?.map((ele: any) => (
                <th
                  key={ele.key}
                  className="px-[7px] font-medium text-black dark:text-white xl:pl-11"
                >
                  {ele.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data?.map((ele: any, key: number) => (
                <tr key={key} className="  text-center">
                  <td className="py-10 border-b border-[#eee]  dark:border-strokedark">
                    <p className="text-black dark:text-white"># {ele.id.slice(6, 9)}</p>
                  </td>
                  <td className="border-b border-[#eee]  dark:border-strokedark">
                    <p className="text-black dark:text-white">{ele.job_title}</p>
                  </td>
                  <td className="border-b border-[#eee]  dark:border-strokedark">
                    <p className="text-black dark:text-white">{ele.description}</p>
                  </td>
                  <td className="border-b border-[#eee]  dark:border-strokedark">
                    <p className="text-black dark:text-white">{ele.requirement}</p>
                  </td>
                  <td className="border-b border-[#eee]  dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {getFormattedSalary(ele.salary)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee]  dark:border-strokedark">
                    <p className="text-black dark:text-white">{ele.location}</p>
                  </td>

                  <td className="border-b border-[#eee]  dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {moment(ele.created_at).format("DD/MM/YY")}
                    </p>
                  </td>
                  <td className="border-b border-[#eee]  dark:border-strokedark">
                    <p className="text-black dark:text-white">{ele.created_by}</p>
                  </td>
                  <td className="border-b border-[#eee]  dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        ele.is_active === true
                          ? "bg-success text-success"
                          : ele.is_active === false
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                      }`}
                    >
                      {ele.is_active ? "Active" : "InActive"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary" onClick={() => handleOpen(ele.id)}>
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                            fill=""
                          />
                          <path
                            d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                            fill=""
                          />
                          <path
                            d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                            fill=""
                          />
                          <path
                            d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => handleNavigate(ele.id)}
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 -0.5 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z"
                              stroke="#000000"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M12.033 7.61865C12.4472 7.61865 12.783 7.28287 12.783 6.86865C12.783 6.45444 12.4472 6.11865 12.033 6.11865V7.61865ZM9.23301 6.86865V6.11865L9.23121 6.11865L9.23301 6.86865ZM5.50001 10.6187H6.25001L6.25001 10.617L5.50001 10.6187ZM5.50001 16.2437L6.25001 16.2453V16.2437H5.50001ZM9.23301 19.9937L9.23121 20.7437H9.23301V19.9937ZM14.833 19.9937V20.7437L14.8348 20.7437L14.833 19.9937ZM18.566 16.2437H17.816L17.816 16.2453L18.566 16.2437ZM19.316 12.4937C19.316 12.0794 18.9802 11.7437 18.566 11.7437C18.1518 11.7437 17.816 12.0794 17.816 12.4937H19.316ZM15.8863 6.68446C15.7282 6.30159 15.2897 6.11934 14.9068 6.2774C14.5239 6.43546 14.3417 6.87397 14.4998 7.25684L15.8863 6.68446ZM18.2319 9.62197C18.6363 9.53257 18.8917 9.13222 18.8023 8.72777C18.7129 8.32332 18.3126 8.06792 17.9081 8.15733L18.2319 9.62197ZM8.30001 16.4317C7.8858 16.4317 7.55001 16.7674 7.55001 17.1817C7.55001 17.5959 7.8858 17.9317 8.30001 17.9317V16.4317ZM15.767 17.9317C16.1812 17.9317 16.517 17.5959 16.517 17.1817C16.517 16.7674 16.1812 16.4317 15.767 16.4317V17.9317ZM12.033 6.11865H9.23301V7.61865H12.033V6.11865ZM9.23121 6.11865C6.75081 6.12461 4.7447 8.13986 4.75001 10.6203L6.25001 10.617C6.24647 8.96492 7.58269 7.62262 9.23481 7.61865L9.23121 6.11865ZM4.75001 10.6187V16.2437H6.25001V10.6187H4.75001ZM4.75001 16.242C4.7447 18.7224 6.75081 20.7377 9.23121 20.7437L9.23481 19.2437C7.58269 19.2397 6.24647 17.8974 6.25001 16.2453L4.75001 16.242ZM9.23301 20.7437H14.833V19.2437H9.23301V20.7437ZM14.8348 20.7437C17.3152 20.7377 19.3213 18.7224 19.316 16.242L17.816 16.2453C17.8195 17.8974 16.4833 19.2397 14.8312 19.2437L14.8348 20.7437ZM19.316 16.2437V12.4937H17.816V16.2437H19.316ZM14.4998 7.25684C14.6947 7.72897 15.0923 8.39815 15.6866 8.91521C16.2944 9.44412 17.1679 9.85718 18.2319 9.62197L17.9081 8.15733C17.4431 8.26012 17.0391 8.10369 16.6712 7.7836C16.2897 7.45165 16.0134 6.99233 15.8863 6.68446L14.4998 7.25684ZM8.30001 17.9317H15.767V16.4317H8.30001V17.9317Z"
                              fill="#000000"
                            ></path>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AlertDialog {...dialogProps} onAccept={handlePurgeData} onCancel={handleClose}/>
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

export default Table;
