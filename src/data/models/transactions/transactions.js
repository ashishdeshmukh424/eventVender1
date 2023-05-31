import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const Transactions = sequelize.define(
    'Transactions',
    {
    TransactionId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    TransactionDate: {
        type: DataTypes.DATEONLY
    },
    TransactionTime: {
        type: DataTypes.STRING
    },
    MerchantName: {
        type: DataTypes.STRING
    },
    MstBankId: {
        type: DataTypes.INTEGER
    },
    AccountId: {
        type: DataTypes.INTEGER
    },
    Amount: {
        type: DataTypes.FLOAT
    },
    GroupId: {
        type: DataTypes.INTEGER
    },
    Notes: {
        type: DataTypes.STRING,
    },
    StatusId: {
        type: DataTypes.INTEGER
    },
    MstTransactionTypeId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'MstTransactionTypes',
            key: 'Id',
        },
    },
    UserId: {
        type: DataTypes.INTEGER
    },
    IsSend: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    MailString: {
        type: DataTypes.STRING,
    },
    IsChecked: {
        type: DataTypes.BOOLEAN,
    },
    BankContact: {
        type: DataTypes.STRING,
    },
    IsManual: {
        type: DataTypes.BOOLEAN,
    },
    TrnAvailableAmount: {
        type: DataTypes.FLOAT
    },
    AvailableDifference: {
        type: DataTypes.STRING,
    },
    responsibleUser: {
        type: DataTypes.INTEGER,
    },
    IsNLP: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    },  
    {
      paranoid: false,
      hooks: {},
      deletedAt: false,
    },
  );

  // Transactions.associate = (models) => {
  //   Transactions.belongsTo(models.MstUsers, {
  //     foreignKey: 'userId',
  //   });
  // };

  Transactions.getAll = async () => {
    return Transactions.findAll({
      where:{
        IsDeleted: false,
      }
    });

  };

  Transactions.createNew = async (input, transaction) => {
    return Transactions.create({ ...input }, {
      // transaction,
    });
  };

  Transactions.getAllByPaginated = async (identifiers, queryParams) => {
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return Transactions.findAll(sqlQuery);
  };

  Transactions.getOne = async (identifiers) => {
    return Transactions.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };

  Transactions.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await Transactions.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };

  Transactions.updateExisting = async (identifier, input, transaction) => {
    return Transactions.update({ ...input }, {
      where: {
        UserId: identifier.UserId,
        // EmailId: identifier.MailId
      },
      // transaction,
    });
  };


  return Transactions;
};
