const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    timestamps: false, // Thêm createdAt và updatedAt
    tableName:'role'
});

sequelize.sync().then(async () => {
    console.log('Bảng Role đã được tạo hoặc đã tồn tại.');

    // Use findOrCreate to create roles only if they do not exist
    await Role.findOrCreate({ where: { id: 'ROLE_ADMIN' }, defaults: { name: 'ROLE_ADMIN' } });
    await Role.findOrCreate({ where: { id: 'ROLE_PM' }, defaults: { name: 'ROLE_PM' } });
    await Role.findOrCreate({ where: { id: 'ROLE_USER' }, defaults: { name: 'ROLE_USER' } });
});

module.exports = Role;
