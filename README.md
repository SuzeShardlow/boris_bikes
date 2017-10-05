# Boris Bikes

![Try it here!](https://suzeshardlow.github.io/Boris_Bikes/)

A map showing the locations of the ![Boris Bike](https://tfl.gov.uk/modes/cycling/santander-cycles) stations.  Data is pulled from the ![Transport for London (TfL) API](https://tfl.gov.uk/info-for/open-data-users/) and shown on a map using the ![Google Maps API](https://developers.google.com/maps/).

## Introduction

I produced this piece of work in one evening during week five of the 12-week web development bootcamp I attended.

The brief was to create a web page showing a Google Map, and then place a marker on the map at the location of each Boris Bike docking station.

I love real-time data so I enjoyed using the TfL API to populate the map.

## Build

This project was built using HTML, CSS and JavaScript (including jQuery), along with the TfL API, Google Maps API and styling from ![Snazzy Maps](https://snazzymaps.com/).

I needed very little in my HTML file as its main purposes were to define the sources for the CSS, JavaScript and Google Map.  It also defined the place where the map would be rendered on the page.

I then looked at the TfL API documentation.  The TfL API is very useful in that it has thousands of endpoints, however the documentation is quite difficult to follow as a beginner.

The locations of the docking stations are buried in objects within the API.  The good news is that the latitude and longitude values are provided for each one, which made it easy to plot them accurately on the map once you have successfully made an AJAX request for the data.

## Bonus functionality

As bonuses, I decided to:

* Substitute the default Google Maps marker with a custom one - a photo of Boris Johnson's head.
* Write some logic to have Boris' head showing in full colour if there is more than one bike at the docking station, or in black and white if there are 0 or 1 bikes at the docking station (thus saving the user a wasted journey).
* Change the styling of the map to make it look more modern.
* Add an info window which appears when each head is clicked, showing the name of each docking station, the number of available bikes and the number of spaces.

## Future developments

I had included some code to obtain the user's current location and then centre the map on that location, however I need to fix this.
