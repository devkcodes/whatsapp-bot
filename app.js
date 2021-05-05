const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const wbm = require('wbm');
const router = express.Router();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars',exphbs({defaultLayout: 'index'}));
app.set('view engine','handlebars');

app.get('/',(req,res)=>res.render('layouts/index.handlebars'));


app.post('/', (req, res) => {
    console.log('im in')
    console.log(req.body)
    let { number,message } = req.body;
    let errors = [];
    const numbers = number.toString().split(/[\s,]+/);
  console.log('heyy');
  
   
    wbm.start({showBrowser: true, qrCodeData: true, session: false})
    .then(async qrCodeData => {
        console.log(qrCodeData); // show data used to generate QR Code
        await wbm.waitQRCode();
        await wbm.send(numbers, message);
        await wbm.end();
    } ).catch(err => { console.log(err); });

   res.render('layouts/index.handlebars');
    
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server Started on port ${PORT}`));
