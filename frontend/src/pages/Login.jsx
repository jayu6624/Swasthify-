// // Import statements
// import { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axios";

// // Styles
// import "react-toastify/dist/ReactToastify.css";

// // Assets
// import logo from "../assets/images/logo.jpg";

// const Login = () => {
//   // State management
//   const [identify, setIdentify] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Animation effect on component mount
//   useEffect(() => {
//     document.querySelector(".login-container").classList.add("fade-in");
//   }, []);

//   // Form submission handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!identify.trim() || !password) {
//       toast.warning("Please enter all required fields");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await axiosInstance.post("/user/login", {
//         identifier: identify.trim(),
//         password,
//       });

//       if (response.data) {
//         // Store token if your backend sends it
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token);

//           // Save user identifier if remember me is checked
//           if (rememberMe) {
//             localStorage.setItem("savedIdentifier", identify.trim());
//           } else {
//             localStorage.removeItem("savedIdentifier");
//           }
//         }

//         toast.success("Login successful! Welcome back to Swasthify");

//         setTimeout(() => {
//           if (response.data.isOnboardingCompleted) {
//             navigate("/dashboard");
//           } else {
//             navigate("/onboarding");
//           }
//         }, 1000); // Slight delay for better user experience
//       }
//     } catch (error) {
//       console.error("Login error details:", {
//         code: error.code,
//         message: error.message,
//         response: error.response,
//       });

//       if (error.code === "ERR_NETWORK") {
//         toast.error("Server connection failed. Please try again.");
//       } else if (error.response?.status === 401) {
//         toast.error(
//           "Invalid credentials. Please check your email/phone and password."
//         );
//       } else if (error.response?.status === 403) {
//         toast.error("Access forbidden. Please contact support.");
//       } else {
//         toast.error(
//           error.response?.data?.message || "Login failed. Please try again."
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Check for saved identifier on component mount
//   useEffect(() => {
//     const savedIdentifier = localStorage.getItem("savedIdentifier");
//     if (savedIdentifier) {
//       setIdentify(savedIdentifier);
//       setRememberMe(true);
//     }
//   }, []);

//   return (
//     <div className="bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center min-h-screen p-4 login-container opacity-0 transition duration-700">
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl transform hover:scale-[1.01] transition-all duration-300">
//         {/* Left Section - Login Form */}
//         <div className="p-8 md:p-12 lg:p-16 md:w-1/2 flex flex-col justify-center relative">
//           {/* Decorative Element */}
//           <div className="absolute top-0 left-0 w-20 h-20 bg-purple-100 rounded-br-full opacity-70"></div>

//           {/* Logo Header with slight animation */}
//           <div className="mb-8 flex items-center justify-center gap-4 hover:transform hover:scale-105 transition duration-300">
//             <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full shadow-sm">
//               <img
//                 src={logo}
//                 alt="Swasthify logo"
//                 className="rounded-full w-12 h-12 object-cover"
//               />
//             </div>
//             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
//               Swasthify
//             </h1>
//           </div>

//           <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
//             Welcome Back
//           </h2>

//           {/* Login Form with enhanced styling */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email/Mobile Input */}
//             <div className="space-y-2">
//               <label className="block text-gray-700 font-medium">
//                 Email or Mobile Number
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                   </svg>
//                 </span>
//                 <input
//                   type="text"
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
//                   placeholder="Email or Mobile Number"
//                   value={identify}
//                   onChange={(e) => setIdentify(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div className="space-y-2">
//               <label className="block text-gray-700 font-medium">
//                 Password
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 transition"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
//                         clipRule="evenodd"
//                       />
//                       <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                     </svg>
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                 />
//                 <span className="ml-2 text-gray-700">Keep me logged in</span>
//               </label>
//               <a
//                 href="#"
//                 className="text-purple-600 hover:text-purple-800 transition duration-200 hover:underline"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             {/* Submit Button with loading state */}
//             <button
//               type="submit"
//               className={`w-full ${
//                 isLoading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
//               } text-white font-semibold py-3 px-4 rounded-xl transform transition duration-300 ${
//                 !isLoading && "hover:-translate-y-1 hover:shadow-lg"
//               }`}
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Logging in...
//                 </span>
//               ) : (
//                 "Log in"
//               )}
//             </button>
//           </form>

//           {/* Social Login Options (Optional) */}
//           <div className="mt-8">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-3 gap-3">
//               <button
//                 type="button"
//                 className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   viewBox="0 0 48 48"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
//                     fill="#4285F4"
//                   />
//                   <path
//                     d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
//                     fill="#34A853"
//                   />
//                   <path
//                     d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
//                     fill="#FBBC04"
//                   />
//                   <path
//                     d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
//                     fill="#EA4335"
//                   />
//                 </svg>
//               </button>

//               <button
//                 type="button"
//                 className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   viewBox="0 0 48 48"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M24.0002 0C10.7452 0 0 10.7452 0 24.0002C0 37.2551 10.7452 48 24.0002 48C37.2551 48 48 37.2551 48 24.0002C48 10.7452 37.2551 0 24.0002 0Z"
//                     fill="#1DA1F2"
//                   />
//                   <path
//                     d="M36.5754 16.2895C35.8423 16.6301 35.0564 16.8682 34.2421 16.9851C35.0964 16.4863 35.7507 15.6874 36.0504 14.7374C35.2654 15.2033 34.3909 15.5493 33.4576 15.7363C32.7008 14.9373 31.6386 14.4373 30.4589 14.4373C28.156 14.4373 26.3045 16.3177 26.3045 18.6297C26.3045 18.9677 26.3333 19.2857 26.4067 19.5857C22.8957 19.4157 19.7934 17.7737 17.662 15.2687C17.282 15.9067 17.0547 16.6297 17.0547 17.4177C17.0547 18.8937 17.8308 20.1937 18.9689 20.9077C18.3118 20.9077 17.6827 20.7298 17.1266 20.4558C17.1266 20.4558 17.1266 20.4738 17.1266 20.4918C17.1266 22.5298 18.5542 24.2398 20.4251 24.6378C20.071 24.7338 19.6809 24.7738 19.2768 24.7738C19.0009 24.7738 18.7111 24.7618 18.4444 24.7018C19.0249 26.3638 20.5651 27.5978 22.3828 27.6318C20.9731 28.7618 19.2017 29.4338 17.2848 29.4338C16.9185 29.4338 16.5783 29.4218 16.2222 29.3838C18.0659 30.5918 20.2375 31.2838 22.5561 31.2838C30.4387 31.2838 34.7244 24.8458 34.7244 19.2738C34.7244 19.0738 34.715 18.8658 34.705 18.6658C35.5243 18.0977 36.0507 17.3897 36.5754 16.2895Z"
//                     fill="white"
//                   />
//                 </svg>
//               </button>

//               <button
//                 type="button"
//                 className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   viewBox="0 0 48 48"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77163 45.908 20.25 47.7083V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3153 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6611C28.68 15.75 27.75 17.6002 27.75 19.4977V24H34.4062L33.3422 30.9375H27.75V47.7083C39.2284 45.908 48 35.9789 48 24Z"
//                     fill="#1877F2"
//                   />
//                   <path
//                     d="M33.3422 30.9375L34.4062 24H27.75V19.4977C27.75 17.6002 28.68 15.75 31.6611 15.75H34.6875V9.84375C34.6875 9.84375 31.9402 9.375 29.3153 9.375C23.8331 9.375 20.25 12.6975 20.25 18.7125V24H14.1562V30.9375H20.25V47.7083C21.4901 47.9013 22.7397 48 24 48C25.2603 48 26.5099 47.9013 27.75 47.7083V30.9375H33.3422Z"
//                     fill="white"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Sign Up Link */}
//           <p className="text-center mt-8 text-gray-600">
//             Don't have an account?{" "}
//             <a
//               href="/signup"
//               className="text-purple-600 font-medium hover:text-purple-800 hover:underline transition duration-200"
//             >
//               Sign Up
//             </a>
//           </p>

//           {/* Footer Links */}
//           <div className="text-center mt-6 text-gray-500 text-sm">
//             <a
//               href="#"
//               className="mr-2 hover:text-gray-700 transition duration-200"
//             >
//               Terms of Use
//             </a>{" "}
//             |{" "}
//             <a
//               href="#"
//               className="ml-2 hover:text-gray-700 transition duration-200"
//             >
//               Privacy Policy
//             </a>
//           </div>

//           {/* Decorative Element */}
//           <div className="absolute bottom-0 right-0 w-16 h-16 bg-pink-100 rounded-tl-full opacity-70"></div>
//         </div>

//         {/* Right Section - Image with enhanced styling */}
//         <div className="hidden md:block md:w-1/2 relative overflow-hidden">
//           <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
//           <img
//             src="https://images.pexels.com/photos/1748447/pexels-photo-1748447.jpeg?auto=compress&cs=tinysrgb&w=600"
//             alt="Woman exercising with dumbbells"
//             className="w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
//           />
//           <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black to-transparent">
//             <h3 className="text-white text-2xl font-bold">
//               Start Your Fitness Journey
//             </h3>
//             <p className="text-white text-opacity-80 mt-2">
//               Track your progress, set goals, and achieve results with Swasthify
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// Import statements
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";

// Styles
import "react-toastify/dist/ReactToastify.css";

// Assets
import logo from "../assets/images/logo.jpg";

const Login = () => {
  // State management
  const [identify, setIdentify] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!identify.trim() || !password) {
      toast.warning("Please enter all required fields");
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/user/login", {
        identifier: identify.trim(),
        password,
      });
console.log("Login response:", response.data);

      if (response.data) {
        
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          console.log("Token stored during login:", response.data.token);
        } else {
          console.log("No token in login response");
        }
        toast.success("Login successful!");
        console.log("response of a onbording : "+response.data.isOnboardingCompleted);
        
        if (response.data.isOnboardingCompleted) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.code === "ERR_NETWORK") {
        toast.error("Connection failed");
      } else if (error.response?.status === 401) {
        toast.error("Invalid credentials");
      } else {
        toast.error("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 flex items-center justify-center min-h-screen">
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="dark"
      />

      {/* Login Card with Green/Gray Theme */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md mx-4">
        {/* Header Bar */}
        <div className="bg-gray-900 px-6 py-4 flex items-center">
          <div className="flex items-center">
            <div className="bg-green-600 rounded-full p-1 mr-2">
              <img
                src={logo}
                alt="Swasthify logo"
                className="rounded-full w-8 h-8 border-2 border-white"
              />
            </div>
            <h1 className="text-xl font-bold text-white">Swasthify</h1>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-6">
          <h2 className="text-lg font-medium mb-5 text-gray-900 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.358-.035-.709-.104-1.047A5.001 5.001 0 0010 11z" clipRule="evenodd" />
            </svg>
            Sign In to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Mobile Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email or Mobile
              </label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors"
                placeholder="Enter email or mobile"
                value={identify}
                onChange={(e) => setIdentify(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500 h-4 w-4"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-600 hover:text-green-800 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2.5 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-5">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="/signup" className="text-green-600 hover:text-green-800 font-medium">
              Create Account
            </a>
          </div>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className="inline-flex justify-center items-center py-2.5 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.37273 0 0 5.37273 0 12C0 18.6273 5.37273 24 12 24C18.6273 24 24 18.6273 24 12C24 5.37273 18.6273 0 12 0Z" fill="white"/>
                <path d="M12.0003 4.80005C16.9091 4.80005 20.8003 8.69125 20.8003 13.6C20.8003 18.5088 16.9091 22.4 12.0003 22.4C7.09151 22.4 3.20031 18.5088 3.20031 13.6C3.20031 8.69125 7.09151 4.80005 12.0003 4.80005Z" fill="white"/>
                <path d="M13.4528 12.76H18.1604L18.4818 10.36H13.4528V8.75996C13.4528 7.57996 13.8088 6.75996 15.5341 6.75996H18.6001V4.18316C18.1996 4.12716 16.9646 4.00037 15.5185 4.00037C12.5023 4.00037 10.4528 5.82397 10.4528 8.39996V10.36H5.75977V12.76H10.4528V21.6004H13.4528V12.76Z" fill="#1877F2"/>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center py-2.5 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 12.2727C22.5 11.4545 22.4318 10.6818 22.3182 9.90909H12V14.0455H17.9091C17.6818 15.3182 16.9773 16.3636 15.9091 17.0682V19.6818H19.4091C21.4545 17.7955 22.5 15.2727 22.5 12.2727Z" fill="#4285F4"/>
                <path d="M12 22.5C14.7273 22.5 17.0455 21.5455 18.8182 19.6818L15.3182 17.0682C14.4545 17.6364 13.3182 17.9545 12 17.9545C9.13636 17.9545 6.72727 16 5.86364 13.3182H2.25V15.9545C4.02273 19.8636 7.72727 22.5 12 22.5Z" fill="#34A853"/>
                <path d="M5.86364 13.3182C5.68182 12.75 5.57955 12.1364 5.57955 11.5C5.57955 10.8636 5.68182 10.25 5.86364 9.68182V7.04545H2.25C1.59091 8.38636 1.22727 9.90909 1.22727 11.5C1.22727 13.0909 1.59091 14.6136 2.25 15.9545L5.86364 13.3182Z" fill="#FBBC05"/>
                <path d="M12 5.04545C13.4773 5.04545 14.7955 5.54545 15.8182 6.45455L18.8182 3.45455C17.0227 1.77273 14.7273 0.75 12 0.75C7.72727 0.75 4.02273 3.38636 2.25 7.29545L5.86364 9.93182C6.72727 7.25 9.13636 5.04545 12 5.04545Z" fill="#EA4335"/>
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex justify-center items-center py-2.5 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.2677 12.5C17.3577 14.78 15.4677 15.58 15.4677 15.58L15.4577 15.59H13.1577V7.79999H14.9177V11.49C14.9177 11.49 16.3177 10.86 16.2677 9.11999C16.2177 7.37999 14.8977 5.79999 12.7677 5.79999C10.6377 5.79999 8.72766 7.06999 8.72766 9.69999C8.72766 12.33 10.0177 14.38 12.6877 14.38C13.0477 14.38 13.3777 14.35 13.6877 14.28V16.38C13.3977 16.4 13.0877 16.41 12.7577 16.41C8.82766 16.41 6.00766 13.83 6.00766 9.85999C6.00766 5.89999 9.10766 3.57999 12.7477 3.57999C16.3877 3.57999 19.1177 6.19999 18.7577 9.35999C18.4777 11.92 17.2677 12.5 17.2677 12.5Z" fill="black"/>
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-5 pt-3 text-center text-xs text-gray-500">
            By signing in, you agree to our 
            <a href="#" className="text-green-600 hover:underline"> Terms </a>
            and
            <a href="#" className="text-green-600 hover:underline"> Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
