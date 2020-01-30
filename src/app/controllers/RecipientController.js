import * as yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  // meto para cadastrar estudantes no banco
  async store(req, res) {
    // cria um esquema de validaçao dos dados
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      street: yup.string().required(),
      number: yup
        .number()
        .integer()
        .required(),
      complement: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      cep: yup.string().required(),
    });

    // valida os dados vindos do bory se nao for igual retorna erro
    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation Store Session fails' });
    }

    // realiza consulta no banco com os parametros vindos da requisiçao
    const RecipientExists = await Recipient.findOne({
      where: { email: req.body.email },
    });
    // se existir destinatario cadastrado com mesmo email retorna erro
    if (RecipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }
    // cadastra destinatario na tabela recipents
    const {
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      cep,
    } = await Recipient.create(req.body);
    return res.json({
      name,
      email,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
  }

  // metodo para Atualizar os Destinatarios
  async update(req, res, next) {
    // cria um esquema de validaçao dos dados
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup
        .string()
        .email()
        .required(),
      street: yup.string().required(),
      number: yup
        .number()
        .integer()
        .required(),
      complement: yup.string().required(),
      state: yup.string().required(),
      city: yup.string().required(),
      cep: yup.string().required(),
    });

    // valida os dados vindos do bory se nao for igual retorna erro
    if (!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'Validation Store Session fails' });
    }
    const { email } = req.body;
    /**
     * bloco que realiza a verificaçao do destinatario repassado para a consulta
     * se existir destinatario  passa para o processo de atualizaçao
     * senão retorna erro destinatario inexistente
     */
    try {
      // verifica se existe o destinatario
      const recipient = await Recipient.findOne({ where: { email } });
      const {
        id,
        name,
        street,
        number,
        complement,
        state,
        city,
        cep,
        // atualiza os dados do destinatário conforme informaçoes vinda do body
      } = await recipient.update(req.body);

      // retorna as informaçoes do destinatário
      return res.json({
        id,
        name,
        email,
        street,
        number,
        complement,
        state,
        city,
        cep,
      });
    } catch (error) {
      return res.status(400).json({ error: 'Email of recipient inexistente' });
    }
  }
}

export default new RecipientController();
