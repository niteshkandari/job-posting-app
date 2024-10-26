import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Analytics from "../pages/Dashboard/Analytics";
import { JobListing, JobPosting } from "../pages/JobManagement";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import DefaultLayout from "../layout/DefaultLayout";
import { useUserService } from "../services/AuthService";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const PrivateRouter = () => {
  const { pathname } = useLocation();
  const userService = useUserService();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkIsUserLoggedIn = () => {
    setLoading(true);
    if (!userService.isUserLoggedIn()) {
      navigate("/auth/signin");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIsUserLoggedIn();
  }, [pathname]);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index={true}
          path={"/analytics"}
          element={
            <>
              <PageTitle title="Dashboard | Analytics" />
              <Analytics />
            </>
          }
        />
        <Route
          index={true}
          path="/job/listing"
          element={
            <>
              <PageTitle title="Job Listing" />
              <JobListing />
            </>
          }
        />
        <Route
          path="/job/posting"
          element={
            <>
              <PageTitle title="Job Posting" />
              <JobPosting />
            </>
          }
        />

        <Route
          path="/job/posting/:id"
          element={
            <>
              <PageTitle title="Job Posting" />
              <JobPosting />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
};

export default PrivateRouter;
