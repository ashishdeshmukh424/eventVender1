// import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const UserOTPDetails = sequelize.define(
    'UserOTPDetails',
    {
      otp: {
        type: DataTypes.INTEGER,
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
          await UserOTPDetails.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  UserOTPDetails.associate = (models) => {
    UserOTPDetails.belongsTo(models.Users, {
      foreignKey: 'userId',
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  };

  UserOTPDetails.getAll = async (includePassword) => {
    return UserOTPDetails.findAll({
    });
  };

  UserOTPDetails.getOne = async (identifiers) => {
    return UserOTPDetails.findOne({
      where: identifiers,
    });
  };
  return UserOTPDetails;
};
