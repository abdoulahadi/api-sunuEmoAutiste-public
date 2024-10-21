const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const GameResult = require('../models/GameResult');

// Créer un nouveau résultat de jeu
exports.createGameResult = async (req, res) => {
    const { profile_id, game_id, good_answer, bad_answer, temps_mis, score } = req.body;

    if (!profile_id || !game_id) {
        return res.status(400).json({
            status: 'error',
            message: 'Veuillez fournir profile_id et game_id',
            data: {}
        });
    }

    try {
        const newGameResult = new GameResult({
            profile_id,
            game_id,
            good_answer: Number(good_answer) || 0,
            bad_answer: Number(bad_answer) || 0,
            temps_mis: Number(temps_mis) || 0,
            score: Number(score) || 0
        });

        const savedGameResult = await newGameResult.save();

        res.status(201).json(savedGameResult);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// Obtenir un résultat de jeu par ID
exports.getGameResultById = async (req, res) => {
    const { id } = req.params;

    try {
        const gameResult = await GameResult.findById(id)
            .populate('profile_id', 'name') // Populate les données de l'utilisateur
            .populate('game_id', 'name'); // Suppose que le modèle Game a un champ 'name'

        if (!gameResult) {
            return res.status(404).json({
                status: 'error',
                message: 'Résultat de jeu non trouvé',
                data: {}
            });
        }

        res.status(200).json(gameResult);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Erreur du serveur',
            data: {}
        });
    }
};

// Obtenir tous les résultats de jeu
exports.getAllGameResults = async (req, res) => {
    try {
        const gameResults = await GameResult.find()
            .populate('profile_id', 'name')
            .populate('game_id', 'name');

        res.status(200).json(gameResults);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Erreur du serveur',
            data: {}
        });
    }
};

// Mettre à jour un résultat de jeu
exports.updateGameResult = async (req, res) => {
    const { id } = req.params;
    const { good_answer, bad_answer, temps_mis, score } = req.body;

    let updateFields = {};
    if (good_answer !== undefined) updateFields.good_answer = good_answer;
    if (bad_answer !== undefined) updateFields.bad_answer = bad_answer;
    if (temps_mis !== undefined) updateFields.temps_mis = temps_mis;
    if (score !== undefined) updateFields.score = score;

    try {
        const updatedGameResult = await GameResult.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
        )
        .populate('profile_id', 'name')
        .populate('game_id', 'name');

        if (!updatedGameResult) {
            return res.status(404).json({
                status: 'error',
                message: 'Résultat de jeu non trouvé',
                data: {}
            });
        }

        res.status(200).json(updatedGameResult);
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Erreur du serveur',
            data: {}
        });
    }
};

// Supprimer un résultat de jeu
exports.deleteGameResult = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGameResult = await GameResult.findByIdAndDelete(id);

        if (!deletedGameResult) {
            return res.status(404).json({
                status: 'error',
                message: 'Résultat de jeu non trouvé',
                data: {}
            });
        }

        res.status(200).json({
            message: 'Résultat de jeu supprimé avec succès',
            data: deletedGameResult
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Erreur du serveur',
            data: {}
        });
    }

};

// 1. Calcul des Agrégats Globaux et Par Utilisateur
exports.getAggregates = async (req, res) => {
    try {
        // Agrégats globaux pour tous les utilisateurs et jeux
        const globalAggregates = await GameResult.aggregate([
            {
                $group: {
                    _id: null,
                    totalGoodAnswers: { $sum: "$good_answer" },
                    totalBadAnswers: { $sum: "$bad_answer" },
                    averageTempsMis: { $avg: "$temps_mis" },
                    averageScore: { $avg: "$score" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalGoodAnswers: 1,
                    totalBadAnswers: 1,
                    averageTempsMis: 1,
                    averageScore: 1
                }
            }
        ]);

        // Agrégats par utilisateur et par jeu
        const profileGameAggregates = await GameResult.aggregate([
            {
                $group: {
                    _id: { profile_id: "$profile_id", game_id: "$game_id" },
                    totalGoodAnswers: { $sum: "$good_answer" },
                    totalBadAnswers: { $sum: "$bad_answer" },
                    averageTempsMis: { $avg: "$temps_mis" },
                    averageScore: { $avg: "$score" }
                }
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: '_id.profile_id',
                    foreignField: '_id',
                    as: 'profile'
                }
            },
            {
                $lookup: {
                    from: 'games',
                    localField: '_id.game_id',
                    foreignField: '_id',
                    as: 'game'
                }
            },
            {
                $unwind: "$profile"
            },
            {
                $unwind: "$game"
            },
            {
                $project: {
                    _id: 0,
                    profile_id: "$_id.profile_id",
                    name: "$profile.name",
                    game_id: "$_id.game_id",
                    gameName: "$game.name",
                    totalGoodAnswers: 1,
                    totalBadAnswers: 1,
                    averageTempsMis: 1,
                    averageScore: 1
                }
            }
        ]);

        res.status(200).json({
            globalAggregates: globalAggregates[0],
            profileGameAggregates
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

// 2. Calcul des Agrégats pour un Utilisateur Spécifique
exports.getProfileAggregates = async (req, res) => {
    const { profileId } = req.params;

    try {
        const profileAggregates = await GameResult.aggregate([
            { $match: { profile_id: new mongoose.Types.ObjectId(profileId) } },
            {
                $group: {
                    _id: "$game_id",
                    totalGoodAnswers: { $sum: "$good_answer" },
                    totalBadAnswers: { $sum: "$bad_answer" },
                    averageTempsMis: { $avg: "$temps_mis" },
                    averageScore: { $avg: "$score" }
                }
            },
            {
                $lookup: {
                    from: 'games',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'game'
                }
            },
            {
                $unwind: "$game"
            },
            {
                $project: {
                    _id: 0,
                    game_id: "$_id",
                    gameName: "$game.name",
                    totalGoodAnswers: 1,
                    totalBadAnswers: 1,
                    averageTempsMis: 1,
                    averageScore: 1
                }
            }
        ]);

        res.status(200).json({
            profileId,
            aggregates: profileAggregates
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};

exports.getTop3ScoresPerGame = async (req, res) => {
    try {
        const gameId = new ObjectId(req.params.gameId);
        const profileId = new ObjectId(req.params.profileId);

        // Obtenir le Top 3 pour le jeu spécifique
        const topScoresResult = await GameResult.aggregate([
            { $match: { game_id: gameId } },
            { $sort: { score: -1 } },
            {
                $group: {
                    _id: "$game_id",
                    topScores: { 
                        $push: { 
                            profile_id: "$profile_id", 
                            score: "$score", 
                            createdAt: "$createdAt" 
                        } 
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    game_id: "$_id",
                    topScores: { $slice: ["$topScores", 3] } // Limiter aux 3 meilleurs scores
                }
            },
            {
                $lookup: {
                    from: 'games',
                    localField: 'game_id',
                    foreignField: '_id',
                    as: 'game'
                }
            },
            { $unwind: "$game" },
            {
                $unwind: "$topScores" // Décompresser le tableau topScores pour traiter chaque score individuellement
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: 'topScores.profile_id',
                    foreignField: '_id',
                    as: 'profileDetails'
                }
            },
            {
                $unwind: "$profileDetails" // Décompresser le tableau profileDetails pour récupérer les détails du profil
            },
            {
                $addFields: {
                    "topScores.profile": {
                        name: "$profileDetails.name",
                        email: "$profileDetails.email"
                    }
                }
            },
            {
                $group: {
                    _id: "$game_id",
                    gameName: { $first: "$game.name" },
                    topScores: { $push: "$topScores" } // Regrouper à nouveau pour reconstituer le tableau de topScores
                }
            }
        ]);

        // Log pour vérifier la structure de topScoresResult
        console.log("TopScoresResult:", JSON.stringify(topScoresResult, null, 2));

        // Si topScoresResult est vide, renvoyer une erreur 404
        if (!topScoresResult.length) {
            return res.status(404).json({ message: 'Top scores not found' });
        }

        const topScores = topScoresResult[0].topScores; // Extraire les top scores du premier jeu
        const gameName = topScoresResult[0].gameName;

        // Log pour vérifier la structure de topScores
        console.log("TopScores:", JSON.stringify(topScores, null, 2));

        // Vérifier que topScores est bien un tableau
        if (!Array.isArray(topScores)) {
            return res.status(500).json({ message: 'Top scores is not an array', data: topScores });
        }

        // Chercher si le profil spécifié est dans le Top 3
        const isInTop3 = topScores.some(score => score.profile_id.equals(profileId));
        console.log(isInTop3)
        // Si le profil n'est pas dans le top 3, calculer son rang
        let profileRank = null;
        if (!isInTop3) {
            const profileRankResult = await GameResult.aggregate([
                { $match: { game_id: gameId } },
                { $sort: { score: -1 } },
                {
                    $group: {
                        _id: "$game_id",
                        scores: { $push: { profile_id: "$profile_id", score: "$score" } }
                    }
                },
                {
                    $project: {
                        scores: {
                            $map: {
                                input: "$scores",
                                as: "item",
                                in: {
                                    profile_id: "$$item.profile_id",
                                    score: "$$item.score",
                                    rank: { $indexOfArray: ["$scores.profile_id", "$$item.profile_id"] }
                                }
                            }
                        }
                    }
                },
                { $unwind: "$scores" },
                { $match: { "scores.profile_id": profileId } },
                { $project: { _id: 0, rank: { $add: ["$scores.rank", 1] }, score: "$scores.score" } }
            ]);

            if (profileRankResult.length > 0) {
                profileRank = profileRankResult[0];
            }
           
        }

        // Structurer la réponse
        const response = {
            topScores: topScores.map(score => ({
                profile_id: score.profile_id,
                score: score.score,
                createdAt: score.createdAt,
                profile: score.profile
            })),
            gameName
        };

        // Ajouter le rang du profil si ce dernier n'est pas dans le top 3
        if (profileRank && !isInTop3) {
            response.profileRank = profileRank;
        }

        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: err.message,
            data: {}
        });
    }
};
