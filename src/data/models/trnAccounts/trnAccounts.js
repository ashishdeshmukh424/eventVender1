import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const TrnAccounts = sequelize.define(
    'TrnAccounts',
{
    AccountId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    AccountNum: {
        type: DataTypes.STRING
    },
    CardNum: {
        type: DataTypes.STRING
    },
    AccountName: {
        type: DataTypes.STRING
    },
    MstBankId: {
        type: DataTypes.INTEGER
    },
    MstAccountTypeId: {
        type: DataTypes.INTEGER
    },
    CreditLimit: {
        type: DataTypes.FLOAT,
        defaultValue: "0.00"
    },
    ExpiryDate: {
        type: DataTypes.DATEONLY
    },
    DueDate: {
        type: DataTypes.DATEONLY
    },
    IsActive: {
        type: DataTypes.BOOLEAN
    },
    BalanceAmount: {
        type: DataTypes.FLOAT,
        defaultValue: "0.00"
    },
    AvailableAmount: {
        type: DataTypes.FLOAT,
        defaultValue: "0.00"
    },
    UserTokenId: {
        type: DataTypes.INTEGER
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    IsSelected: {
        type: DataTypes.BOOLEAN
    },
    ImagePath: {
        type: DataTypes.STRING
    },
    IsCreditCard: {
        type: DataTypes.BOOLEAN
    }


}, 
    {
      paranoid: false,
      hooks: {},
      deletedAt: false,
    },
  );

  TrnAccounts.associate = (models) => {
    TrnAccounts.belongsTo(models.MstBanks, {
      foreignKey: 'MstBankId',
    });
  TrnAccounts.belongsTo(models.MstUsers, {
      foreignKey: 'UserId',
    });
  TrnAccounts.belongsTo(models.MstAccountTypes, {
      foreignKey: 'MstAccountTypeId',
    });
  };

  TrnAccounts.getAll = async () => {
    return TrnAccounts.findAll({
      where:{
        IsDeleted: false,
        IsActive: true
      },
      include: [
        {
          model: sequelize.models.MstBanks,
        },
      ],
    });

  };

  TrnAccounts.getAllByUser = async (identifiers) => {
    return TrnAccounts.findAll({
      where:{
        UserId: identifiers.UserId,
        IsDeleted: false,
        IsActive: true
      },
      include: [
        {
          model: sequelize.models.MstBanks,
        },
      ],
    });

  };

  TrnAccounts.createNew = async (input, transaction) => {
    return TrnAccounts.create({ ...input }, {
      // transaction,
    });
  };

  TrnAccounts.getAllByPaginated = async (identifiers, queryParams) => {
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return TrnAccounts.findAll(sqlQuery);
  };

  TrnAccounts.getOne = async (identifiers) => {
    return TrnAccounts.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };

  TrnAccounts.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await TrnAccounts.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };

  TrnAccounts.updateExisting = async (identifier, input, transaction) => {
    console.log('🚀 ^~^ - TrnAccounts.updateExisting= - identifier, input:', identifier, input)
    return TrnAccounts.update({ ...input }, {
      where: {
        UserId: identifier.UserId,
        // EmailId: identifier.MailId
      },
      // transaction,
    });
  };


  return TrnAccounts;
};
