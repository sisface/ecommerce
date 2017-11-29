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
        html += '<button class="add_cart" id="' + e.id + '|' + category +
            + '">Add to Cart</button><br />';
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

$("#about").click(function () {
    var html = '';
        html += '<div class="intro">';
        html += '<h1>Who is macroexpand?</h1>';
        html += '<p>macroexpand is a jack-of-all trades company which enthusiastically incubates front-end e-commerce. Our exploratory research points to regenerated third-generation matrix approaches.  Today marks the 20th anniversary celebrations of our regenerated strategic matrix approaches.  At base level, this just comes down to authoritatively visualizing backend methodologies.  As such, we have harnessed 24/7 web-readiness in order to quickly foster cross-unit web services.  macroexpand proactively drives frictionless supply chains by re-engineering client-based e-tailers by globally utilizing best-of-breed networks to quickly seize dynamic strategic theme areas and thus phosfluorescently underwhelm functionalized customer service. Contact us to learn more about how to monotonectally transform e-business ideas to competently implement enterprise-wide results.</p>';
        html += '<br />';
        html += "</div>";
    return html;
});

// Add to cart.
$(".add_cart").click(function () {
    var id_full = $(this).attr('id');
    var category = id_full.split('|')[1];
    var id = id_full.split('|')[0];
    if (id in shopping_cart) {
        shopping_cart[id] = {
            'count': shopping_cart[id] + 1,
            'category': category
        };
    } else {
        shopping_cart[id] = {
            'count': 1,
            'category': category
        };
    }
    alert("Added to cart!");
});

$("#cart").click(function () {
    var html = '';
    for (k in shopping_cart) {
        var id = k,
            count = shopping_cart[id].count,
            category = shopping_cart[id].category,
            item = {};

        $.getJSON('/' + category + '/' + id,
                  function (data) {
                      item = data;
                  });

        html += 'item:' + item.title + '<br />';
        html += 'count:' + count + '<br />';
        html += '<br />';
    }
    // Sweet Alert.
    swal({
        title: 'Purchase confirmation',
        text: 'Please confirm your information is correct and submit.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.value) {
        swal(
            'Purchase confirmed!',
            'Thank you for shopping at Fishermans Allure.',
            'success'
        )
        // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        } else if (result.dismiss === 'cancel') {
        swal(
            'Cancelled',
            'Purchase cancelled',
            'error'
        )
        }
    })

    $(".confirm_purchase").click(function () {
        swal("Purchase confirmation");
    });
});
