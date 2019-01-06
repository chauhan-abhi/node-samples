const mongoose = require('mongoose');

mongoose.connect(('mongodb://localhost/playground'), { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author' // reference an Author collections.
    // when we load course object and populate the author property
    // mongoose will automatically know that it should query the 
    // 'Author' collection in MongoDb 
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    // here second argument is the properties
    // of author we want to include or exclude(-)
    .populate('author', 'name -_id')     // target property
    // we can populate multiple documents
    .select('name author'); // name and ObjectId
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

//createCourse('Android Course', '5c31fe41853c492707dae72f')

listCourses();