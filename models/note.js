import mongoose from "mongoose";
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: {type: String, require:[true,'Name is required']},
    description: {type:String},
    user_id: {type:String},
    date: {type: Date, default: Date.now},
    active: {type:Boolean, default:true}
    
});

const Note = mongoose.model('Note',NoteSchema);

export default Note;