'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Users',
      'sex',
      {
        type: Sequelize.INTEGER,
        defaultValue: -1
      }
    );
  },
    down: function(queryInterface, Sequelize) {
        return queryInterface.removeColumn(
            'Users',
            'sex',
        );
    }
};
