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
  const navigate = useNavigate();
  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/user/login", {
        identifier: identify,
        password,
      });

      if (response.data) {
        toast.success("Login successful!");

        // Check if onboarding is completed
        if (response.data.isOnboardingCompleted) {
          navigate("/dashboard");
        } else {
          navigate("/onboarding");
        }
      }
    } catch (error) {
      console.error("Error during login", error);
      if (error.code === "ERR_NETWORK") {
        toast.error("Network error. Please check if the server is running.");
      } else {
        toast.error(error.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="bg-pink-100 flex items-center justify-center min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left Section - Login Form */}
        <div className="p-12 md:w-1/2 flex flex-col justify-center">
          {/* Logo Header */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <img
              src={logo}
              alt="Fitness logo"
              className="rounded-4xl"
              width="50"
              height="50"
            />
            <h1 className="text-3xl font-bold">Swasthify</h1>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Log in</h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Email/Mobile Input */}
            <div className="mb-4">
              <label className="block text-gray-700">
                Email or Mobile Number
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
                placeholder="Email or Mobile Number"
                value={identify}
                onChange={(e) => setIdentify(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } absolute right-3 top-[58%] text-gray-500 cursor-pointer`}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className=" items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-purple-600"
                />
                <span className="ml-2 text-gray-700">Keep me logged in</span>
              </label>
              <a href="#" className="text-purple-600">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
            >
              Log in
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-600">
              Sign Up
            </a>
          </p>

          {/* Footer Links */}
          <div className="text-center mt-6 text-gray-500">
            <a href="#" className="mr-2">
              Terms of Use
            </a>{" "}
            |{" "}
            <a href="#" className="ml-2">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://images.pexels.com/photos/1748447/pexels-photo-1748447.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Woman exercising with dumbbells"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
