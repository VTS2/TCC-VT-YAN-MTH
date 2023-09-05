const Municao = require('../Model/Municao')
const User = require('../Model/User')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const jwt = require('jsonwebtoken')
const ImageMunicao = require('../Model/ImageMunicao')

module.exports = class MunicaoController {
    static async create(req, res) {
        const { calibre, valor } = req.body


        const available = true
        if (!calibre) {
            res.status(422).json({ message: 'O calibre é obrigatório' })
            return
        }
        if (!valor) {
            res.status(422).json({ message: 'O valor é obrigatório' })
            return
        }


        //pegando o dono da muni
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        //criando muni
        const municao = new Municao({
            calibre: calibre,
            valor: valor,
            UserId: currentUser.id
        });

        try {
            // Save the municao to the database
            const newMunicao = await municao.save();

            // Handle image uploads
            const image = req.files;
            if (image && image.length > 0) {
                // Save each image to the ImageMunicao table
                for (let i = 0; i < image.length; i++) {
                    const filename = image[i].filename;
                    const newImageMunicao = new ImageMunicao({ image: filename, MunicaoId: newMunicao.id });
                    await newImageMunicao.save();
                }
            }

            res.status(201).json({ message: 'munição cadastrada com sucesso', newMunicao });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }



    //mostrando todos as muni
    static async getAll(req, res) {
        const municoes = await Municao.findAll({
            order: [['createdAt', 'DESC']],
            include: ImageMunicao
        });

        res.status(200).json({ municoes: municoes });

    }

    //filtrando as muni por usuario
    static async getAllUserMunicoes(req, res) {
        //encontrando o usuario logado
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        const municoes = await Municao.findAll({ 
            where: { userId: currentUserId }, 
            order: [['createdAt', 'DESC']] ,
            include: ImageMunicao
        })

        res.status(200).json({ municoes })

    }

    static async getMunicaoById(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' })
            return
        }
        //get municao by id
        const municao = await Municao.findByPk(id, { include: ImageMunicao });

        //validando se o ID é valido
        if (!municao) {
            res.status(422).json({ message: 'Essa munição não existe' })
            return
        }

        res.status(200).json({ municao: municao })
    }

    static async removeMunicaoById(req, res) {
        const id = req.params.id

        if (isNaN(id)) {
            res.status(422).json({ message: 'ID Inválido' })
            return
        }
        //get municao by id
        const municao = await Municao.findByPk(id)

        //validando se o ID é valido
        if (!municao) {
            res.status(422).json({ message: 'Essa municao não existe' })
            return
        }

        //checar se o usuario logado registrou o municao
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        currentUser.password = undefined
        const currentUserId = currentUser.id

        // if (Number(municao.userId) !== Number(currentUserId)) {
        //     res.status(422).json({ message: 'ID inválido' })
        //     return
        // }

        await Municao.destroy({ where: { id: id } })

        res.status(200).json({ message: 'munição removida com sucesso' })
    }


    static async updateMunicao(req, res) {
        const id = req.params.id
        const { calibre, valor } = req.body

        const updateData = {}
        const municao = await Municao.findByPk(id);

        if (!municao) {
            res.status(404).json({ message: "Essa munição não existe!" });
            return;
        }

        //pegando o dono do municao
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if (municao.UserId !== currentUser.id) {
            res.status(422).json({ message: "ID inválido!" });
            return;
        }

        if (!calibre) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        } else {
            updateData.calibre = calibre
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
            // Atualizar as imagens do municao
            const imageFilenames = image.map((image) => image.filename);
            // Remover imagens antigas
            await ImageMunicao.destroy({ where: { MunicaoId: municao.id } });
            // Adicionar novas imagens
            for (let i = 0; i < imageFilenames.length; i++) {
                const filename = imageFilenames[i];
                const newImageMunicao = new ImageMunicao({ image: filename, MunicaoId: municao.id });
                await newImageMunicao.save();
            }

        }

        await Municao.update(updateData, { where: { id: id } });

        res.status(200).json({ message: "att com successo!" })
    }

    static async schedule(req, res) {
        const id = req.params.id;

        const municao = await Municao.findByPk(id);

        if (!municao) {
            res.status(404).json({ message: "Essa munição não existe!" });
            return;
        }

        //checar se o usuario logado registrou a municao
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if (municao.userId === currentUser.id) {
            res.status(422).json({ message: "A municao é sua" });
            return;
        }

        //checar se o usuario ja selecionou a compra

        if (municao.adopter) {
            if (municao.adopter === currentUser.id) {
                res.status(422).json({ message: "Voce ja selecionou a compra" });
                return;
            }
        }

        console.log(municao.adopter, ' = ', currentUser.id)
        //adicioar user como adontante do municao
        municao.adopter = currentUser.id

        await municao.save()

        res.status(200).json({ message: `Sua compra foi selecionada por ${currentUser.name}` }) 
    }

    static async concludeAdoption(req, res) {
        const id = req.params.id;

        const municao = await Municao.findByPk(id);
        if (!municao) {
            res.status(404).json({ message: "Essa municao não existe!" });
            return;
        }

        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        if (municao.UserId !== currentUser.id) {
            res.status(422).json({ message: "ID inválido!" });
            return;
        }

        municao.available = false

        await municao.save(); // Salvando a instância do municao atualizada.

        res.status(200).json({ message: `Compra concluída` })
    }

    static async getAllUserPurchased (req, res) {

        //get usuario pelo token
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)

        const municoes = await Municao.findAll({
            where: { adopter: currentUser.id },
            order: [['createdAt', 'DESC']],
            include: [{ model: User, attributes: ['name', 'phone'] }, ImageMunicao]
        });
        ;

        res.status(200).json({
            municoes
        })

    }


}