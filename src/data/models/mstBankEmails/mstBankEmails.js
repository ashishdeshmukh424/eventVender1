import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const MstBankEmails = sequelize.define(
    'MstBankEmails',
    {
    Id : {
        primaryKey : true,
        type : DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    MstBankId: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    EmailId : {
        type : DataTypes.STRING,
        allowNull : false
    },
    IsDeleted : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
    {
      paranoid: false,
      hooks: {},
    },
  );

  // MstBankEmails.associate = (models) => {
  //   MstBankEmails.belongsTo(models.UserGroups, {
  //     foreignKey: 'groupId',
  //   });
  // };

  MstBankEmails.getAll = async () => {
    // if (includePassword) return MstBankEmails.findAll({});

    return MstBankEmails.findAll({
      where:{
        IsDeleted: false
      },
    });
  };

  MstBankEmails.createNew = async (input, transaction) => {
    return MstBankEmails.create({ ...input }, {
      transaction,
    });
  };

  MstBankEmails.getAllByPaginated = async (identifiers, queryParams) => {
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return MstBankEmails.findAll(sqlQuery);
  };

  MstBankEmails.getOne = async (identifiers) => {
    return MstBankEmails.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };

  MstBankEmails.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await MstBankEmails.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };


  return MstBankEmails;
};
