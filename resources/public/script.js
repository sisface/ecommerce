// Global array of image file names.
var images = ['skyscraper1.png', 'skyscraper2.png', 'vertical1.png'];

var shopping_cart = {};

// This code will be called whenever the document is finished loading, I guess.
$(document).ready(function() {
    var image_name = images[Math.floor(Math.random() * images.length)];
    $('#random_ad').html('<a href="./virus.html"><img src="img/' + image_name +'" /></a>');
});

function renderItem(item, category) {
    var html = "";
    item.forEach(function (e) {
        html += '<div class="item">';
        html += "<b>Product Name:</b> " + e.title + "<br /><br />";
        html += '<div class="zoomin"><img src="img/' + e.image + '" width="200" height="200" /></div><br /><br />';
        html += "<i>" + e.tag + "</i><br /><br />";
        html += "<b>Description:</b> " + e.description + "<br /><br />";
        html += "<b>Size: </b>" + e.size + "<br /><br />";
        html += "<b>Weight: </b>" + e.weight + "<br /><br />";
        html += "<b>Cost:</b> $" + e.cost + "<br /><br />";
        html += '<button class="add_cart" id="' + e._id + '|' + category +
            '"><span>Add to Cart <span></button><br /><br />';
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
        html += '<div id="intro">';
        html += '<h1>Who is macroexpand?</h1>';
        html += '<br />';
        html += '<p>macroexpand is a jack-of-all trades company which enthusiastically incubates front-end e-commerce. Our exploratory research points to regenerated third-generation matrix approaches.  This year marks the 20th anniversary celebrations of our regenerated strategic matrix approaches.  At base level, this just comes down to authoritatively visualizing backend methodologies.  As such, we have harnessed 24/7 web-readiness in order to quickly foster cross-unit web services.  macroexpand proactively drives frictionless supply chains by re-engineering client-based e-tailers by globally utilizing best-of-breed networks to quickly seize dynamic strategic theme areas and thus phosfluorescently underwhelm functionalized customer service. Contact us to learn more about how to monotonectally transform e-business ideas to competently implement enterprise-wide results.</p>';
        html += '<br />';
        html += "</div>";
    $("#content").html(html);
});

// Shopping cart.
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
    html += '<h1>Shopping Cart</h1><br /><br />';
    html += '<h2>Saved Items</h2><br /><br />';
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

        html += '<b>Item:</b> ' + title + '<br />';
        html += '<b>Category:</b> ' + category + '<br />';
        html += '<b>Quantity</b>: ' + count + '<br />';
        html += '<br /><br />';
    }

    html += '<br /><br />';
    html += '<p><b>Returning Customer?  Log in or register now.</b></p>';
    html += '<button class="button" style="vertical-align:middle"><span>Register </span></button>';
    html += '<br /><br />';
    html += '<p><b>Login</b></p>';
    html += '<br />';
    html += '<form>';
    html += 'Account name:<br />';
    html += '<input type="text" name="accountname"><br />';
    html += 'Password:<br />';
    html += '<input type="password" name="password"><br />';
    html += '<button class="button" style="vertical-align:middle"><span>Login </span></button>';
    html += '</form>';
    html += '<br /><br />';
    html += '<p><b><Check out as guest</b></p>';
    html += '<br /><br />';
    html += '<h2>Payment information</h2><br />';
    html += '<form>';
    html += '<table><tr><td>First Name:</td><td><input type="text" id="firstName" placeholder="Bric" required /> (first name)</td></tr>';
    html += '<tr><td>Last Name:</td><td><input type="text" id="lastName" placeholder="Mahr" required /> (last name)</td></tr>';
    html += '<tr><td>Street Address:</td><td><input type="text" id="streetaddress" placeholder="4400 University Drive" required /> (street address)</td></tr>';
    html += '<tr><td>City:</td><td><input type="text" id="city" placeholder="Fairfax" required /> (city)</td></tr>';
    html += '<tr><td>State:</td><td><input type="text" id="state" placeholder="Virginia" required /> (state)</td></tr>';
    html += '<tr><td>Zip Code:</td><td><input type="text" id="zipcode" placeholder="22030" required /> (zip code)</td></tr>';
    html += '<tr><td>Telephone Number:</td><td><input type="tel" id="telephonenumber" placeholder="(XXX) XXX-XXXX" required /> (telephone number)</td></tr>';
    html += '<tr><td>Email Address:</td><td><input type="email" id="emailaddress" placeholder="name@domain.com" required /> (email address)</td></tr>';
    html += '<tr><td>Credit Card Number:</td><td><input type="text" id="creditcardnum" placeholder="XXXXXXXXXXXXXXXX" required /> (credit card number)</td></tr>';
    html += '<tr><td>Credit Card CSV:</td><td><input type="text" id="creditcardcsv" placeholder="XXX" required /> (security code)</td></tr>';
    html += '<tr><td>Credit Card Expiration Date:</td><td><input type="text" id="creditcarddate" placeholder="XX/XX" required /> (month/year)</td></tr>';
    html += '</td></tr>';
    html += '</table><br />';
    html += '<p><b>Comments:</b><br /><br /><textarea name="comments" rows="4" cols="36">Enter additional comments here.</textarea></p>';
    html += '</form>';
    html += '<br /><br />';
    html += '<button class="button" style="vertical-align:middle" id="submit"><span>Checkout <span></button>';
    html += '&nbsp;&nbsp;&nbsp;';
    html += '</div>';
    $('#content').html(html);
});


$(document).on('click', '#submit', function () {
    var html = '';
    html += '<div id="intro">';
    html += '<h1>Thank you for your patronage.</h1>',
    html += '<br />';
    html += '<p>Your credit card information is being processed.  Please allow 6 to 8 weeks for delivery</p>';
    html += '<br />';
    html += "</div>";
    $("#content").html(html);
});
