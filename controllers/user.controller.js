const User= require('../lib/models/user.model');

const createUser = async (req, res) => {
    await User.create({
        email:'kenneth@mail.com',
        password:'password'
    });

    res.render('user',{message:'User created successfully', user:null})
};

const getUser = async (req, res) => {
    const user = await User.findOne({email:'kenneth@mail.com'});
    res.render('user',{
        message:'User found successfully',
        user:user
    });
}

const deleteUser = async (req, res) => {
    const user = await User.findOneAndDelete({email:'kenneth@mail.com'});
    res.render('user',{
        message:'User deleted successfully',
        user:user
    });
}

module.exports = {
    createUser,
    getUser,
    deleteUser
};

