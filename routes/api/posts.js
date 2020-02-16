const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


// Get
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection()
    res.send(await posts.find({}).toArray())
})

// Add

router.post('/', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send('Created new Shout')
})

// Delete

router.delete('/:id', async(req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send('Deleted')
})


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        `mongodb+srv://${process.env.DBUSER}:${process.env.DBPW}@cluster0-i5hnc.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useUnifiedTopology: true
    })

    return client.db('mphelps-shoutbox').collection('posts')
}

module.exports = router;