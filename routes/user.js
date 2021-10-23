import expresss from 'express';
const router = expresss.Router();
import bcrypt from 'bcrypt';
import User from '../models/user';
import underscore from 'underscore';

const {isAuthenticated, isAdmin} = require('../middlewares/auth');

const saltRounds = 10;

router.post('/register',async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password
    };

    user.password = bcrypt.hashSync(req.body.password, saltRounds);

    try {
        const UserDB = await User.create(user);
        res.json(UserDB);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
});

router.put('/user/:id', [isAuthenticated,isAdmin] ,async (req, res) => {
    const _id = req.params.id;
    const user =  underscore.pick(req.body,['name','email','password','active']);

    if(user.password){
        user.password = bcrypt.hashSync(req.body.password, saltRounds);
    }

    try {
        const UserDB = await User.findByIdAndUpdate(_id, user, { new: true, runValidators: true });
        res.json(UserDB);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
});


module.exports = router;