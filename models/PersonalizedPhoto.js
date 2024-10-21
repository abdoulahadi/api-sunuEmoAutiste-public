const mongoose = require('mongoose');

const personalizedPhotoSchema = new mongoose.Schema({
    ProfileID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profiles', 
        required: true
    },
    ImageID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'images', 
        required: true
    },
    EmotionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'emotions', 
        required: true
    }
}, { timestamps: true });

personalizedPhotoSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('personalizedphotos', personalizedPhotoSchema);
