const Sequelize = require('sequelize')
const db = require('../db')

const Node = db.define('node', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  nodeTag: {
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

module.exports = Node
