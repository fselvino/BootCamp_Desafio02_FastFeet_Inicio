import Sequelize, { Model } from 'sequelize';

// Model de Entregador
class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  // static associate(models) {
  //   this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  // }
  static associate(models) {
    // relacionamento pertence a - tabale file conula id
    // foi atribuido um apelido ao mode File de avatar
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Deliveryman;
