require("dotenv").config();

const app = require('express')();
var http = require('http').Server(app);
var engines = require('consolidate');

// app.set('views', __dirname + '/views');
// app.engine('html', engines.mustache);
app.set('view engine', 'ejs');
app.get("/", (req,res)=> {
    res.render("product")
});


const paymentRoute = require('./routes/paymentRoute');

app.use('/',paymentRoute);
//app.use(express.static(path.join(__dirname, './views')));

http.listen(3000, function(){
    console.log('Server is running on http://localhost:3000/');
});
