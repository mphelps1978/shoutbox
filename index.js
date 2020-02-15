require(`dotenv`).config()
const express = require('express');
const cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors())
// app.use(logger())

const posts = require('./routes/api/posts')

app.use('/api/posts', posts)

const port = process.env.PORT || 5000


// function logger(req, res, next) {
//     console.log(`[$] request made ${req.body}`);
//     next()    
// }

 app.listen(port, () => console.log(`Server running on port ${port}.`));