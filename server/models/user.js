
module.exports = (sequelize,DataTypes) => {
    let User = sequelize.define('User',{
        name : DataTypes.STRING,
        email : DataTypes.STRING,
        freezed : DataTypes.BOOLEAN,
        password: DataTypes.STRING
    });

    User.associate = function(models) {
        User.hasMany(models.Invoice);
    };
    return User;
}