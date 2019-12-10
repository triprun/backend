'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Users',
        'about',
        Sequelize.STRING
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Users',
        'about',
    );
  }
};
