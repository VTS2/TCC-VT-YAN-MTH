const User = require('../Model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserById = require('../helpers/get-user-by-token')

module.exports = class UserController {
    //criar usuario
    static async register(req, res) {
        const { name, email, password, phone, confirmpassword, CPF } = req.body 
        //validações
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }
        if (!CPF) {
            res.status(422).json({ message: 'O CPF é obrigatório' })
            return
        }
        // if (!imgIdent) {
        //     res.status(422).json({ message: 'A imagem de identificação é obrigatório' })
        //     return
        // }
        // if (!laudoCap) {
        //     res.status(422).json({ message: 'O laudo de capacitação é obrigatório' })
        //     return
        // }
        // if (!fichaCrime) {
        //     res.status(422).json({ message: 'A ficha criminal é obrigatório' })
        //     return
        // }
        if (!password) {
            res.status(422).json({ message: 'O password é obrigatório' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'O confirmpassword é obrigatório' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O phone é obrigatório' })
            return
        }

        //criar a senha
        //criar a criptografia
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //Checar se o usuario existe 
        const userExists = await User.findOne({ where: { email: email } })

        if (userExists) {
            res.status(422).json({ message: 'Email já cadastrado' })
            return
        }

        const user = new User({
            name: name,
            email: email,
            CPF: CPF,
            phone: phone,
            // imgIdent: imgIdent,
            // laudoCap: laudoCap,
            // fichaCrime: fichaCrime,
            password: passwordHash
        })

        try {
            //criando o usuario no banco
            const newUser = await user.save()
            //entregar o token para o novo user
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }

        if (!password) {
            res.status(422).json({ message: 'O password é obrigatório' })
            return
        }

        const user = await User.findOne({ where: { email: email } })

        if (!user) {
            res.status(422).json({ message: 'Email não encontrado' })
            return
        }

        //checar se o password é igual a senha do banco
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({ message: 'Senha incorreta' })
            return
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)

            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findByPk(decoded.id)

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id

        const user = await User.findByPk(id, {
            where: { id: id }
        })

        if (!user) {
            res.status(422).json({ message: 'Usuario não encontrado' })
            return
        }

        user.password = undefined

        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        const id = req.params.id

        //checar se o usuario exite
        const token = getToken(req)
        const user = await getUserById(token)

        //receber os dados nas variaves
        const { name, email, phone, password, confirmpassword, CPF } = req.body

        //recebendo imagem do usuario
        // let image = ''
        // if (req.file) {
        //     image = req.file.filename
        // }
        // let photo = ''
        // if (req.file) {
        //     photo = req.file.filename
        // }
        // let imgFicha = ''
        // if (req.file) {
        //     imgFicha = req.file.filename 
        // }

        //validações de campos vazios 
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatório' })
            return
        }
        if (!CPF) {
            res.status(422).json({ message: 'O CPF é obrigatório' })
            return
        }
        // if (!imgIdent) {
        //     res.status(422).json({ message: 'A imagem de identificação é obrigatório' })
        //     return
        // }
        // if (!laudoCap) {
        //     res.status(422).json({ message: 'O laudo de capacitação é obrigatório' })
        //     return
        // }
        // if (!fichaCrime) {
        //     res.status(422).json({ message: 'A ficha criminal é obrigatório' })
        //     return
        // }
        const userExists = await User.findOne({ where: { email: email } })
        if (user.email !== email && userExists) {
            res.status(422).json({ message: 'Por favor utilize outro email' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O phone é obrigatório' })
            return
        }
        user.phone = phone

        if (password !== confirmpassword) {
            res.status(422).json({ message: 'as senhas não batem' })
            return
        } else if (password === confirmpassword && password != null) {
            //criptografando senha
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }

        const userToUpdate = await User.findByPk(id)

        if (!userToUpdate) {
            res.status(422).json({ message: 'Usuario não encontrado' })
            return
        }

        userToUpdate.name = name
        userToUpdate.email = email
        userToUpdate.phone = phone
        // userToUpdate.image = image
        // userToUpdate.photo = photo
        // userToUpdate.fichaCrime = fichaCrime

        if (password === confirmpassword && password != null) {
            //criptografando senha
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            userToUpdate.password = passwordHash
        }

        try {
            await userToUpdate.save()
            res.status(200).json({ message: 'usuario atualizado com sucesso' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }
}