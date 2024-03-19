const Role = require("../model/role");
const User = require("../model/user");
const bcrypt = require('bcrypt');
const {jwtService} = require('./jwtService');

const authService = {
    signup: async (req, res) => {
        try {
            // Check if ROLE_USER exists
            const role = await Role.findOne({ where: { name: 'ROLE_USER' } });
            if (!role) {
                return res.status(500).json({ message: 'Role user does not exist' });
            }

            // Check if email already exists
            const existingEmail = await User.findOne({ where: { email: req.body.email } });
            if (existingEmail) {
                return res.status(409).json({ message: 'Email already exists' });
            }

            // Check if username already exists
            const existingUsername = await User.findOne({ where: { username: req.body.username } });
            if (existingUsername) {
                return res.status(409).json({ message: 'Username already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Create new user
            const newUser = await User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                status: 'ACTIVE',
            });

            // Add ROLE_USER to the new user
            await newUser.addRole(role);

            return res.status(201).json({ message: 'Signup success !!!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    signin: async (req, res) => {
        try {
            // Find user by username
            const user = await User.findOne({
                where: { username: req.body.username }, // Corrected the access to req.body.username
                include: { model: Role, as: 'roles' } // Include the associated roles
            });
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Check if user account is active
            if (user.status !== 'ACTIVE') {
                return res.status(401).json({ message: 'Account is not active' });
            }

            // Verify password
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Generate JWT token
            const payload = {
                username: user.username,
            };
            const token = jwtService.generateToken(payload);

            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

};

module.exports = authService;
