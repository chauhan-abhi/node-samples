const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-exerises', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    price: Number,
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('courses', courseSchema)

async function query() {
    return await Course
    .find({tags: 'backend', isPublished: true})
    .sort({name: 1})
    .select({name : 1, author : 1})
}
async function run() {
    const courses = await query()
    console.log(courses)
}

run()