import * as Yup from "yup";

const signupSchema = Yup.object({
    name:Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please retype your password"),
  });

const signinSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  });


  const jobSchema = Yup.object({
    job_title :Yup.string().required("Job Title is required"),
    job_description :Yup.string().required("Job Description is required"),
    skills :Yup.string().required("Skill is required"),
    salary: Yup.number().required("Salary is required"),
    location:Yup.string().required("Location is required"),
    is_active :Yup.boolean().notRequired().nullable()
  });

  export {
    signupSchema,
    signinSchema,
    jobSchema
  }