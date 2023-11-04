require("dotenv").config();

const app2 = require('express')();
var http = require('http').Server(app2);
var engines = require('consolidate');
const path = require("path")
// app.set('views', __dirname + '/views');
// app.engine('html', engines.mustache);
app2.set('view engine', 'ejs');
// app2.set("views", path.join(__dirname, "/views"));
app2.get("/", (req,res)=> {
    res.render("exitpayment")
});
const { performBackendOperation } = require('./controllers/afterpayment');

// Define an endpoint to trigger the backend operation
app2.get('/triggerBackendOperation', async (req, res) => {
  try {
    // Call the backend controller function
    await performBackendOperation();
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'An error occurred during the backend operation.' });
  }
});

const paymentRoute = require('./routes/paymentRoute');

app2.use('/',paymentRoute);
//app.use(express.static(path.join(__dirname, './views')));

http.listen(4000, function(){
    console.log('Server is running on http://localhost:4000/');
});
