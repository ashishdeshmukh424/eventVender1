import database from './../data/database';

const db = {
  initDb: async () => {
    database.sequelize.sync().then(async () => {
    });
  },
};

export default db;
