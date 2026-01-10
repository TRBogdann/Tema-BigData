use('proiect');


let toDelete = db.movies.find({
  date: {
    $lt: new Date(new Date().getFullYear(), 0, 1)
  }
})
  .toArray()
  .map(m => m.name);

db.movies.deleteMany({
  name: { $in: toDelete }
});

db.tickets.deleteMany({
  movie: { $in: toDelete }
})

printjson(
  db.movies.find()
);

printjson(
  db.tickets.find()
)


let bronzeMovies = db.tickets.aggregate([
  {
    $lookup: {
      from: "prices",
      localField: "ticket_type",
      foreignField: "ticket_type",
      as: "price"
    }
  },
  { $unwind: "$price" },
  {
    $group: {
      _id: "$movie",
      revenue: { $sum: "$price.price" }
    }
  },
  {
    $addFields: {
      category: {
        $switch: {
          branches: [
            { case: { $lt: ["$revenue", 100] }, then: "bronze" },
            { case: { $lt: ["$totalRevenue", 200] }, then: "silver" },
          ],
          default: "gold"
        }
      }
    }
  },
  { $match: { category: "bronze" } },
  {
    $project: {
      _id: 0,
      movie: "$_id",
      totalRevenue: 1,
    }
  }
]).toArray().map(m => m.name);

db.movies.deleteMany({
  name: { $in: bronzeMovies }
})

printjson(
  db.movies.find()
);

load('./proiect/create.js')
load('./proiect/insert.js');
