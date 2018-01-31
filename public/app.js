var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var populateBeerList = function(beers){
  var select = document.querySelector('#beer-list');
  beers.forEach(function(beer, index){
    var beerList = document.createElement('option');
    beerList.text = beer.name;
    beerList.value = index;
    select.appendChild(beerList);
  });
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);
  populateBeerList(beers);
  selectedBeer(beers);
}

var selectedBeer = function(beers) {
  var viewBeerDropDown = document.getElementById('beer-list');
  var viewBeerDetails = document.getElementById('beer-info')
  viewBeerDropDown.addEventListener('change', function(){
    viewBeerDetails.innerText = "Name: " + beers[viewBeerDropDown.value].name + "\n" + "\n" +
    "Tagline: " + beers[viewBeerDropDown.value].tagline + "\n" + "\n" +
    "Description: " + beers[viewBeerDropDown.value].description + "\n" + "\n" +
    "Serving Suggestion: " + beers[viewBeerDropDown.value].brewers_tips + "\n" + "\n" +
    "Ingredients: " + beers[viewBeerDropDown.value].ingredients.malt[0].name + ', ' + beers[viewBeerDropDown.value].ingredients.malt[1].name + ', ' + beers[viewBeerDropDown.value].ingredients.malt[2].name;
  })
}

var app = function(){
  console.log('sup!')
  var url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
}

document.addEventListener('DOMContentLoaded', app);
