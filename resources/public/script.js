// Global array of image file names.
var images = ['skyscraper1.png', 'skyscraper2.png', 'vertical1.png'];

var shopping_cart = {};

// This code will be called whenever the document is finished loading, I guess.
$(document).ready(function() {
    var image_name = images[Math.floor(Math.random() * images.length)];
    $('#random_ad').html('<a href="./virus.html"><img src="img/' + image_name +'" /></a>');
});

// Product Listing Page.
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
            '"><span>Add to Cart </span></button><br /><br />';
        html += "</div>";
    });
    return html;
}

// Search Button.
$("#search_button").click(function () {
    var selected_value = $("#category").val();
    $.getJSON( "/" + selected_value, function(data) {
        $("#content").html(renderItem(data, selected_value));
    });
});

// About Page.
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

// Testimonials Page.
$("#test").click(function () {
    var html = '';
        html += '<div id="intro">';
        html += '<h1>Customer Testimonials</h1>';
        html += '<br />';
        html += '<p>"As a professional angler, I simply cannot trust anything but <i>Fisherman&#39;s Allure</i> products.  The quality just can&#39;t be beat.  Of course, I had to go into debt to buy the newest fly model <i>The Airplane</i> but it was well worth the bankrupsy and divorce.  No regrets!"<p><br />';
        html += '<p>-<i>Chadwick BroChillius, Esq., Florida</i></p>';
        html += '<br />';
        html += '<<p>"It was a cold, rainy morning in the midwinter of 1942.  That&#39;s when I saw him for the first time.  Big Bubba, King of Elk Lake, Michigan.  He swam up to the surface and gave me a little wink before diving back down into the depths.  I was just a young lad back then, knee-high to a mudskipper and full of big dreams.  I knew Bubba was taunting me with those soulless, beady little eyes.  That&#39;s when I decided to dedicate my life to catching him.  I tried everything from the worms in grandpappy&#39;s pumpkin patch to those cheap plugs ol&#39; Bill Jenkins used to sell at his shop.  Ten for a penny, they was.  We fought hundreds of battles, the two of us.  That&#39;s how I lost both my arms and legs.  Bit &#39;em right off, Bubba did.  No matter what baits I tried, I couldn&#39;t catch Bubba.  That is, not until I bought <i>The Wagner</i> from <i>Fisherman&#39;s Allure</i>.  The first time I used it, I felt a bite and, when I reeled it in, there he was.  Bubba.  Turns out Bubba was actually a Bertha, and now I&#39;m inclined to think that wink was her attempt to flirt with me.  Bertha&#39;s mounted over my fireplace to this day.  Sometimes, when I sit in my rocking chair on a cold midwinter&#39;s night, and the light hits her eyes just right, I could swear she&#39;s still winking...."<p><br />';
        html += '<p>-<i>Old Man Willy, Michigan</i></p>';
        html += '<br />';
        html += '<p>"Once I was a man wearing nothing but rags and a loincloth made outta mud, forced to use an empty hook attached to a sewing string attached to a stick to catch my lunch.  Then I won the lottery and, thanks to <i>Fisherman&#39;s Allure</i>, now I&#39;m a master angler!"<p><br />';
        html += '<p>-<i>Bronk Moo, Virginia</i></p>';
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

// Shopping Cart Page.
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
    html += '<tr><td>Credit Card Expiration Date:</td><td>';
    html += '<select id="gMonth1">';
    html += '<option value="">--Select Month--</option>';
    html += '<option selected value="1">January</option>';
    html += '<option value="2">February</option>';
    html += '<option value="3">March</option>';
    html += '<option value="4">April</option>';
    html += '<option value="5">May</option>';
    html += '<option value="6">June</option>';
    html += '<option value="7">July</option>';
    html += '<option value="8">August</option>';
    html += '<option value="9">September</option>';
    html += '<option value="10">October</option>';
    html += '<option value="11">November</option>';
    html += '<option value="12">December</option>';
    html += '</select>';
    html += '<input type="text" id="creditcardyear" placeholder="XX" required /> (expiration month/year)';
    html += '</td></tr>';     
    html += '</table><br />';
    html += '<p><b>Comments:</b><br /><br /><textarea name="comments" rows="4" cols="36">Enter additional comments here.</textarea></p>';
    html += '</form>';
    html += '<br /><br />';
    html += '<button class="button" style="vertical-align:middle" id="submit"><span>Checkout </span></button>';
    html += '&nbsp;&nbsp;&nbsp;';
    html += '</div>';
    $('#content').html(html);
});

// Submit Page.
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
