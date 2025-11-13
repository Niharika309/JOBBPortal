import { Job } from "../models/job.model.js";
// ADMIN POST KAREGA JOB
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      company,
    } = req.body;
    const userId = req.id;
    console.log("req.body", req.body);

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }

    const newJob = await Job.create({
      title,
      description,
      requirements: Array.isArray(requirements)
        ? requirements
        : requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      company,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully",
      job: newJob,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const postJob = async (req, res) => {
//   try {
//     const adminId = req.id;
//     console.log("🟢 Admin ID:", adminId);
//     console.log("🟢 Raw Body:", req.body);

//     const {
//       title,
//       description,
//       requirements,
//       salary,
//       experince,
//       location,
//       jobType,
//       position,
//       companyID,
//     } = req.body;

//     console.log("🟢 Parsed fields:", {
//       title,
//       description,
//       requirements,
//       salary,
//       experince,
//       location,
//       jobType,
//       position,
//       companyID,
//     });

//     // Rest of code...

//     // ✅ basic validation
//     if (
//       !title ||
//       !description ||
//       !requirements ||
//       !salary ||
//       !experince ||
//       !location ||
//       !jobType ||
//       !position ||
//       !companyID
//     ) {
//       return res.status(400).json({
//         message: "All required fields must be provided.",
//         success: false,
//       });
//     }

//     // ✅ create new job
//     const newJob = await Job.create({
//       title,
//       description,
//       requirements: requirements.split(","),
//       salary: Number(salary),
//       experinceLevel: experince,
//       location,
//       jobType,
//       position,
//       company: companyID,
//       created_by: adminId,
//     });

//     return res.status(201).json({
//       message: "Job created successfully!",
//       job: newJob,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in postJob:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };

// export const getAdminJobs = async (req, res) => {
//   try {
//     const adminId = req.id;
//     console.log("Admin ID:", adminId);

//     const jobs = await Job.find({ created_by: adminId });

//     if (!jobs || jobs.length === 0) {
//       return res.status(404).json({
//         message: "No jobs found for this admin.",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       jobs,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in getAdminJobs:", error);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       success: false,
//     });
//   }
// };

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
//STUDENTS KE LIYE............ALL ABOVE
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//ADMIN KITNE JOB CREATE KI ABHI TAK
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    console.log("Admin ID:", adminId);

    const jobs = await Job.find({ created_by: adminId });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
