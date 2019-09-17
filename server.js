const express = require('express');
const path = require('path');
const app = express();
console.log(__dirname);

// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/movie-frontend'));

// Start the app by listening on the default Heroku port
app.get('/*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'
  res.sendFile(path.join(__dirname + '/dist/movie-frontend/index.html'));
});
app.listen(process.env.PORT || 8080);

console.log('Console listening!');
