const profileService = require('../service/profileService')
const profileController = {
    profile: async (req, res) => {
        return profileService.profile(req,res);
    }
}
module.exports = profileController;
