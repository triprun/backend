'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'bio',
      Sequelize.STRING
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
        'Users',
        'bio',
    );
  }
};
