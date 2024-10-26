import { Router } from "express";
import JobController from "../controllers/jobController";
import { checkAuthentication } from "../middleware/auth";
import jobController from "../controllers/jobController";

const router:Router = Router();

router.get("/search", checkAuthentication, JobController.searchJob);

router.post("/create", checkAuthentication ,JobController.createJobPosting);

router.get("/", checkAuthentication, JobController.getAllPostedJobs);

router.get("/:id", checkAuthentication, JobController.getJobById);

router.put("/:id", checkAuthentication, jobController.updateJobById);

router.delete("/:id" , checkAuthentication, JobController.removeJob);


export default router;