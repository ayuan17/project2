module.exports = function(sequelize, DataTypes) {
   var User = sequelize.define("User", {
       username: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               len: [6, 20]
           },
           unique: true
       },
       email: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               len: [6, 20]
           }
       },
       password: {
           type: DataTypes.STRING,
           allownull: false
       }
   });
   return User;
};