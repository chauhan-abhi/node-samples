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
    .find({author: 'Abhi', isPublished: true})
    console.log(courses)    
}
//createCourse()

getCourses()

