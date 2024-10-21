const Game = require('../models/Game');

// Create a new Game
exports.createGame = (req, res) => {
    const { name, type, description } = req.body;

    if (!name || !type || !description) {
        return res.status(400).json({
            status: 'error',
            message: 'Please enter all fields',
            data: {}
        });
    }

    const newGame = new Game({ name, type, description });

    newGame.save()
        .then(game => {
            res.status(201).json(game.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get a Game by ID
exports.getGameById = (req, res) => {
    const { id } = req.params;

    Game.findById(id)
        .then(game => {
            if (!game) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Game not found',
                    data: {}
                });
            }
            res.status(200).json(game.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Get all Games
exports.getAllGames = async (req, res) => {
    const { q, range, sort } = req.query;

    // Parse the filter, range, and sort from the query string
    const parsedRange = range ? JSON.parse(range) : [0, 10];
    const parsedSort = sort ? JSON.parse(sort) : ["_id", "ASC"];

    const _start = parsedRange[0];
    const _end = parsedRange[1];
    const _sort = parsedSort[0];
    const _order = parsedSort[1];

    const filter = q ? { $or: [{ name: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }] } : {};

    try {
        const games = await Game.find(filter)
            .sort({ [_sort]: _order === 'ASC' ? 1 : -1 })
            .skip(parseInt(_start))
            .limit(parseInt(_end) - parseInt(_start));
        const totalGames = await Game.countDocuments(filter);

        res.set('Content-Range', `games ${_start}-${_end}/${totalGames}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range');
        res.status(200).json(games.map(game => game.toJSON()));
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// Update a Game by ID
exports.updateGame = (req, res) => {
    const { id } = req.params;
    const { name, type, description } = req.body;

    let gameFields = {};
    if (name) gameFields.name = name;
    if (type) gameFields.type = type;
    if (description) gameFields.description = description;

    Game.findByIdAndUpdate(
        id,
        { $set: gameFields },
        { new: true }
    )
        .then(game => {
            if (!game) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Game not found',
                    data: {}
                });
            }
            res.status(200).json(game.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};

// Delete a Game by ID
exports.deleteGame = (req, res) => {
    const { id } = req.params;

    Game.findByIdAndDelete(id)
        .then(game => {
            if (!game) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Game not found',
                    data: {}
                });
            }
            res.status(200).json(game.toJSON());
        })
        .catch(err => res.status(500).json({
            status: 'error',
            message: 'Server error',
            data: {}
        }));
};
