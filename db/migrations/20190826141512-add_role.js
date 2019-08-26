'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
            'Users',
            'role',
            {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }
      );
  },

    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'Users',
            'role',
        );
    }
};
