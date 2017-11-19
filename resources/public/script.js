// Global array of image file names.
var images = ['skyscraper1.png', 'skyscraper2.png', 'vertical1.png'];

// This code will be called whenever the document is finished loading, I guess.
$(document).ready(function() {
    var image_name = images[Math.floor(Math.random() * images.length)];
    $('#random_ad').html('<img src="img/' + image_name +'" />');
});
