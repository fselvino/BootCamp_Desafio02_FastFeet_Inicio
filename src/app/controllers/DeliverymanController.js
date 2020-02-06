import * as yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required,
      email: yup
        .string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation update User fails' });
    }

    const { name, email } = req.body;
    const deliveryMan = await Deliveryman.create({
      name,
      email,
    });
    return res.json(deliveryMan);
  }

  async index(req, res) {
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      avatar_id: yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation update User fails' });
    }
    const { name, email } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (email !== deliveryman.email) {
      return res.status(400).json({ error: 'Email not found' });
    }

    const { id } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    await Deliveryman.destroy({
      where: { id: req.params.id },
    });
    return res.json({ mensagem: 'Arquivo excluido com sucesso' });
  }
}
export default new DeliverymanController();
