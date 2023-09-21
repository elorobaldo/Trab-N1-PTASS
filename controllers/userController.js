const User = require('../models/User');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const { name, password, email } = req.body;
    await User.create({
       name: name,
       password: password,
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
    try {
        await User.update(
            {
    name: name,
       password: password,
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
    const {name, email, password} = req.body;
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
                name: name,
                email: email,
                password: password
            }
        })
        const token = jwt.sign({
            name:name,
            email: email
        },
            secret.secret, {
            expiresIn: 86400,
        })
        return res.json({
            name: isUserAuthenticated.name,
            email: isUserAuthenticated.email,
            token: token
        });
    } catch (error) {
        return res.json("Usuario não encontrado!");
    }
}



module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser };
