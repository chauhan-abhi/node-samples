const mongoose = require('mongoose');

mongoose.connect(('mongodb://localhost/playground'), { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: authorSchema  // embedding
  author: {
    type: authorSchema,
    required = true  // make required
  }
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId)
  // course.author.name = 'Abhi'
  // course.save()
  /////////OR/////////////
  const course = await Course.update({ _id: courseId }, {
    $set: {
      'author.name': 'Hemu'
    },
    // if we wish to unset the author property use 'unset'
    // $unset: {
    //   'author': ''
    // }
  })
}

// In this embedding technique an author can only be saved
// in the context of their parent
//createCourse('Node Course', new Author({ name: 'Mosh' }));
updateAuthor('5c320a723927b24937208577');

