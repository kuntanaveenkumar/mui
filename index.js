/*var http = require('http');
http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end('Hello World! Node.js is working correctly.\n');
   
   fs.readFile(__dirname + "", function(error, data) {  
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/html'  
                    });  
                    response.write(data);  
                    response.end();  
                }  
            });  
            
}).listen(3000);
console.log('Server running at http://10.50.8.67:3000/');

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

  // Serve any static files
  app.use(express.static(path.join(__dirname, 'dist')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
  });

app.listen(port, () => console.log('Listening on port ${port}'));*/

const express = require('express');
const path = require('path');
const app  = express();
const http = require('http');

//Middleware
app.use(express.static(__dirname + '/' ));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(3000, function(){
    console.log('Server running on port 3000');
});