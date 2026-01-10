use('proiect');

db.customers.drop();
db.prices.drop();
db.tickets.drop();
db.movies.drop();

db.createCollection("customers");
db.createCollection("prices");
db.createCollection("tickets");
db.createCollection("movies");
