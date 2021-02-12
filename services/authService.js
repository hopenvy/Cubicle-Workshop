const User = require('../models/User');
const { SALT_ROUNDS} = require('../config/config');
const bcrypt = require('bcrypt');

const register = async ({username, password}) => {
    try {
        let salt = await bcrypt.genSalt(SALT_ROUNDS);
        let hash = await bcrypt.hash(password, salt);

        const user = new User({username, password: hash});

        return await user.save();
    } catch (error) {

    }


};
module.exports = {
    register
};