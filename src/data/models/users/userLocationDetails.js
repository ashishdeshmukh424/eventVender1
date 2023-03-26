// import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const UserLocationDetails = sequelize.define(
    'UserLocationDetails',
    {
      buildingNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pinCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
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
          await UserLocationDetails.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  UserLocationDetails.associate = (models) => {
    UserLocationDetails.belongsTo(models.Users, {
      foreignKey: 'userId',
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  };

  UserLocationDetails.getAll = async () => {
    return UserLocationDetails.findAll({
    });
  };

  UserLocationDetails.getOne = async (identifiers) => {
    return UserLocationDetails.findOne({
      where: identifiers,
    });
  };

  UserLocationDetails.createNew = async (input, transaction) => {
    console.log('🚀 ^~^ - UserLocationDetails.createNew= - input:', input);
    return UserLocationDetails.create({ ...input }, {
      transaction,
    });
  };

  return UserLocationDetails;
};
