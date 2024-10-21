const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameResultSchema = new Schema({
    profile_id: {
        type: Schema.Types.ObjectId,
        ref: 'profiles',
        required: true
    },
    game_id: {
        type: Schema.Types.ObjectId,
        ref: 'games',
        required: true
    },
    good_answer: {
        type: Number,
        default: 0
    },
    bad_answer: {
        type: Number,
        default: 0
    },
    temps_mis: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true 
});

GameResultSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('game_results', GameResultSchema);
