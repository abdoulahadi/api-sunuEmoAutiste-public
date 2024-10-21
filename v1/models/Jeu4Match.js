const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Jeu4MatchSchema = new Schema({
    GameID: {
        type: Schema.Types.ObjectId,
        ref: 'games',
        required: true
    },
    MainImageID: {
        type: Schema.Types.ObjectId,
        ref: 'images',
        required: true
    },
    Option1ImageID: {
        type: Schema.Types.ObjectId,
        ref: 'images',
        required: true
    },
    Option2ImageID: {
        type: Schema.Types.ObjectId,
        ref: 'images',
        required: true
    },
    Niveau: {
        type: String,
        enum: ['Facile', 'Moyen', 'Difficile'],
        required: true
    },
    CorrectOptionPosition: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    }
});

Jeu4MatchSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('jeu4match', Jeu4MatchSchema);
