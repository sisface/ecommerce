// Global array of image file names.
var images = ['skyscraper1.png', 'skyscraper2.png', 'vertical1.png'];

var shopping_cart = {};

// This code will be called whenever the document is finished loading, I guess.
$(document).ready(function() {
    var image_name = images[Math.floor(Math.random() * images.length)];
    $('#random_ad').html('<img src="img/' + image_name +'" />');
});

function renderItem(item, category) {
    var html = "";
    item.forEach(function (e) {
        html += '<div class="item">';
        html += "<b>Product Name:</b> " + e.title + "<br /><br />";
        html += '<img src="img/' + e.image + '" width="200" height="200" /><br /><br />';
        html += "<i>" + e.tag + "</i><br /><br />";
        html += "<b>Description:</b> " + e.description + "<br /><br />";
        html += "<b>Size: </b>" + e.size + "<br /><br />";
        html += "<b>Weight: </b>" + e.weight + "<br /><br />";
        html += "<b>Cost:</b> $" + e.cost + "<br /><br />";
        html += '<button class="add_cart" id="' + e._id + '|' + category +
            '">Add to Cart</button><br />';
        html += "</div>";
    });
    return html;
}

$("#search_button").click(function () {
    var selected_value = $("#category").val();
    $.getJSON( "/" + selected_value, function(data) {
        $("#content").html(renderItem(data, selected_value));
    });
});

function cartHandler () {
    var id_full = this.id;
    var category = id_full.split('|')[1];
    var id = id_full.split('|')[0];
    if (id in shopping_cart) {
        shopping_cart[id] = {
            'count': shopping_cart[id].count + 1,
            'category': category
        };
    } else {
        shopping_cart[id] = {
            'count': 1,
            'category': category
        };
    }
    alert("Added to cart!");
}

$(document).on('click', '.add_cart', cartHandler);

$("#cart").click(function () {
    var html = '';

    html += '<div class="item">';
    html += 'Checkout your shopping cart items.<br /><br />';
    for (k in shopping_cart) {
        var id = k,
            count = shopping_cart[id].count,
            category = shopping_cart[id].category,
            title = '';

        $.ajax({
            url: '/' + category + '/' + id,
            dataType: 'json',
            async: false,
            data: null,
            success: function(data) {
                title = data.title;
            }
        });

        html += 'item: ' + title + '<br />';
        html += 'category: ' + category + '<br />';
        html += 'count: ' + count + '<br />';
        html += '<br />';
    }
    html += '</div>';
    $('#content').html(html);
});
