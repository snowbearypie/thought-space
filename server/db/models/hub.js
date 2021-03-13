const Sequelize = require('sequelize')
const db = require('../db')

const Hub = db.define('hub', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Idea Hub'
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  hubTag: {
    type: Sequelize.STRING,
    defaultValue: ``
  },
  voteCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isPrivate: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

module.exports = Hub
