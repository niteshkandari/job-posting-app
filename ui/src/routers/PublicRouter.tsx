import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import SignIn from "../pages/Authentication/SignIn";
import SignUp from "../pages/Authentication/SignUp";
import { useEffect, useState } from "react";
import { useUserService } from "../services/AuthService";
import Loader from "../common/Loader";

const PublicRouter = () => {
  const { pathname } = useLocation();
  const userService = useUserService();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkIsUserLoggedIn = () => {
    setLoading(true)
    if(userService.isUserLoggedIn()) {
      navigate("/dashboard/analytics")
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkIsUserLoggedIn()
  },[pathname])

  return (
    loading ? <Loader/> : 
    <Routes>
    <Route
        path="/signin"
        element={
          <>
            <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignIn />
          </>
        }
      />
      <Route
        index={true}
        path="/signup"
        element={
          <>
            <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
            <SignUp />
          </>
        }
      />

    </Routes>
  );
};

export default PublicRouter;
