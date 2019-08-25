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
  }
};
