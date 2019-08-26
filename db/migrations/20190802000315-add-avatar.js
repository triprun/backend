'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'avatar',
      Sequelize.STRING
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
        'Users',
        'avatar',
    );
  }
};
