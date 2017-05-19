/**
 * Created by Jimmia Rowland.
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