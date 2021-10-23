import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import  mongoose  from 'mongoose';
const dotenv = require('dotenv');
dotenv.config();

const app = express();

main().catch(err => console.log(err));

async function main() {
    
    const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    await mongoose.connect(uri).then(() => console.log('MongoDB Connected'));
}

//middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended:true}));
///app.use(express.static(path.join(__dirname, 'public')));

//routes
/* app.get('/',function(req,res){
    res.send('xD');
}); */
app.use('/api',require("./routes/note"));
app.use('/api',require("./routes/user"));
app.use('/api',require("./routes/login"));


const history = require('connect-history-api-fallback')
app.use(history());

app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.APP_PORT || 8080)

app.listen(app.get('port'), function(){
    console.log("Listen port: "+app.get('port'))
});