// import jwt from 'jsonwebtoken';
// const isAuthenticated = async (req, res, next) => {
// try {
//     const token = req.cookies.token;
//     if(!token){
//         return res.status(401).json({
//             message:"User not authenticated",
//             success:false,
//         })
//     }

//     const decode =  jwt.verify(token, process.env.JWT_SECRET);

//      req.id = decode.id;
//     next();
//     // if (!decode) {
//     //     return res.status(401).json({
//     //         message: "Invalid Token",
//     //         success: false,
//     //     });
//     // }
//     req.id = decode.id;
//     next();

//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }

// }
   
// export default isAuthenticated;




import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token; // make sure the cookie exists
    if(!token){
      return res.status(401).json({
        message:"User not authenticated",
        success:false,
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decode.userId; // match your controller
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;



