const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))

    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        isPublished: Boolean
    })

/**
 * args - 2
 * collection name,
 * schema
 */
const Course = mongoose.model('course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Node Course',
        author: 'Abhi',
        tags: ['node', 'aysnc'],
        isPublished: true   
    })
    const result = await course.save()
    console.log(result) 
}

async function getCourses() {
    const courses = await Course
    .find()
    //.find({author: 'Abhi', isPublished: true})
    //.find({price: {$gte: 10, $lte: 20}})
    //.find({price: { $in: [10,15,20]}})
    //.or([ { author: 'Abhi'}, { isPublished: true}])  --> courses whose author is Abhi or is 
    //published is true 
    // Start with Abhi
    //.find({autor: /^Abhi/})
    // Ends with Singh and i for case insesitive
    //.find({ author: /Singh$/i})
    // Contains Abhi
    //.find({ author: /.*Abhi.*/})
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1})
    console.log(courses)    
}
//createCourse()

getCourses()

