const User = require('./user')
const Hub = require('./hub')
const Node = require('./node')

//One - Many : User - Hub
User.Hub = User.hasMany(Hub)
Hub.User = Hub.belongsTo(User)

//One - Many : Hub - Node
Hub.Node = Hub.hasMany(Node, {foreignKey: 'hubId'})
Node.Hub = Node.belongsTo(Hub)

//One - Many : User - Node
User.Node = User.hasMany(Node)
Node.User = Node.belongsTo(User)

module.exports = {
  User,
  Hub,
  Node
}
