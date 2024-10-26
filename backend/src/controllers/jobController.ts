/* eslint-disable prefer-const */
import { Request, Response, NextFunction } from "express";
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import prismaClient from "../prismaClient";

import { logger } from "../config/logger";

class JobController {
  async createJobPosting(req: Request | any, res: Response, next: NextFunction) {
    const { job_title, job_description, skills, salary, location } = req.body;
    const user_email = req?.user!.email;
    try {
      await prismaClient.jobSchema.create({
        data: {
          job_title,
          job_description,
          skills,
          salary,
          created_by: user_email,
          location,
        },
      });
      logger.info({ message: "Job created" });
      res.status(200).json("Job Posted Successfully");
    } catch (err: any) {
      console.log(err.message);
      logger.error({
        message: "Unable to Create Job Error 500",
        email: user_email,
      });
      res.status(500).json({ Error: err.message });
    }
  }

  async getAllPostedJobs(req: Request | any, res: Response, next: NextFunction) {
    const user_email = req?.user!.email;
    try {
      const jobs = await prismaClient.jobSchema.findMany();
      logger.info({ message: "All the Jobs fetched successfully" });
      res.status(200).json({
        success: true,
        data: jobs,
      });
    } catch (err: any) {
      console.log(err.message);
      logger.error({
        message: "Unable to Create Customer Error 500",
        email: user_email,
      });
      res.status(500).json({ Error: err.message });
    }
  }

  async getJobById(req: Request | any, res: Response, next: NextFunction) {
    const user_email = req?.user!.email;
    const { id } = req.params;
    try {
      const job = await prismaClient.jobSchema.findFirst({ where: { id } });

      logger.info({ message: "Job fetched successfully" });
      res.status(200).json({
        success: true,
        data: job,
      });
    } catch (err: any) {
      console.log(err.message);
      logger.error({
        message: "Unable to Fetch Jobs Error 500",
        email: user_email,
      });
      res.status(500).json({ Error: err.message });
    }
  }

  async updateJobById(req: Request | any, res: Response, next: NextFunction) {
    const user_email = req?.user!.email;
    const { id } = req.params;
    const data = req.body;
    try {
      await prismaClient.jobSchema.update({ where: { id }, data: data });
      logger.info({ message: "Job Updated successfully" });
      res.status(200).json({
        success: true,
        data: "job updated successfully",
      });
    } catch (err: any) {
      console.log(err.message);
      logger.error({
        message: "Unable to updated job Error 500",
        email: user_email,
      });
      res.status(500).json({ Error: err.message });
    }
  }

  async removeJob(req: Request | any, res: Response, next: NextFunction) {
    const user_email = req?.user!.email;
    const { id } = req.params;
    try {
      await prismaClient.jobSchema.delete({ where: { id: id } });
      logger.info({ message: "Job Deleted successfully" });
      res.status(200).json({
        success: true,
        data: "job Deleted successfully",
      });
    } catch (err: any) {
      console.log(err.message);
      logger.error({
        message: "Unable to delete job Error 500",
        email: user_email,
      });
      res.status(500).json({ Error: err.message });
    }
  }

  async searchJob(req: Request | any, res: Response, next: NextFunction) {
    const { query } = req.query;

    try {
        const jobs = await prismaClient.jobSchema.findMany({
            where: query
              ? {
                  OR: [
                    {
                      job_title: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                    {
                      job_description: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                    {
                      skills: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                    {
                      location: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                    {
                      created_by: {
                        contains: query,
                        mode: "insensitive",
                      },
                    },
                  ],
                }
              : undefined, // No filter when query is empty
          });
      res.status(200).json({ data: jobs, success: true });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  }
}

export default new JobController();
