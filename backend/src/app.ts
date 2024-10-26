
import express from 'express';
import { Request, Response, NextFunction ,Express } from "express";
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import jobRoutes from './routes/jobRoutes';
import { errorMiddleware } from './middleware/errors';
// import HandleErrors from './utils/error-handler';
import { checkAuthentication } from './middleware/auth';
import path from 'path';
import session from "express-session";
import { logger_ip } from "./config/logger";


// Dictionary to store IP addresses and their visit counts
const ipVisits: { [key: string]: number } = {};

export default async (app:Express) => {

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: false, limit: "1mb" }));
  app.set("view engine", "ejs");
  app.set("views", __dirname + "/views");
  app.use((req: Request, res: Response, next: NextFunction) => {
    let ip = req.headers['x-forwarded-for'] as string || req.connection.remoteAddress;
    // Perform null check for ip
    if (ip) {
      // If the header contains multiple IP addresses, the first one is usually the client's IP
      ip = ip.split(',')[0];
      logger_ip.info(`IP Address: ${ip}`); // Log the IP address
      if (ip in ipVisits) {
        ipVisits[ip]++;
      } else {
        ipVisits[ip] = 1;
      }
    }
    next();
  });



  app.use("/api/ping", (req, res) => res.status(200).json({
    version: "v1",
    Api_Health:"working"
  }));
  app.use("/api/user", userRoutes);
  app.use("/api/job", jobRoutes)
  app.use(errorMiddleware);

  // app.use((req:Request, res:Response, next:NextFunction) => {
  //   const error:Error = new Error("Not found");
  //   error.status = 404;
  //   next(error);
  // });
  
  // app.use(HandleErrors);
  // app.use((error, req:Request, res:Response, next:NextFunction) => {
  //   res.status(error.status || 500);
  //   res.json({
  //     error: {
  //       message: error.message,
  //     },
  //   });
  // });

}
