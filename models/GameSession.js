const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSessionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

GameSessionSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = GameSession = mongoose.model('game_sessions', GameSessionSchema);
