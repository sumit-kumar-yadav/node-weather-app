const express = require('express');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: false}));

// Accessing the static files like css, js 
app.use(express.static('./assets'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Root router
app.get('/', function(req, res){
    return res.render('index');
});

app.post('/get-weather', (req, res) => {
    const address = req.body.area;

    if (!address) {
        return res.send('Please provide an address')
    } else {
        geocode(address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send(error)
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send(error)
                }
    
                return res.render('forecast', {
                    location,
                    forecastData
                });

            })
        })
    }

})



app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});

