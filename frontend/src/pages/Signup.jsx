import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/images/logo.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    number: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [strengthScore, setStrengthScore] = useState(0);
  const [strengthColor, setStrengthColor] = useState("bg-gray-200");
  const [showotp, setShowotp] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    // Initialize score
    let score = 0;

    // Check password length
    if (password.length >= 8) score += 1;

    // Check for uppercase
    if (/[A-Z]/.test(password)) score += 1;

    // Check for lowercase
    if (/[a-z]/.test(password)) score += 1;

    // Check for numbers
    if (/[0-9]/.test(password)) score += 1;

    // Check for special characters
    if (/[!@#$%^&*]/.test(password)) score += 1;

    setStrengthScore(score);

    // Set strength text and color based on score
    if (score === 0 || password === "") {
      setPasswordStrength("");
      setStrengthColor("bg-gray-200");
    } else if (score <= 2) {
      setPasswordStrength("Weak password");
      setStrengthColor("bg-red-500");
    } else if (score <= 4) {
      setPasswordStrength("Medium password");
      setStrengthColor("bg-yellow-500");
    } else {
      setPasswordStrength("Strong password");
      setStrengthColor("bg-green-500");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!strongPasswordRegex.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters long, include 1 uppercase letter, and 1 symbol"
      );
      return;
    }
    try {
      // First check if user exists
      const checkResponse = await axios.post(
        "http://localhost:4000/api/user/status",
        {
          email: formData.email,
        }
      );

      if (checkResponse.data.exists) {
        toast.error("Account already exists. Please login.");
        navigate("/login");
        return;
      }

      // Store user data in localStorage
      localStorage.setItem("tempUserData", JSON.stringify(formData));

      // If user doesn't exist, proceed with OTP
      await axios.post("http://localhost:4000/api/user/send-otp", {
        email: formData.email,
      });

      toast.success("OTP sent to your email!");

      // Navigate to OTP verification with form data
      navigate("/otp", {
        state: {
          email: formData.email,
          formData: formData,
          isNewUser: true, // Flag to indicate this is a new user
        },
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 px-4 py-8 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mx-auto max-w-6xl bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 sm:p-8 md:p-12 md:w-1/2">
            <div className="mb-6 text-center flex items-center justify-center gap-3">
              <img
                src={logo}
                alt="Fitness logo"
                className="w-12 h-12 rounded-full"
              />
              <h1 className="text-2xl sm:text-3xl font-bold">Swasthify</h1>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-center mb-8">
              Sign Up
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your phone number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-10"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    } absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>

                {/* Password strength meter */}
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((barNum) => (
                      <div
                        key={barNum}
                        className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                          barNum <= strengthScore
                            ? strengthColor
                            : "bg-gray-200"
                        }`}
                      ></div>
                    ))}
                  </div>
                  <p
                    className={`text-sm transition-all duration-300 ${
                      strengthScore <= 2
                        ? "text-red-600"
                        : strengthScore <= 4
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {passwordStrength}
                  </p>
                  {formData.password && (
                    <div className="text-xs mt-1 text-gray-600">
                      <ul className="grid grid-cols-2 gap-x-2">
                        <li
                          className={`transition-colors duration-300 ${
                            formData.password.length >= 8
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          • Min 8 characters
                        </li>
                        <li
                          className={`transition-colors duration-300 ${
                            /[A-Z]/.test(formData.password)
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          • Uppercase letter
                        </li>
                        <li
                          className={`transition-colors duration-300 ${
                            /[a-z]/.test(formData.password)
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          • Lowercase letter
                        </li>
                        <li
                          className={`transition-colors duration-300 ${
                            /[0-9]/.test(formData.password)
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          • Number
                        </li>
                        <li
                          className={`transition-colors duration-300 ${
                            /[!@#$%^&*]/.test(formData.password)
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          • Special character
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300 mt-6"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Log in
              </a>
            </p>
          </div>

          <div className="hidden md:block md:w-1/2">
            <img
              src="https://images.pexels.com/photos/1748447/pexels-photo-1748447.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Woman exercising with dumbbells"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
