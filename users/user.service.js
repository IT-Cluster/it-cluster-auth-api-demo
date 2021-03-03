const config = require('config.json');
const jwt = require('jsonwebtoken');
const hasher = require('_helpers/hasher');

// users hardcoded for simplicity, store in a db for production applications
const users = [{
    id: 1,
    username: 'test',
    password: '4988a5925332f2f5b81794fb486d6c2d4fa5caed9c18ef7035fc524a0bc2fbd615579c56cbee1a598419f92b1b3975eb0440d987bbe8bac9e755786e97e07706',
    firstName: 'Test',
    lastName: 'User'
}, {
    id: 2,
    username: 'test2',
    password: '26590e9537353253a6b4ca782ff00db43992b7817186a257f24d7581e832195142fea8f680ffb3ffbebf1e6454780ba2e2ad008afe96016f5a76b3ab8260240e',
    firstName: 'Test2',
    lastName: 'User2'
}];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => {
        const passwordHash = hasher(password, config.salt);
        return (u.username === username && u.password === passwordHash);
    });

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret);

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

async function getOne({ id }) {
    const user = users.find(u => {
        return (u.id === parseInt(id));
    });
    if (!user) throw 'User not found';
    return omitPassword(user);
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
