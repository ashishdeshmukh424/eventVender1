// import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const UserBankDetails = sequelize.define(
    'UserBankDetails',
    {
      holderName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        // defaultValue: Sequelize.UUIDV4,
      },
      ifscNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
      hooks: {
        beforeDestroy: async (app, options) => {
          await UserBankDetails.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  UserBankDetails.associate = (models) => {
    UserBankDetails.belongsTo(models.Users, {
      foreignKey: 'userId',
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  };

  UserBankDetails.getAll = async (includePassword) => {
    return UserBankDetails.findAll({
    });
  };

  UserBankDetails.getOne = async (identifiers) => {
    return UserBankDetails.findOne({
      where: identifiers,
    });
  };

  UserBankDetails.createNew = async (input, transaction) => {
    return UserBankDetails.create({ ...input }, {
      transaction,
    });
  };

  return UserBankDetails;
};
