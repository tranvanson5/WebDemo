const User = require('../model/user');
const Role = require('../model/role'); // Import the Role model
const { jwtService } = require('./jwtService');

const profileService = {
    profile: async (req, res) => {
        try {
            const username = jwtService.getUsernameFromToken(req);

            // Find user by username
            const user = await User.findOne({
                where: { username },
                include: { model: Role, as: 'roles' } // Include the associated roles
            });

            if (!user) {
                return res.status(401).json({ message: 'Invalid username' });
            }

            if (user.status !== 'ACTIVE') {
                return res.status(401).json({ message: 'Account is not active' });
            }

            // Extracting necessary information from roles
            const userRoles = user.roles.map(role => ({
                id: role.id,
                name: role.name
            }));

            const userRes = {
                name: user.name,
                dob: user.dob,
                gender: user.gender,
                address: user.address,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                roles: userRoles
            };

            // Return user profile
            res.status(200).json(userRes);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

module.exports = profileService;
