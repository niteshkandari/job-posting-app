import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRouter, PublicRouter } from "./routers";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<PrivateRouter />} />
      <Route path="/auth/*" element={<PublicRouter />} />
      <Route path="*" element={<Navigate to="/auth/signin" />} />
    </Routes>
  );
}

export default App;
