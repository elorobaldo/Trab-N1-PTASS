const User = require('../models/User');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


const createUser = async (req, res) => {
    const { name, password, email } = req.body;
    const passwordCrypto = await bcrypt.hash(password, 10);
    await User.create({
       name: name,
       password: passwordCrypto,
       email: email

    }).then(() => {
        res.json('Cadastro de usuário realizado com sucesso');
        console.log('Cadastro de usuário realizado com sucesso');
    }).catch((erro) => {
        res.json('Cadastro já realizado');
        console.log(`Ops, deu erro: ${erro}`);
    })
}
const findUsers = async (req, res) => {
    const users = await User.findAll();
    try {
        res.json(users);
    } catch (error) {
        res.status(404).json("Ocorreu um erro na busca!");
    };
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await User.destroy({
            where: {
                 id:id
            }
        }).then(() => {
            res.json("Deletado");
        })
    } catch (error) {
        res.status(404).json("Deu erroo");
    }
}
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {     name, email, password      } = req.body;
    const passwordCrypto = await bcrypt.hash(password, 10);
    try {
        await User.update(
            {
       name: name,
       password: passwordCrypto,
       email: email
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.json("Deu certoo");
        })
    } catch (error) {
        res.status(404).json("Erro!");
    }
}
const authenticatedUser = async (req, res) => {
    const {name, password} = req.body;
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
                email: email
            }
        });
        if(!isUserAuthenticated){
            return res.status(401).json ("Não encontrado");
        }
        const isPasswordValidate = await bcrypt.compare(password, isUserAuthenticated.password);
        if(isPasswordValidate === false){
            return res.status(401).json ("Senha não correspondida");
        }
        const token = jwt.sign({
            email: email
        },
        process.env.SECRET,{
            expiresIn: 86400,
        });

        res.cookie('token', token, {httpOnly: true}).json({
            name: isUserAuthenticated.name,
            email: isUserAuthenticated.email,
            token:token
        });
        
    } catch (error) {
        return res.json("Usuario não encontrado!");
    }
}



module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser };

//npm i express 
//npm i nodemon
//npm i bcryptjs
//npm init
//npm start
//npm i express-jwt
//npm i cookie-parser
