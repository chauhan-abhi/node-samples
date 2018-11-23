const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exerises', { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => console.error('Could not connect to MongoDB...', err))

const courseSchema = new mongoose.Schema({
        name: { 
            type: String,
            required : true,
            minlength: 5,
            maxlength: 255,
            //match: /pattern/
            },
        category: {
            type: String,
            required : true,
            enum: ['web', 'mobile', 'network'],
            lowercase: true,
            trim: true
        },    
        author: String,
        tags: {
            type: Array, //initialise this to empty array
            validate: {
                isAsync: true,
                validator: function(v, callback) {
                    setTimeout(() => {
                        // Do some async work
                        const result =  v && v.length > 0
                        callback(result)
                    }, 4000)
                },
                message: 'A course should have atleast one tag.'
            }
        },
        price: {
            type: Number,
            min: 10,
            max: 200,
            required: function() { return this.isPublished },
            get: v => Math.round(v),    //by default called when read from db
            set: v => Math.round(v)     //by default when wrinting to db
        },
        date: { type: Date, default: Date.now },
        isPublished: Boolean
})

/**
 * args - 2
 * collection name,
 * schema
 */
const Course = mongoose.model('courses', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Express js Course',
        author: 'Mosh',
        category: 'Web',
        tags: ['frontend'], //['express', 'backend'],
        isPublished: true   ,
        price : 14.6
    })
    try {
        // course.validate((err) => {
        //     if(err) {

        //     }
        //})  returns a promise of void
        const result = await course.save()
        console.log(result) 
    }
    catch(e) {
        for(field in e.errors){
            console.log(e.errors[field].message)
        }
    }
}

async function getCourses() {
    const courses = await Course
    .find({ _id: '5bf843d6ba436a46ca1a640b'})
    //.find({author: 'Abhi', isPublished: true})
    //.find({price: {$gte: 10, $lte: 20}})
    //.find({price: { $in: [10,15,20]}})
    //.or([ { author: 'Abhi'}, { isPublished: true}])  --> courses whose author is Abhi or is 
    //published is true 
    // Start with Abhi
    //.find({autor: /^Abhi/})
    // Ends with Singh and i for case insensitive
    //.find({ author: /Singh$/i})
    // Contains Abhi
    //.find({ author: /.*Abhi.*/})
    .limit(10)
    .sort({name: 1})
    //.count()
    .select({name: 1, tags: 1, price:1}) 
    console.log(courses[0].price )    
}

async function updateCourse(id) {
    // Approach: Query first
    // findById()
    // Modify its props
    // save()
    // const course = await Course.findById(id)
    // debugger
    // if(!course) {
    //     return
    // } 
    // course.isPublished = true
    // course.author = 'Another Author'
    // const result = await course.save()
    // console.log(result)

    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // })
    
  

    //Approach: Update first
    //Update directly
    // Optionally: get the updated document

    const result = await Course.findOneAndUpdate(id, {
        $set: {
            author: 'ABhi',
            isPublished: false
        }
    }, { new: true})
    console.log(result)
}

async function removeCourse(id) {
    const result = await Course.deleteMany({ _id: id})
    //const course = await Course.findOneAndDelete(id)
    console.log(course)
}
//createCourse()

getCourses()

//updateCourse('5a68fdc3615eda645bc6bdec')
//removeCourse('5a68fdd7bee8ea64649c2777')

