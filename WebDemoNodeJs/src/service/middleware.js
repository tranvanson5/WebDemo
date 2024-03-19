const { jwtService } = require("./jwtService");
const User = require("../model/user");
const Role = require("../model/role");

const middleware = async (req, res, next, roles) => {
    try {
        const username = jwtService.getUsernameFromToken(req);
        const user = await User.findOne({
            where: { username: username },
            include: { model: Role, as: 'roles' }
        });

        if (!user) {
            return res.status(403).json({ error: 'User not found' });
        }

        const userRoles = user.roles.map(role => role.name); // Extract role names

        const hasRequiredRole = roles.some(role => userRoles.includes(role));
        if (!hasRequiredRole) {
            return res.status(403).json({ error: 'User does not have required role' });
        }

        // If the user has the required role, proceed to the next middleware
        next();
    } catch (error) {
        // Pass the error to the error handling middleware
        next(error);
    }
};

module.exports = middleware;
