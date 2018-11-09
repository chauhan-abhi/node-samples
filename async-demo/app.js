// console.log('Before')
// console.log('After')
// Promise is an object which holds the eventual result of an async operation 
// 3 states - pending, fulfilled, rejected


getCustomer(1, (customer) => {
    console.log('Customer: ', customer);
    if (customer.isGold) {
      getTopMovies((movies) => {
        console.log('Top movies: ', movies);
        sendEmail(customer.email, movies, () => {
          console.log('Email sent...')
        });
      });
    }
  });
  
  function getCustomer(id, callback) {
    setTimeout(() => {
      callback({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  }
  
  function getTopMovies(callback) {
    setTimeout(() => {
      callback(['movie1', 'movie2']);
    }, 4000);
  }
  
  function sendEmail(email, movies, callback) {
    setTimeout(() => {
      callback();
    }, 4000);
  }