const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Jeu3IntrusSchema = new Schema({
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
    Image3ID: {
        type: Schema.Types.ObjectId,
        ref: 'images',
        required: true
    },
    Niveau: {
        type: String,
        enum: ['Facile', 'Moyen', 'Difficile'],
        required: true
    },
    CorrectIntrusPosition: {
        type: Number,
        enum: [1, 2, 3],
        required: true
    }
});

Jeu3IntrusSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('jeu3intrus', Jeu3IntrusSchema);
