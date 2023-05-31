import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const LogS1 = sequelize.define(
    'LogS1',
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    EmailId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      BankEmail:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      requestBody: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      responseBody: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      hooks: {},
    },
  );

  // LogS1.associate = (models) => {
  //   LogS1.belongsTo(models.Users, {
  //     foreignKey: 'userId',
  //   });
  // };

  LogS1.getAll = async (includePassword) => {
    // if (includePassword) return LogS1.findAll({});

    return LogS1.findAll();
  };

  LogS1.createNew = async (input, transaction) => {
    return LogS1.create({ ...input }, {
      transaction,
    });
  };

  LogS1.getAllByPaginated = async (identifiers, queryParams) => {
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return LogS1.findAll(sqlQuery);
  };

  LogS1.getOne = async (identifiers) => {
    return LogS1.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };

  LogS1.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await LogS1.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };

  LogS1.updateExisting = async (identifier, input, transaction) => {
    return LogS1.update({ ...input }, {
      where: {
        id: identifier.id,
        // EmailId: identifier.MailId
      },
      // transaction,
    });
  };


  return LogS1;
};
