const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmotionSchema = new Schema({
    EmotionName: {
        type: String,
        required: true
    }
});

EmotionSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = mongoose.model('emotions', EmotionSchema);
