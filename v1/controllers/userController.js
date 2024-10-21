const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'SunuEmoAutiste';

// Register User
exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all fields',
            data: {}
        });
    }

    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'L\'utilisateur existe déjà, Veuillez vous connecter',
                    data: {}
                });
            }

            const newUser = new User({ username, email, password });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.status(201).json({
                                id: user.id,
                                username: user.username,
                                email: user.email
                            });
                        });
                });
            });
        });
};

// Login User
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all fields',
            data: {}
        });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User does not exist',
                    data: {}
                });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({
                            status: 'error',
                            message: 'Invalid credentials',
                            data: {}
                        });
                    }

                    jwt.sign(
                        { id: user.id },
                        JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.status(200).json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    email: user.email
                                }
                            });
                        }
                    );
                });
        });
};

// Get User by ID
exports.getUserById = (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                    data: {}
                });
            }
            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                created_at: user.createdAt,
                updated_at: user.updatedAt
            });
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    const { filter, range, sort } = req.query;

    // Parse the filter, range, and sort from the query string
    const parsedFilter = filter ? JSON.parse(filter) : {};
    const parsedRange = range ? JSON.parse(range) : [0, 10];
    const parsedSort = sort ? JSON.parse(sort) : ["_id", "ASC"];

    const _start = parsedRange[0];
    const _end = parsedRange[1];
    const _sort = parsedSort[0];
    const _order = parsedSort[1];

    let query = {};

    // Handling the special case for filter containing an array of objects with username and id
    if (parsedFilter.id && Array.isArray(parsedFilter.id)) {
        query = {
            $or: parsedFilter.id.map(item => ({
                username: item.username,
                _id: item.id
            }))
        };
    } else {
        // Default filter
        query = parsedFilter;
    }

    try {
        const users = await User.find(query)
            .sort({ [_sort]: _order === 'ASC' ? 1 : -1 })
            .skip(parseInt(_start))
            .limit(parseInt(_end) - parseInt(_start));
        const totalUsers = await User.countDocuments(query);

        const usersWithId = users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            password: user.password
        }));

        res.set('Content-Range', `users ${_start}-${_end}/${totalUsers}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(usersWithId);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// Update User
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    let userFields = {};
    if (username) userFields.username = username;
    if (email) userFields.email = email;
    if (password) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        status: 'error',
                        message: 'Server error',
                        data: {}
                    });
                }
                userFields.password = hash;

                User.findByIdAndUpdate(
                    id,
                    { $set: userFields },
                    { new: true }
                )
                .then(user => res.status(200).json({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    created_at: user.createdAt,
                    updated_at: user.updatedAt
                }))
                .catch(err => res.status(500).json({
                    status: 'error',
                    message: 'Server error',
                    data: {}
                }));
            });
        });
    } else {
        User.findByIdAndUpdate(
            id,
            { $set: userFields },
            { new: true }
        )
        .then(user => res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updatedAt
        }))
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
        }
        };
        
// Delete User
exports.deleteUser = (req, res) => {
        const { id } = req.params;
        User.deleteOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found',
                    data: {}
                });
            }
            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email
            });
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
    };    
