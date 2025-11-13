import express from 'express';
// 👇 Corrected import statement
import isAuthenticated from '../middlewares/isAuthenticates.js'; 
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';
import { updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route ("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);


// The middleware is now correctly referenced
router.route('/profile/update').post(isAuthenticated, updateProfile);

// It's standard practice to only export the router from a route file.
export default router;