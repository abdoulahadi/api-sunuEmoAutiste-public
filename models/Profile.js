const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required:true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    defaultCharacter: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

ProfileSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
