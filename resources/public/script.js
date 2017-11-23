// Global array of image file names.
var images = ['skyscraper1.png', 'skyscraper2.png', 'vertical1.png'];

// This code will be called whenever the document is finished loading, I guess.
$(document).ready(function() {
    var image_name = images[Math.floor(Math.random() * images.length)];
    $('#random_ad').html('<img src="img/' + image_name +'" />');
});

function renderItem(item) {
    var html = "";
    item.forEach(function (e) {
        html += '<div class="item">';
        html += "Product Name: " + e.title + "<br />";
        html += '<img src="img/' + e.image + '" width="200" height="200" /><br />';
        html += "Tag: " + e.tag + "<br />";
        html += "Description: " + e.description + "<br />";
        html += "Size: " + e.size + "<br />";
        html += "Weight: " + e.weight + "<br />";
        html += "Cost: $" + e.cost + "<br />";
        html += "</div>";
    });
    return html;
}

// Temporarily a immediately-executed function.  Change this later to be called
// by an event handler.
(function () {
    $.getJSON( "/accessory", function(data) {
        $("#content").html(renderItem(data));
    });
})();


$("#search_button").click(function () {
    var selected_value = $("#category").val();
    $.getJSON( "/" + selected_value, function(data) {
        $("#content").html(renderItem(data));
    });
});
