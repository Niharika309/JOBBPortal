// import express from 'express';
// const router = express.Router();
// import { register, login,  updateProfile  } from '../controllers/user.controller.js';
// import { isAuthenticated } from '../middlewares/server/middlewares/isAuthenticates.js';

// router.route('/register').post(register);
// router.route('/login').post(login);
// router.route('/profile/update').post(isAuthenticated,updateProfile);

// export default {router,register,login};


import express from 'express';
// 👇 Corrected import statement
import isAuthenticated from '../middlewares/isAuthenticates.js';
import { singleUpload } from '../middlewares/multer.js';
import { register, login, logout, updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/register').post(singleUpload,register);
router.route('/login').post(login);
// The middleware is now correctly referenced
router.route('/profile/update').post(isAuthenticated, updateProfile);

// It's standard practice to only export the router from a route file.
export default router;