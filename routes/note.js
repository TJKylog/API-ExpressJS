import  express  from "express";
const router = express.Router();

const {isAuthenticated, isAdmin} = require('../middlewares/auth');

import Note from "../models/note";

router.post('/note',isAuthenticated, async(req,res) => {
    const body = req.body;
    body.user_id = req.user._id;

    try {
        const NoteDB = await Note.create(body);
        res.status(200).json(NoteDB);
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error',
            error
        });
    }
})

router.get('/note/:id',isAuthenticated, async(req,res) => {
    const _id = req.params.id;
    try {
        const NoteDB = await Note.findOne({_id, user_id: req.user._id});
        res.status(200).json(NoteDB);
    }
    catch (error){
        return res.status(500).json({
            message: 'Error',
            error
        });
    }
});

router.get('/notes',isAuthenticated, async(req,res) => {
    try {
        const NoteDB = await Note.find({user_id: req.user._id});
        res.status(200).json(NoteDB);
    }
    catch (error){
        return res.status(500).json({
            message: 'Error',
            error
        });
    }
});

router.delete('/note/:id',isAuthenticated, async(req,res) => {
    const _id = req.params.id;
    try {
        const NoteDB = await Note.findOneAndDelete({_id, user_id: req.user._id});
        if(!NoteDB) {
            return res.status(400).json({
                message: 'Error',
                error
            });
        }
        else{
            res.status(200).json({
                message: 'Note deleted',
            });
        }
        
    }
    catch (error){
        return res.status(500).json({
            message: 'Error',
            error
        });
    }
});

router.put('/note/:id',isAuthenticated, async(req,res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
        const NoteDB = await Note.findOneAndUpdate({_id, user_id: req.user._id}, body, {new: true});
        res.status(200).json(NoteDB);
    }
    catch (error){
        return res.status(500).json({
            message: 'Error',
            error
        })
    }
});

module.exports = router;