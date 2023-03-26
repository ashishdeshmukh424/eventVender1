// import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const UserSupplierDetails = sequelize.define(
    'UserSupplierDetails',
    {
      supplierName: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
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
          await UserSupplierDetails.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  UserSupplierDetails.associate = (models) => {
    UserSupplierDetails.belongsTo(models.Users, {
      foreignKey: 'userId',
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  };

  UserSupplierDetails.getAll = async (includePassword) => {
    return UserSupplierDetails.findAll({
    });
  };

  UserSupplierDetails.getOne = async (identifiers) => {
    return UserSupplierDetails.findOne({
      where: identifiers,
    });
  };
  return UserSupplierDetails;
};
