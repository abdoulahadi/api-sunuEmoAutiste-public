const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    ImagePath: {
        type: String,
        required: true
    },
    EmotionID: {
        type: Schema.Types.ObjectId,
        ref: 'emotions',
        required: true
    },
    Niveau: {
        type: String,
        enum: ['1', '2', '3'],
        required: true
    },
});

ImageSchema.method("toJSON", function () {
    const { __v, _id, EmotionID, ...object } = this.toObject();
    object.id = _id;
    if (EmotionID && typeof EmotionID === 'object') {
        object.EmotionID = EmotionID._id;
        object.EmotionName = EmotionID.EmotionName;
    }
    return object;
});

module.exports = mongoose.model('images', ImageSchema);
