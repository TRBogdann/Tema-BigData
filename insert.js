use('proiect');

db.customers.insertMany([
  {
    _id: 'c1',
    first_name: 'john',
    last_name: 'smith',
    phone: '0711111111',
    email: 'john.smith@gmail.com'
  },
  {
    _id: 'c2',
    first_name: 'anna',
    last_name: 'brown',
    phone: '0722222222',
    email: 'anna.brown@gmail.com'
  },
  {
    _id: 'c3',
    first_name: 'mike',
    last_name: 'johnson',
    phone: '0733333333',
    email: 'mike.johnson@gmail.com'
  },
  {
    _id: 'c4',
    first_name: 'lisa',
    last_name: 'wilson',
    phone: '0744444444',
    email: 'lisa.wilson@gmail.com'
  },
  {
    _id: 'c5',
    first_name: 'alex',
    last_name: 'taylor',
    phone: '0755555555',
    email: 'alex.taylor@gmail.com'
  },
  {
    _id: 'c6',
    first_name: 'emma',
    last_name: 'anderson',
    phone: '0766666666',
    email: 'emma.anderson@gmail.com'
  },
  {
    _id: 'c7',
    first_name: 'daniel',
    last_name: 'thomas',
    phone: '0777777777',
    email: 'daniel.thomas@gmail.com'
  },
  {
    _id: 'c8',
    first_name: 'sophia',
    last_name: 'martin',
    phone: '0788888888',
    email: 'sophia.martin@gmail.com'
  },
  {
    _id: 'c9',
    first_name: 'chris',
    last_name: 'lee',
    phone: '0799999999',
    email: 'chris.lee@gmail.com'
  },
  {
    _id: 'c10',
    first_name: 'olivia',
    last_name: 'clark',
    phone: '0700000000',
    email: 'olivia.clark@gmail.com'
  },
  {
    _id: 'c11',
    first_name: 'andrew',
    last_name: 'lewis',
    phone: '0712345678',
    email: 'andrew.lewis@gmail.com'
  },
  {
    _id: 'c12',
    first_name: 'mia',
    last_name: 'walker',
    phone: '0723456789',
    email: 'mia.walker@gmail.com'
  },
  {
    _id: 'c13',
    first_name: 'james',
    last_name: 'hall',
    phone: '0734567890',
    email: 'james.hall@gmail.com'
  },
  {
    _id: 'c14',
    first_name: 'isabella',
    last_name: 'young',
    phone: '0745678901',
    email: 'isabella.young@gmail.com'
  },
  {
    _id: 'c15',
    first_name: 'robert',
    last_name: 'king',
    phone: '0756789012',
    email: 'robert.king@gmail.com'
  },
  {
    _id: 'c16',
    first_name: 'amelia',
    last_name: 'wright',
    phone: '0767890123',
    email: 'amelia.wright@gmail.com'
  },
  {
    _id: 'c17',
    first_name: 'david',
    last_name: 'lopez',
    phone: '0778901234',
    email: 'david.lopez@gmail.com'
  },
  {
    _id: 'c18',
    first_name: 'charlotte',
    last_name: 'hill',
    phone: '0789012345',
    email: 'charlotte.hill@gmail.com'
  },
  {
    _id: 'c19',
    first_name: 'kevin',
    last_name: 'scott',
    phone: '0790123456',
    email: 'kevin.scott@gmail.com'
  },
  {
    _id: 'c20',
    first_name: 'eva',
    last_name: 'green',
    phone: '0701234567',
    email: 'eva.green@gmail.com'
  }
]);

db.movies.insertMany([
  {
    name: 'Anaconda',
    length_minutes: 100,
    minimum_age: 12,
    genre: ['Action', 'Adventure', 'Comedy', 'Thriller', 'Horror'],
    date: new Date("2026-01-30")
  },
  {
    name: 'Avatar:Fire and Ash',
    length_minutes: 197,
    minimum_age: 12,
    genre: ['Action', 'Adventure', 'Fantasy', 'Thriller'],
    date: new Date("2025-12-19")
  },
  {
    name: 'Bloody Chrismas',
    length_minutes: 97,
    minimum_age: 18,
    genre: ['Horror'],
    date: new Date('2025-12-12')
  },
  {
    name: 'Cravata Galbena',
    length_minutes: 145,
    minimum_age: 0,
    genre: ['Drama', 'Adventure', 'Musical'],
    date: new Date('2025-11-14')
  },
  {
    name: 'Colors of Time',
    length_minutes: 124,
    minimum_age: 12,
    genre: ['Drama', 'Crime', 'Thriller', 'Comedy'],
    date: new Date('2025-12-19')
  },
  {
    name: 'Five nights at Freddy`s 2',
    length_minutes: 104,
    minimum_age: 15,
    genre: ['Horror', 'Mistery', 'Thriller'],
    date: new Date('2025-12-05')
  },
  {
    name: 'The Housemaid',
    length_minutes: 132,
    minimum_age: 15,
    genre: ['Thriller'],
    date: new Date('2026-01-02')
  },
  {
    name: 'I didn`t have a choice',
    length_minutes: 139,
    minimum_age: 15,
    genre: ['Horror', 'Comedy', 'Crime', 'Thriller'],
    date: new Date('2026-01-02')
  },
  {
    name: 'Spongebob',
    length_minutes: 96,
    minimum_age: 0,
    genre: ['Animation', 'Adventure', 'Familly', 'Comedy', 'Fantasy'],
    date: new Date('2026-12-26')
  },
  {
    name: 'Zootopia 2',
    length_minutes: 107,
    minimum_age: 0,
    genre: ['Animation', 'Adventure', 'Familly'],
    date: new Date('2025-11-28')
  }
]);

db.prices.insertMany([
  {
    ticket_type: 'familly',
    price: 30
  },
  {
    ticket_type: 'student',
    price: 25
  },
  {
    ticket_type: 'senior',
    price: 20
  },
  {
    ticket_type: 'adult',
    price: 45
  },
  {
    ticket_type: 'child',
    price: 20
  }
]);

db.tickets.insertMany([
  {
    customer: 'c1',
    movie: 'Anaconda',
    ticket_type: 'adult',
    date: new ISODate('2026-01-20T18:30:00Z'),
    row: 5,
    seat: 8,
    room: 2,
    cinema: { name: 'cinema1', city: 'Bucharest' }
  },
  {
    customer: 'c2',
    movie: 'Zootopia 2',
    ticket_type: 'child',
    date: new ISODate('2025-11-29T12:00:00Z'),
    row: 3,
    seat: 6,
    room: 1,
    cinema: { name: 'cinema2', city: 'Cluj' }
  },
  {
    customer: 'c2',
    movie: 'Spongebob',
    ticket_type: 'familly',
    date: new ISODate('2026-12-27T10:30:00Z'),
    row: 4,
    seat: 7,
    room: 1,
    cinema: { name: 'cinema2', city: 'Cluj' }
  },
  {
    customer: 'c3',
    movie: 'The Housemaid',
    ticket_type: 'adult',
    date: new ISODate('2026-01-05T20:00:00Z'),
    row: 6,
    seat: 11,
    room: 3,
    cinema: { name: 'cinema3', city: 'Timisoara' }
  },
  {
    customer: 'c3',
    movie: 'Colors of Time',
    ticket_type: 'student',
    date: new ISODate('2025-12-20T17:45:00Z'),
    row: 2,
    seat: 4,
    room: 2,
    cinema: { name: 'cinema3', city: 'Timisoara' }
  },
  {
    customer: 'c4',
    movie: 'Cravata Galbena',
    ticket_type: 'senior',
    date: new ISODate('2025-11-16T16:00:00Z'),
    row: 1,
    seat: 2,
    room: 1,
    cinema: { name: 'cinema1', city: 'Bucharest' }
  },
  {
    customer: 'c4',
    movie: 'Colors of Time',
    ticket_type: 'adult',
    date: new ISODate('2025-12-21T19:00:00Z'),
    row: 7,
    seat: 9,
    room: 2,
    cinema: { name: 'cinema1', city: 'Bucharest' }
  },
  {
    customer: 'c5',
    movie: 'Avatar:Fire and Ash',
    ticket_type: 'adult',
    date: new ISODate('2026-01-10T21:00:00Z'),
    row: 8,
    seat: 15,
    room: 4,
    cinema: { name: 'cinema4', city: 'Iasi' }
  },
  {
    customer: 'c5',
    movie: 'Anaconda',
    ticket_type: 'adult',
    date: new ISODate('2026-02-01T18:00:00Z'),
    row: 6,
    seat: 10,
    room: 2,
    cinema: { name: 'cinema4', city: 'Iasi' }
  },
  {
    customer: 'c6',
    movie: 'Spongebob',
    ticket_type: 'familly',
    date: new ISODate('2026-12-26T11:00:00Z'),
    row: 2,
    seat: 5,
    room: 1,
    cinema: { name: 'cinema2', city: 'Cluj' }
  },
  {
    customer: 'c6',
    movie: 'Zootopia 2',
    ticket_type: 'familly',
    date: new ISODate('2025-11-28T14:00:00Z'),
    row: 3,
    seat: 8,
    room: 1,
    cinema: { name: 'cinema2', city: 'Cluj' }
  },
  {
    customer: 'c7',
    movie: 'Five nights at Freddy`s 2',
    ticket_type: 'student',
    date: new ISODate('2025-12-06T22:00:00Z'),
    row: 9,
    seat: 18,
    room: 5,
    cinema: { name: 'cinema5', city: 'Brasov' }
  },
  {
    customer: 'c7',
    movie: 'I didn`t have a choice',
    ticket_type: 'student',
    date: new ISODate('2026-01-03T21:30:00Z'),
    row: 8,
    seat: 14,
    room: 4,
    cinema: { name: 'cinema5', city: 'Brasov' }
  },
  {
    customer: 'c8',
    movie: 'Spongebob',
    ticket_type: 'child',
    date: new ISODate('2026-12-26T11:00:00Z'),
    row: 3,
    seat: 4,
    room: 1,
    cinema: { name: 'cinema2', city: 'Cluj' }
  },
  {
    customer: 'c9',
    movie: 'Spongebob',
    ticket_type: 'familly',
    date: new ISODate('2026-12-26T11:00:00Z'),
    row: 3,
    seat: 5,
    room: 1,
    cinema: { name: 'cinema2', city: 'Cluj' }
  },
  {
    customer: 'c10',
    movie: 'Spongebob',
    ticket_type: 'familly',
    date: new ISODate('2026-12-26T11:00:00Z'),
    row: 3,
    seat: 6,
    room: 1,
    cinema: { name: 'cinema2', city: 'Cluj' }
  },
  {
    customer: 'c11',
    movie: 'Anaconda',
    ticket_type: 'adult',
    date: new ISODate('2026-01-20T18:30:00Z'),
    row: 5,
    seat: 9,
    room: 2,
    cinema: { name: 'cinema1', city: 'Bucharest' }
  },
  {
    customer: 'c12',
    movie: 'Anaconda',
    ticket_type: 'student',
    date: new ISODate('2026-01-20T18:30:00Z'),
    row: 5,
    seat: 10,
    room: 2,
    cinema: { name: 'cinema1', city: 'Bucharest' }
  },
  {
    customer: 'c13',
    movie: 'Avatar:Fire and Ash',
    ticket_type: 'adult',
    date: new ISODate('2026-01-10T21:00:00Z'),
    row: 8,
    seat: 16,
    room: 4,
    cinema: { name: 'cinema4', city: 'Iasi' }
  },
  {
    customer: 'c14',
    movie: 'Avatar:Fire and Ash',
    ticket_type: 'student',
    date: new ISODate('2026-01-10T21:00:00Z'),
    row: 8,
    seat: 17,
    room: 4,
    cinema: { name: 'cinema4', city: 'Iasi' }
  },
  {
    customer: 'c15',
    movie: 'Colors of Time',
    ticket_type: 'adult',
    date: new ISODate('2025-12-19T19:00:00Z'),
    row: 7,
    seat: 10,
    room: 2,
    cinema: { name: 'cinema1', city: 'Bucharest' }
  },
  {
    customer: 'c16',
    movie: 'Colors of Time',
    ticket_type: 'senior',
    date: new ISODate('2025-12-19T19:00:00Z'),
    row: 7,
    seat: 11,
    room: 2,
    cinema: { name: 'cinema1', city: 'Bucharest' }
  },
  {
    customer: 'c17',
    movie: 'Five nights at Freddy`s 2',
    ticket_type: 'student',
    date: new ISODate('2025-12-06T22:00:00Z'),
    row: 9,
    seat: 19,
    room: 5,
    cinema: { name: 'cinema5', city: 'Brasov' }
  },
  {
    customer: 'c18',
    movie: 'Five nights at Freddy`s 2',
    ticket_type: 'adult',
    date: new ISODate('2025-12-06T22:00:00Z'),
    row: 9,
    seat: 20,
    room: 5,
    cinema: { name: 'cinema5', city: 'Brasov' }
  },
  {
    customer: 'c19',
    movie: 'I didn`t have a choice',
    ticket_type: 'adult',
    date: new ISODate('2026-01-03T21:30:00Z'),
    row: 8,
    seat: 15,
    room: 4,
    cinema: { name: 'cinema5', city: 'Brasov' }
  },
  {
    customer: 'c20',
    movie: 'I didn`t have a choice',
    ticket_type: 'child',
    date: new ISODate('2026-01-03T21:30:00Z'),
    row: 8,
    seat: 16,
    room: 4,
    cinema: { name: 'cinema5', city: 'Brasov' }
  }
]);


