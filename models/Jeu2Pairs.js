const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Jeu2PairsSchema = new Schema({
    GameID: {
        type: Schema.Types.ObjectId,
        ref: 'games',
        required: true
    },
    Image1ID: {
        type: Schema.Types.ObjectId,
        ref: 'images',
        required: true
    },
    Image2ID: {
        type: Schema.Types.ObjectId,
        ref: 'images',
        required: true
    },
    Niveau: {
        type: String,
        enum: ['Facile', 'Moyen', 'Difficile'],
        required: true
    },
});

Jeu2PairsSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('jeu2pairs', Jeu2PairsSchema);
