/**
 * Created by Jimmia Rowland on 5/14/17.
 */
module.exports = function(sequelize, DataTypes) {
	var Friend = sequelize.define("Friend",{
		name:{
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return Friend;
};