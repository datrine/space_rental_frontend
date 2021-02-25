
let knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'eel.whogohost.com',
      user : 'stylezns_datrine',
      password : 'TeMi4ToPe',
      database : 'stylezns_roomsdb'
    }
  });

export default knex;