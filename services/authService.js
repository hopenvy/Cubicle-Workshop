const User = require('../models/User');
const { SALT_ROUNDS, SECRET } = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async ({ username, password }) => {
    try {
        let salt = await bcrypt.genSalt(SALT_ROUNDS);
        let hash = await bcrypt.hash(password, salt);

        const user = new User({ username, password: hash });

        return await user.save();
    } catch (error) {

    }

};
const login = async ({ username, password }) => {
    let user = await User.findOne({ username });
    if (!user) {
        throw { message: 'User not found' };
    }
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw { message: 'Password does not match' };
    }
    
    let token = jwt.sign({ _id: user._id }, SECRET);

    return token;
};

module.exports = {
    register,
    login,
};