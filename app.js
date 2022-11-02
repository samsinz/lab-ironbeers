const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  let beersArray = await punkAPI.getBeers();
  res.render('beers', { title: 'All beers', beersArray: beersArray });
});

app.get('/random-beer', async (req, res) => {
  let randomBeer = await punkAPI.getRandom();
  res.render('random-beer', { title: 'Random beer', randomBeer: randomBeer });
});

app.get('/beers/beer-:id', async (req, res) => {
  let singleBeer = await punkAPI.getBeer(req.params.id);
  res.render('single-beer', { title: 'Beer', singleBeer: singleBeer });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
