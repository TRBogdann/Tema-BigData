
//Total generat de film + Nr bilete vandute
use('proiect');

printjson(
  db.tickets.aggregate(
    {
      $lookup: {
        from: "prices",
        localField: "ticket_type",
        foreignField: "ticket_type",
        as: "price"
      }
    },
    {
      $unwind: '$price'
    },
    {
      $group:
      {
        _id: '$movie',
        total: { $sum: '$price.price' },
        nOfTickets: { $sum: 1 }
      }
    },
    {
      $project:
      {
        _id: 0,
        total: 1,
        nOfTickets: 1,
        movie: '$_id'
      }
    }
  ));

printjson(
  db.tickets.aggregate([
    {
      $group: {
        _id: "$movie",
        totalTickets: { $sum: 1 }
      }
    },
    { $sort: { totalTickets: -1 } },

    {
      $setWindowFields: {
        sortBy: { totalTickets: -1 },
        output: {
          rank: { $rank: {} }
        }
      }
    }
  ])

)

printjson(
  db.tickets.aggregate(
    {
      $lookup: {
        from: "prices",
        localField: "ticket_type",
        foreignField: "ticket_type",
        as: "price"
      }
    },
    {
      $lookup: {
        from: "movies",
        localField: "movie",
        foreignField: "name",
        as: "movie"
      }
    },
    {
      $unwind: "$price"
    },
    {
      $unwind: "$movie"
    },
    {
      $unwind: "$movie.genre"
    },
    {
      $group:
      {
        _id: "$movie.genre",
        ticket_count: { $sum: 1 },
        revenue: { $sum: '$price.price' }
      }
    },
    {
      $project:
      {
        _id: 0,
        genre: '$_id',
        ticket_count: 1,
        revenue: 1
      }
    },
    {
      $sort: {
        revenue: -1,
        ticket_count: -1
      }
    }
  )
);

printjson(
  db.tickets.aggregate(
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer"
      }
    },
    {
      $unwind: "$customer"
    },
    {
      $group:
      {
        _id: '$customer',
        ticket_count: { $sum: 1 }
      }
    },
    {
      $addFields:
      {
        fullname: { $concat: ['$_id.first_name', ' ', '$_id.last_name'] }
      }
    },
    {
      $project:
      {
        _id: 0,
        fullname: 1,
        ticket_count: 1
      }
    },
    {
      $sort: {
        ticket_count: -1
      }
    },
    {
      $limit: 1
    }
  )
)

printjson(
  db.tickets.aggregate([
    {
      $lookup: {
        from: "movies",
        localField: "movie",
        foreignField: "name",
        as: "movie"
      }
    },
    { $unwind: "$movie" },
    {
      $addFields: {
        end_time: {
          $add: [
            "$date",
            { $multiply: ["$movie.length_minutes", 60 * 1000] }
          ]
        }
      }
    },
    {
      $project: {
        _id: 0,
        customer: 1,
        movie: "$movie.name",
        start_time: "$date",
        end_time: 1
      }
    }
  ])

)
