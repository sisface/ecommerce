// Global array of image file names.
var images = ['skyscraper1.png', 'skyscraper2.png', 'vertical1.png'];

// This code will be called whenever the document is finished loading, I guess.
$(document).ready(function() {
    var image_name = images[Math.floor(Math.random() * images.length)];
    $('#random_ad').html('<img src="img/' + image_name +'" />');
});

// Temporarily a immediately-executed function.  Change this later to be called
// by an event handler.
(function () {
    $.getJSON( "/accessory", function(data) {
        var items = [],
            html = "";

        html = 'test';

        $("#content").html(items.join(html));
    });
})();
