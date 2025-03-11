const Profile = require("../models/onboarding");
const Onboarding = require("../models/onboarding");

// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new profile
exports.createProfile = async (req, res) => {
  try {
    const profile = new Profile(req.body);
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a profile
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    Object.assign(profile, req.body);
    const updatedProfile = await profile.save();
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    await profile.remove();
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new onboarding entry
exports.createOnboarding = async (req, res) => {
  try {
    const onboarding = new Onboarding(req.body);
    const newOnboarding = await onboarding.save();
    res.status(201).json(newOnboarding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all onboarding entries
exports.getAllOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.find();
    res.status(200).json(onboarding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single onboarding by ID
exports.getOnboardingById = async (req, res) => {
  try {
    const onboarding = await Onboarding.findById(req.params.id);
    if (!onboarding) {
      return res.status(404).json({ message: "Onboarding data not found" });
    }
    res.status(200).json(onboarding);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update onboarding
exports.updateOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.findById(req.params.id);
    if (!onboarding) {
      return res.status(404).json({ message: "Onboarding data not found" });
    }

    Object.assign(onboarding, req.body);
    const updatedOnboarding = await onboarding.save();
    res.status(200).json(updatedOnboarding);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
