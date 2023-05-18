require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//cors
const cors = require('cors');
app.use(cors());

//connect db
const connectDB = require('./config/connect');

app.use(express.json());

//middleware
const verifyToken = require('./middleware/Authentication');

//routes
const Post = require('./routes/Post');
const Community = require('./routes/Community');
const Auth = require('./routes/Auth');
const Comments = require('./routes/Comments');
const Like = require('./routes/Like');
const generateText = require('./routes/generateText');

app.use('/api/v1/posts', Post);
app.use('/api/v1/communities', Community);
app.use('/api/v1/auth', Auth);
app.use('/api/v1/comments', Comments);
app.use('/api/v1/likes', Like);
app.use('/api/v1/generateText', generateText);


app.get('/', (req, res) => {
    res.send("<div style='display: grid; place-items: center; height: 80vh;'><h1>Nodite</h1></div>")
});


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        console.log('Connected to DB!');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);   
    }
}

start();
