//deployment url: https://a3new.onrender.com/


const http = require('http');
const fs = require('fs');
const path = require('path');

const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])

// requires mongodb to run
const {MongoClient} = require('mongodb');
require('dotenv').config()
//get uri from env
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
// collection variable based on mongodb setup
let a3Collection;



// function to connect to db
async function connectDB(){
    try{
        await client.connect();
        a3Collection = client.db("sam").collection("A3");
        console.log("Connected to db");
    } catch(e){
        console.error("failed to create a connection", e);
        process.exit(1)
    }
}


const server = http.createServer( (req, res) => {
    // will open the main html page that has all my content
    if(req.url ==='/'){
        res.writeHead(200, {'Content-Type': 'text/html'})

        fs.readFile( path.join(__dirname, 'public', 'index.html'), 
            (err, content) => {
                if(err) throw err
                res.end(content);
            }
        );
    }
    //loads in images using fileSystem readFile
    else if(req.url ==='/icon.jpeg'){
        res.writeHead(200, {'Content-Type': 'image/jpeg'})
        
        fs.readFile( path.join(__dirname, 'public', 'icon.jpeg'), 
            (err, content) => {
                if(err) throw err
                res.end(content);
            }
        );
    }
    else if(req.url ==='/github.png'){
        res.writeHead(200, {'Content-Type': 'image/png'})
        
        fs.readFile( path.join(__dirname, 'public', 'github.png'), 
            (err, content) => {
                if(err) throw err
                res.end(content);
            }
        );
    }
    else if(req.url ==='/mbr-1087x815.jpg'){
        res.writeHead(200, {'Content-Type': 'image/jpg'})
        
        fs.readFile( path.join(__dirname, 'public', 'mbr-1087x815.jpg'), 
            (err, content) => {
                if(err) throw err
                res.end(content);
            }
        );
    }
    else if(req.url ==='/mbr-1471x981.jpg'){
        res.writeHead(200, {'Content-Type': 'image/jpg'})
        
        fs.readFile( path.join(__dirname, 'public', 'mbr-1471x981.jpg'), 
            (err, content) => {
                if(err) throw err
                res.end(content);
            }
        );
    }
    else if(req.url ==='/money.png'){
        res.writeHead(200, {'Content-Type': 'image/png'})
        fs.readFile( path.join(__dirname, 'public', 'money.png'), 
            (err, content) => {
                if(err) throw err
                res.end(content);
            }
        );
    }
    else if(req.url ==='/gmail.png'){
        res.writeHead(200, {'Content-Type': 'image/png'})
        
        fs.readFile( path.join(__dirname, 'public', 'gmail.png'), 
            (err, content) => {
                if(err) throw err
                res.end(content);
            }
        );
    }
     else if(req.url ==='/linkedIn.png'){
        res.writeHead(200, {'Content-Type': 'image/png'})
        
        fs.readFile( path.join(__dirname, 'public', 'linkedIn.png'), 
            (err, content) => {
                if(err) throw err
                res.end(content);
            }
        );
    }
    // will open the api url page that has the data -- now using mongodb instead of a dbfile
   else if(req.url ==='/api'){
        a3Collection.find({}).toArray()
        .then(results=>{
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        })
        .catch(err=> {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({error: "Failed to fetch services data"}));
        })

        
    }
    // incase a user tries to access a page that does not exist opens 404 not found page
    else{
         res.writeHead(200, {'Content-Type': 'text/html'})
         fs.readFile( path.join(__dirname, 'public', '404.html'),
            (err, content) => {
                if(err) throw err
                res.end(content);
            }
        );
    }

});

const PORT = process.env.PORT || 4900;

connectDB().then(()=>{
    server.listen(PORT, ()=> console.log(`Server running on the port ${PORT}`))
});