import express from 'express';
// 👇 Corrected import statement
import isAuthenticated from '../middlewares/isAuthenticates.js'; 
// import { register, login, logout, updateProfile } from '../controllers/user.controller.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.route("/post").post (isAuthenticated, postJob);
router.route("/get").get (isAuthenticated, getAllJobs);
router.route("/getadminjobs").get (isAuthenticated, getAdminJobs);
router.route("/get/:id").get (isAuthenticated, getJobById);


// It's standard practice to only export the router from a route file.
export default router;


// import express from 'express';
// import isAuthenticated from '../middlewares/isAuthenticates.js';
// import { getAdminJobs, getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

// const router = express.Router();

// router.post("/post", isAuthenticated, postJob);
// router.get("/get", isAuthenticated, getAllJobs);
// router.get("/getadminjobs", isAuthenticated, getAdminJobs);  // ✅ changed to GET
// router.get("/get/:id", isAuthenticated, getJobById);

// export default router;

