import expresss from 'express';
const router = expresss.Router();
import bcrypt from 'bcrypt';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

router.post('/login',async (req, res) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email: email.toLowerCase() });
        if(!userDB){
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                message: 'Password incorrect'
            });
        }

        const token = jwt.sign({
                data: userDB
            },
            process.env.SECRET_KEY,{expiresIn: 60*60*24*30},
        );

        res.json({
            user: userDB,
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error',
            error
        });
    }
});

module.exports = router;