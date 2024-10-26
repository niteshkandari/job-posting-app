import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./css/style.css";
import "./css/satoshi.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { UserServiceProvider } from "./services/AuthService";
import { JobServiceProvider } from "./services/JobService";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserServiceProvider>
      <JobServiceProvider>
        <Router>
          <App />
        </Router>
      </JobServiceProvider>
    </UserServiceProvider>
  </React.StrictMode>
);
