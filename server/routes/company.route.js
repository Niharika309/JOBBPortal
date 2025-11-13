import express from 'express';
// 👇 Corrected import statement
import isAuthenticated from '../middlewares/isAuthenticates.js'; 
import { register, login, updateProfile } from '../controllers/user.controller.js';
import { getCompanies, registerCompany, getCompanyById, updateCompany } from '../controllers/company.controller.js';

const router = express.Router();

router.route('/register').post(isAuthenticated, registerCompany);
router.route('/get').get(isAuthenticated, getCompanies);
router.route('/get/:id').get(isAuthenticated, getCompanyById);
router.route('/update/:id').put(isAuthenticated, updateCompany);

// The middleware is now correctly referenced
router.route('/profile/update').post(isAuthenticated, updateProfile);

// It's standard practice to only export the router from a route file.
export default router;