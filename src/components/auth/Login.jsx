import React, { useState } from "react";
import { Navbar } from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup} from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";


export const Login = () => {
const [input,setInput] = useState({
    email:"",
    password:"",
    role:"",
   
  });
  const { loading } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
     setInput({...input,[e.target.name]:e.target.value});
  }


   const submitHandler = async (e) =>{
    e.preventDefault();
    const formData = new FormData();

    formData.append("email",input.email);
    formData.append("password",input.password);
    formData.append("role",input.role);

    if(input.file){
      formData.append("file", input.file);

    }
    try {
      dispatch(setLoading(true));
      console.log("Sending login request with data:", input); // Log input data
      const res = await axios.post(`${USER_API_END_POINT}/login`, input,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true,
      });
      console.log("Backend response:", res.data); // Log full response

      if(res.data.success){
        navigate("/");
        toast.success(res.data.message); // Corrected path
      }

    } catch (error) {
      console.log("Error in login:", error);
      console.log("Error response:", error?.response?.data); // Log error details
      toast.error(error?.response?.data?.message);
    }

    finally{
      dispatch(setLoading(false));
    }
  }
  

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
             type="email"
             value={input.email}
             name="email"
             onChange={changeEventHandler}
             placeholder="Patel@gmail.com" />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input 
            type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler} 
            placeholder="Patel@gmail.com" />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                   checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
             loading ? (
               <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>
             ) :  <Button type="submit" className='w-full my-4'>Login</Button>
          }
               
              
              <span className="text-sm">Don't Have an account? 
                <Link to ="/signup" className="text-blue-600">signup</Link></span>

        </form>
      </div>
    </div>
  );
};

export default Login
