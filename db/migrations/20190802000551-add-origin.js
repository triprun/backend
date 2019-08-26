'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'origin',
      Sequelize.STRING
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
        'Users',
        'origin',
    );
  }
};
