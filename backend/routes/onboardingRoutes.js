const express = require("express");
const router = express.Router();
const onboardingController = require("../controllers/OnboardingController");

// Create new onboarding
router.post("/create", onboardingController.createOnboarding);

// Get all onboarding entries
router.get("/", onboardingController.getAllOnboarding);

// Get specific onboarding
router.get("/:id", onboardingController.getOnboardingById);

// Update onboarding
router.put("/:id", onboardingController.updateOnboarding);

module.exports = router;
