import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const MstAccountTypes = sequelize.define(
    'MstAccountTypes',
{
    Id : {
        primaryKey : true,
        type : DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    AccountType : {
        type : DataTypes.STRING,
        allowNull : false
    },
    CountryId : {
        type : DataTypes.INTEGER
    },
    IsDeleted : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, 
    {
      paranoid: false,
      hooks: {},
      deletedAt: false,
    },
  );

  // MstAccountTypes.associate = (models) => {
  //   MstAccountTypes.belongsTo(models.MstBanks, {
  //     foreignKey: 'MstBankId',
  //   });
  // MstAccountTypes.belongsTo(models.MstUsers, {
  //     foreignKey: 'UserId',
  //   });
  // };

  MstAccountTypes.getAll = async () => {
    return MstAccountTypes.findAll({
      where:{
        IsDeleted: false,
      }
    });

  };

  MstAccountTypes.createNew = async (input, transaction) => {
    return MstAccountTypes.create({ ...input }, {
      // transaction,
    });
  };

  MstAccountTypes.getAllByPaginated = async (identifiers, queryParams) => {
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return MstAccountTypes.findAll(sqlQuery);
  };

  MstAccountTypes.getOne = async (identifiers) => {
    return MstAccountTypes.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };

  MstAccountTypes.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await MstAccountTypes.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };

  MstAccountTypes.updateExisting = async (identifier, input, transaction) => {
    console.log('🚀 ^~^ - MstAccountTypes.updateExisting= - identifier, input:', identifier, input)
    return MstAccountTypes.update({ ...input }, {
      where: {
        UserId: identifier.UserId,
        // EmailId: identifier.MailId
      },
      // transaction,
    });
  };


  return MstAccountTypes;
};
