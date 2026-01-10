use('proiect');


let category = db.tickets.aggregate(
  {
    $group: {
      _id: "$ticket_type",
      ticket_count: { $sum: 1 }
    }
  },
  {
    $sort: {
      ticket_count: -1
    }
  },
  {
    $limit: 1
  },
  {
    $project: {
      _id: 0,
      type: "$_id"
    }
  }
)
  .toArray()
  .map(c => c.type);

printjson(
  db.prices.find(
    {
      ticket_type: { $in: category }
    }
  ));

db.prices.updateMany(
  {
    ticket_type: { $in: category }
  },
  [
    {
      $set: {
        price: { $multiply: ["$price", 0.75] }
      }
    }
  ]
);

printjson(
  db.prices.find(
    {
      ticket_type: { $in: category }
    }
  ));
