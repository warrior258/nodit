const User = require('../models/User')

const login = async (req, res) => {
    
    const { email, password } = req.body;

    if(email === '' || password === ''){
        return res.status(400).send('All fields are required!');
    }

    try {
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).send('User doesnt exists!');
        }

        const checkPass = await user.comparePass(password);
        if(!checkPass){
            return res.status(400).send('Password Dont Match');
        }

        const token = user.createJWT();

        res.status(200).json({userID: user._id, user: user.name, email: user.email, token: token});

    } catch (error) {
        
    }
};

const register = async (req, res) => {
    
    const { name, email, password } = req.body;
    if(name === '' || email === '' || password === ''){
        return res.status(400).send('All fields are required!');
    }

    try {
        
        //Checking if user already exists or not
        const user = await User.findOne({email: email}).lean();
        if(user){
            return res.status(200).send('User already exists!')
        }

        //Creating the user
        const create = await User.create(req.body);
        const token = await create.createJWT();
        res.status(200).json({message: 'User created!'});

    } catch (error) {
        res.status(400).json(error);
    }
};

const getUser = async (req, res) => {

    const { id } = req.params;

    try {
        const user = await User.findById({_id: id}).select("-password");
        if(!user){
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(400).json(error);   
    }
};


module.exports = { login, register, getUser };