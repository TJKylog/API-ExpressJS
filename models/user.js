import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values: ['user', 'admin'],
    message: '{VALUE} is not a valid role'
}

const userSchema = new Schema({
    name: {type: String, required: [true, 'Name is required']},
    email: {
        type: String, 
        required: [true, 'Email is required'],
        unique: true
    },
    password: {type: String, required: [true, 'Password is required']},
    created_at: {type: Date, default: Date.now},
    role: {type: String, default: 'user', enum: roles},
    active: {type: Boolean, default: true}
});

userSchema.plugin(uniqueValidator, {message: '{PATH} must be unique'});
userSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('User', userSchema);

export default User;