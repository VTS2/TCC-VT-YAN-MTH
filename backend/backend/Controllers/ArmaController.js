const Arma = require('../Model/Arma')
const User = require('../Model/User')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const jwt = require('jsonwebtoken')
const ImageArma = require('../Model/ImageArma')

module.exports = class ArmaController {
    static async create(req, res) {
        const { name, tipo, valor } = req.body


        const available = true
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatório' })
            return
        }
        if (!tipo) {
            res.status(422).json({ message: 'O tipo da arma é obrigatório' })
            return
        }
        if (!valor) {
            res.status(422).json({ message: 'O valor é obrigatório' })
            return
        }


        //pegando o dono do arma
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        //criando arma
        const arma = new Arma({
            name: name,
            tipo: tipo,
            valor: valor,
            UserId: currentUser.id
        });

        try {
            // Save the arma to the database
            const newArma = await arma.save();

            // Handle image uploads
            const image = req.files;
            if (image && image.length > 0) {
                // Save each image to the Imagearma table
                for (let i = 0; i < image.length; i++) {
                    const filename = image[i].filename;
                    const newImageArma = new ImageArma({ image: filename, ArmaId: newArma.id });
                    await newImageArma.save();
                }
            }

            res.status(201).json({ message: 'Arma cadastrado com sucesso', newArma });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }



    //mostrando todos os armas
    static async getAll(req, res) {
        const armas = await Arma.findAll({
            order: [['createdAt', 'DESC']],
            include: ImageArma
        });

        res.status(200).json({ armas: armas });

    }

    //filtrando os armas por usuario
    static async getAllUserArmas(req, res) {
        //encontrando o usuario logado
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        const armas = await Arma.findAll({ 
            where: { userId: currentUserId }, 
            order: [['createdAt', 'DESC']] ,
            include: ImageArma
        })

        res.status(200).json({ armas })

    }

    static async getArmaById(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' })
            return
        }
        //get arma by id
        const arma = await Arma.findByPk(id, { include: ImageArma });

        //validando se o ID é valido
        if (!arma) {
            res.status(422).json({ message: 'Essa arma não existe' })
            return
        }

        res.status(200).json({ arma: arma })
    }

    static async removeArmaById(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' })
            return
        }
        //get arma by id
        const arma = await Arma.findByPk(id)

        //validando se o ID é valido
        if (!arma) {
            res.status(422).json({ message: 'Essa arma não existe' })
            return
        }

        //checar se o usuario logado registrou o arma
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        // if (Number(arma.userId) !== Number(currentUserId)) {
        //     res.status(422).json({ message: 'ID inválido' })
        //     return
        // }

        await Arma.destroy({ where: { id: id } })

        res.status(200).json({ message: 'Arma removida com sucesso' })
    }


    static async updateArma(req, res) {
        const id = req.params.id
        const { name, tipo, valor } = req.body

        const updateData = {}
        const arma = await Arma.findByPk(id);

        if (!arma) {
            res.status(404).json({ message: "Essa arma não existe!" });
            return;
        }

        //pegando o dono do arma
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if (arma.UserId !== currentUser.id) {
            res.status(422).json({ message: "ID inválido!" });
            return;
        }

        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        } else {
            updateData.name = name
        }
        if (!tipo) {
            res.status(422).json({ message: "O tipo é obrigatório!" });
            return;
        } else {
            updateData.tipo = tipo
        }
        if (!valor) {
            res.status(422).json({ message: "O valor é obrigatório!" });
            return;
        } else {
            updateData.valor = valor
        }


        const image = req.files
        if (!image || image.length === 0) {
            res.status(422).json({ message: "As imagens são obrigatórias!" });
            return;
        } else {
            // Atualizar as imagens do arma
            const imageFilenames = image.map((image) => image.filename);
            // Remover imagens antigas
            await ImageArma.destroy({ where: { ArmaId: arma.id } });
            // Adicionar novas imagens
            for (let i = 0; i < imageFilenames.length; i++) {
                const filename = imageFilenames[i];
                const newImageArma = new ImageArma({ image: filename, ArmaId: arma.id });
                await newImageArma.save();
            }

        }

        await Arma.update(updateData, { where: { id: id } });

        res.status(200).json({ message: "att com successo!" })
    }

    static async schedule(req, res) {
        const id = req.params.id;

        const arma = await Arma.findByPk(id);

        if (!arma) {
            res.status(404).json({ message: "Essa arma nao existe não existe!" });
            return;
        }

        //checar se o usuario logado registrou o arma
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if (arma.userId === currentUser.id) {
            res.status(422).json({ message: "A arma é sua" });
            return;
        }

        //checar se o usuario ja agendou a visita

        if (arma.adopter) {
            if (arma.adopter === currentUser.id) {
                res.status(422).json({ message: "Voce ja agendou a visita" });
                return;
            }
        }

        console.log(arma.adopter, ' = ', currentUser.id)
        //adicioar user como adontante do arma
        arma.adopter = currentUser.id

        await arma.save()

        res.status(200).json({ message: `Comprada por ${currentUser.name}` })
    }

    static async concludeAdoption(req, res) {
        const id = req.params.id;

        const arma = await Arma.findByPk(id);
        if (!arma) {
            res.status(404).json({ message: "Essa arma não existe!" });
            return;
        }

        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if (arma.UserId !== currentUser.id) {
            res.status(422).json({ message: "ID inválido!" });
            return;
        }

        arma.available = false

        await arma.save(); // Salvando a instância do arma atualizada.

        res.status(200).json({ message: `Compra concluída` })
    }

    static async getAllUserPurchased (req, res) {

        //get usuario pelo token
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        const armas = await Arma.findAll({
            where: { adopter: currentUser.id },
            order: [['createdAt', 'DESC']],
            include: [{ model: User, attributes: ['name', 'phone'] }, ImageArma]
        });
        ;

        res.status(200).json({
            armas,
        })

    }


}