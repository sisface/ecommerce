// usage: mongo admin create-users.js
var a = {
    user: "admin",
    pwd: "admin",
    roles: ["userAdminAnyDatabase"]};
db.createUser(a);
var u = {
    user: "ircop",
    pwd: "ircop",
    roles: [{role: "readWrite", db: "ecommerce"},
            {role: "readWrite", db: "production"},
            {role: "readWrite", db: "staging"},
            {role: "readWrite", db: "temp"},
            {role: "readWrite", db: "legacy"}]};
db.createUser(u);
