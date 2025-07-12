import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Import icons from react-icons
import {
  FaHome,
  FaUtensils,
  FaRunning,
  FaChartBar,
  FaWater,
  FaBed,
  FaHeartbeat,
  FaWalking,
  FaCamera,
  FaBell,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/Sidebar";
import TopNavigation from "../components/TopNavigation";
import DateSelector from "../components/DateSelector";
import DashboardContent from "../components/DashboardContent";
import NutritionContent from "../components/NutritionContent";
import ActivitiesContent from "../components/ActivitiesContent";
import ReportsContent from "../components/ReportsContent";

// Main Dashboard Component
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(6); // Default to day 6 (Tuesday)
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sections = [
    "dashboard",
    "nutrition",
    "activities",
    "reports",
    "snap_meal",
  ];

  // Dummy user data
  const userData = {
    name: "User",
    calorieGoal: 2000,
    currentCalories: 1450,
    macros: {
      protein: { current: 85, goal: 120 },
      carbs: { current: 180, goal: 250 },
      fat: { current: 45, goal: 65 },
      fiber: { current: 18, goal: 30 },
    },
    weeklyCalories: [
      { day: "Mon", calories: 1490 },
      { day: "Tue", calories: 1598 },
      { day: "Wed", calories: 1650 },
      { day: "Thu", calories: 1452 },
      { day: "Fri", calories: 1826 },
      { day: "Sat", calories: 1326 },
      { day: "Sun", calories: 1320 },
    ],
    activities: [
      { type: "Walking", duration: "30 min", calories: 150 },
      { type: "Cycling", duration: "45 min", calories: 320 },
      { type: "Gym", duration: "60 min", calories: 400 },
    ],
    water: { current: 5, goal: 8 }, // In glasses
    sleep: { hours: 7.5, quality: "Good" },
    heartRate: { current: 72, min: 65, max: 140 },
    steps: { current: 8500, goal: 10000 },
  };

  useEffect(() => {
    // Handle Google OAuth token from URL
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store the token
      localStorage.setItem("token", token);
      // Clean up the URL
      navigate("/dashboard", { replace: true });
    }

    // Update date every minute
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, [location, navigate]);

  const navigateSection = (direction) => {
    if (direction === "next" && activeSectionIndex < sections.length - 1) {
      setActiveSectionIndex(activeSectionIndex + 1);
    } else if (direction === "prev" && activeSectionIndex > 0) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Hidden on mobile by default, shown via menu button */}
      <div
        className={`${
          isSidebarCollapsed
            ? "hidden"
            : "fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
        }`}
        onClick={toggleSidebar}
      >
        <div className="fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-200 ease-in-out">
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
            activeSection={sections[activeSectionIndex]}
            onSectionChange={(section) => {
              if (section === "snap_meal") {
                navigate("/snap-meal");
                return;
              }
              setActiveSectionIndex(sections.indexOf(section));
              if (window.innerWidth < 768) toggleSidebar();
            }}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          activeSection={sections[activeSectionIndex]}
          onSectionChange={(section) => {
            if (section === "snap_meal") {
              navigate("/snap-meal");
              return;
            }
            setActiveSectionIndex(sections.indexOf(section));
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation with hamburger menu for mobile */}
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="md:hidden mr-4 text-gray-600"
                onClick={toggleSidebar}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <FaBell className="text-gray-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <FaUser className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Date Selector - Scrollable on mobile */}
        <div className="p-4 bg-white border-b overflow-x-auto">
          <div className="flex items-center min-w-max">
            <DateSelector
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </div>
        </div>

        {/* Main Content Area with Animation */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSectionIndex}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="h-full overflow-y-auto p-4"
            >
              {activeSectionIndex === 0 && (
                <DashboardContent userData={userData} />
              )}
              {activeSectionIndex === 1 && (
                <NutritionContent userData={userData} />
              )}
              {activeSectionIndex === 2 && (
                <ActivitiesContent userData={userData} />
              )}
              {activeSectionIndex === 3 && (
                <ReportsContent userData={userData} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section Navigation Controls */}
        <div className="flex justify-center py-3 bg-white border-t">
          <button
            onClick={() => navigateSection("prev")}
            disabled={activeSectionIndex === 0}
            className={`mx-2 p-2 rounded-full ${
              activeSectionIndex === 0
                ? "text-gray-300"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaChevronLeft />
          </button>
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => setActiveSectionIndex(index)}
              className={`mx-1 w-2 h-2 rounded-full ${
                activeSectionIndex === index ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          ))}
          <button
            onClick={() => navigateSection("next")}
            disabled={activeSectionIndex === sections.length - 1}
            className={`mx-2 p-2 rounded-full ${
              activeSectionIndex === sections.length - 1
                ? "text-gray-300"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Bottom Navigation for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t py-2">
          <div className="flex justify-around">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => setActiveSectionIndex(index)}
                className={`p-2 rounded-full ${
                  activeSectionIndex === index
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {index === 0 && <FaHome />}
                {index === 1 && <FaUtensils />}
                {index === 2 && <FaRunning />}
                {index === 3 && <FaChartBar />}
              </button>
            ))}
          </div>
        </div>

        {/* Support Chat Button - Adjusted for mobile */}
        <div className="fixed bottom-16 md:bottom-4 right-4 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
