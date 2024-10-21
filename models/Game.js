const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const GameSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum:["Jeu2D", "Jeu3D"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

GameSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = Game = mongoose.model('games', GameSchema);
