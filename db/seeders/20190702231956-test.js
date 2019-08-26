'use strict';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  up: (queryInterface, Sequelize) => {

    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');

    var faker = require('faker');
    var moment = require('moment');
    var crypto = require('crypto');
    var salt_sha = 'ASDHjuhs7899sadhqSDHhkoashdjsklahDJSKLDHNKLJnkNd2jn2doJKDSPSJDPISAjdipj2ipjdijID';

    var dataUsers = [];
    var dataPasswords = [];

    // генерим тестовых пользователей, под которыми можем авторизоваться
    for ( var i = 1; i < 6; i++ ) {
      var tmp = {
        email: 'test'+i+'@mail.ru',
        userName: 'test'+i,
        firstName: 'test'+i,
        lastName: '',
        verified: randomInt(0, 1),
        bdate: moment().unix(),
        sex: randomInt(0, 1),
        createdAt: formatted,
        updatedAt: formatted,
        role: 0,
      };
      if ( i === 1) {
        tmp.role = 2;
      }
      dataUsers.push(tmp);

      var tmp2 = {
        userId: i,
        password: crypto.createHash('sha256').update('password' + salt_sha).digest('hex'),
        isActive: 1,
        createdAt: formatted,
        updatedAt: formatted,
      };
      dataPasswords.push(tmp2);
    }

    for ( var i = 0; i < 10; i++ ) {
      var tmp = {
        email: faker.internet.email(),
        userName: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        verified: randomInt(0, 1),
        bdate: moment().unix(),
        sex: randomInt(0, 1),
        createdAt: formatted,
        updatedAt: formatted,
        role: 0,
      };
      dataUsers.push(tmp);
    }

    return Promise.all([
        queryInterface.bulkInsert('Users', dataUsers, {}),
        queryInterface.bulkInsert('Passwords', dataPasswords, {}),
    ]);

  },

  down: (queryInterface, Sequelize) => {}
};
