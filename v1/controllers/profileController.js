const Profile = require('../models/Profile');
const mongoose = require('mongoose');

// Create Profile
exports.createProfile = async (req, res) => {
    const { user, name, age, defaultCharacter } = req.body;

    if (!user || !name || !age || !defaultCharacter) {
        return res.status(400).json({
            message: 'Please enter all fields'
        });
    }

    const newProfile = new Profile({ user, name, age, defaultCharacter });

    try {
        // Sauvegarde du nouveau profil
        const profile = await newProfile.save();

        // Populer le champ user avec les données associées
        const populatedProfile = await Profile.findById(profile._id).populate('user');

        // Renvoyer la réponse avec les informations peuplées du user
        res.status(201).json({
            id: populatedProfile._id,
            user: populatedProfile.user,  
            name: populatedProfile.name,
            age: populatedProfile.age,
            defaultCharacter: populatedProfile.defaultCharacter,
            created_at: populatedProfile.createdAt,
            updated_at: populatedProfile.updatedAt
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to create profile'
        });
    }
};


// Get All Profiles
exports.getAllProfiles = async (req, res) => {
    const { _start, _end, _sort, _order, q } = req.query;

    const filter = q ? { $or: [{ name: new RegExp(q, 'i') }, { defaultCharacter: new RegExp(q, 'i') }] } : {};

    try {
        const profiles = await Profile.find(filter)
            .sort({ [_sort]: _order === 'ASC' ? 1 : -1 })
            .skip(parseInt(_start))
            .limit(parseInt(_end) - parseInt(_start))
            .populate('user', 'username');
        const totalProfiles = await Profile.countDocuments(filter);

        const profilesWithId = profiles.map(profile => ({
            id: profile._id,
            user: profile.user,
            name: profile.name,
            age: profile.age,
            defaultCharacter: profile.defaultCharacter,
            lastModified: profile.lastModified
        }));

        res.set('Content-Range', `profiles ${_start}-${_end}/${totalProfiles}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(profilesWithId);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get Profile by ID
exports.getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id).populate('user');
        if (!profile) {
            return res.status(404).json({
                message: 'Cannot find profile'
            });
        }
        res.status(200).json({
            id: profile._id,
            user: profile.user,
            name: profile.name,
            age: profile.age,
            defaultCharacter: profile.defaultCharacter,
            lastModified: profile.lastModified
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

// Get Profiles by User ID
exports.getProfilesByUserId = async (req, res) => {
    try {
        console.log(req.params.userId)
        const userId = new mongoose.Types.ObjectId(req.params.userId);
        const profiles = await Profile.find({ user: userId }).populate('user', 'username');
        if (!profiles.length) {
            return res.status(404).json({
                status:"error",
                message: 'No profiles found for this user'
            });
        }
        res.status(200).json(profiles.map(profile => ({
            id: profile._id,
            user: profile.user,
            name: profile.name,
            age: profile.age,
            defaultCharacter: profile.defaultCharacter,
            lastModified: profile.lastModified
        })));
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    const { name, age, defaultCharacter } = req.body;

    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({
                message: 'Cannot find profile'
            });
        }

        if (name != null) profile.name = name;
        if (age != null) profile.age = age;
        if (defaultCharacter != null) profile.defaultCharacter = defaultCharacter;
        profile.lastModified = Date.now();

        const updatedProfile = await profile.save();
        res.status(200).json({
            id: updatedProfile._id,
            user: updatedProfile.user,
            name: updatedProfile.name,
            age: updatedProfile.age,
            defaultCharacter: updatedProfile.defaultCharacter,
            lastModified: updatedProfile.lastModified
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};

// Delete Profile
exports.deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        if (!profile) {
            return res.status(404).json({
                message: 'Cannot find profile'
            });
        }
        await profile.deleteOne({ _id: req.params.id });
        res.status(200).json({
            id: profile._id,
            user: profile.user,
            name: profile.name,
            age: profile.age,
            defaultCharacter: profile.defaultCharacter,
            lastModified: profile.lastModified
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
