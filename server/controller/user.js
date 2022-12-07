const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models').User;
const Invoice = require('../models').Invoice;
const main = async (req, res) => {
    try {
        let token = req.headers['authorization'];
        console.log(token, req.headers['authorization'])
        let decodedUser = jwt.verify(token, "mysecret");
        console.log({decodedUser})

        const dueNotClearedInvoices = await Invoice.findAll({
            where: {
                UserId: decodedUser.id,
                dueCleared: false
            }
        });
        const dueDates = dueNotClearedInvoices.map((invoice)=> invoice.dueDate);
        console.log({dueDates})
        for(let i=0;i<dueDates.length;i++){
            if(dueDates[i].getTime()< (new Date()).getTime()){
                const user = await User.find({id: decodedUser.id})
                user.update({ freezed: true });
                console.log({user})
                break;
            }
        }

        return decodedUser;
    }
    catch (err) {
        console.log({err})
        res.status(401).json({ "msg": "Couldnt Authenticate" });
    }
};

module.exports = {
    main,
    async getUser(req, res) {
        try {
            authUser = await main(req, res)
            if (authUser) {
                let user = await User.findOne({ where: { id: authUser.id }, attributes: { exclude: ["password"] } });
                res.status(201).send(user);
            }

        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async getAllUsers(req, res) {
        try {
            authUser = await main(req, res);
            res.status(201).send(authUser);
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async update(req, res) {
        try {
            authUser = await main(req, res);
            if (authUser) {
                const user = User.findOne({ where: { id: authUser.id }, attributes: { exclude: ["password"] } })
                const { name, email, freezed } = req.body;
                const updatedUser = await user.update({
                    name,
                    email,
                    freezed
                });
                res.status(201).send(updatedUser)
            }
            else {
                res.status(404).send("User Not Found");
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async signup(req, res) {
        try {const salt = await bcrypt.genSalt(10);
        var usr = {
            name: req.body.name,
            email: req.body.email,
            freezed: false,
            password: await bcrypt.hash(req.body.password, salt)
        };
        created_user = await User.create(usr);
        res.status(201).json(created_user);}
        catch(err){
            res.status(400).json({err});
        }
    },

    async login(req, res) {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            const password_valid = await bcrypt.compare(req.body.password, user.password);
            if (password_valid) {
                token = jwt.sign({ "id": user.id, "email": user.email, "name": user.name }, "mysecret");
                res.status(200).json({ token: token });
            } else {
                res.status(400).json({ error: "Password Incorrect" });
            }

        } else {
            res.status(404).json({ error: "User does not exist" });
        }
    }
}