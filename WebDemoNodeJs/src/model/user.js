// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const Role = require('./role');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => `user-${uuidv4()}`,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('MALE','FEMALE','OTHER'),
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    }
    ,
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'BLOCK'), // Adjust enum values as needed
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'created_at', // Đặt tên cho cột thời gian tạo
    updatedAt: false,
    tableName:"user"
});

// Xác định mối quan hệ Many-to-Many giữa User và Role
User.belongsToMany(Role, { through: 'user_role', foreignKey: 'userId',as: 'roles' , timestamps:false});
Role.belongsToMany(User, { through: 'user_role', foreignKey: 'roleId', timestamps:false });

// Tạo bảng nếu chúng không tồn tại
sequelize.sync().then(() => {
    console.log('Bảng đã được tạo hoặc đã tồn tại.');
});

module.exports = User;
