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
  // author: {
  //   type: authorSchema,
  //   required = true  // make required
  // }


  // create course with array of authors
  authors: [authorSchema]

}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId)
  course.authors.push(author)
  course.save()
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()

}

// In this embedding technique an author can only be saved
// in the context of their parent
createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'Abhi'})
]);
updateAuthor('5c320a723927b24937208577');

addAuthor('5c3216f2f4126d4ec13ae9d2', new Author({name: 'Amy'}))
removeAuthor('5c3216f2f4126d4ec13ae9d2','5c321774fe71894f10368e6c')
