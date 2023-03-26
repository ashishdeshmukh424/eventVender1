import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const AvailableServices = sequelize.define(
    'AvailableServices',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
          await AvailableServices.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  // AvailableServices.associate = (models) => {
  //   AvailableServices.belongsTo(models.UserGroups, {
  //     foreignKey: 'groupId',
  //   });
  // };

  AvailableServices.getAll = async (includePassword) => {
    if (includePassword) return AvailableServices.findAll({});

    return AvailableServices.findAll({
      attributes: { exclude: ['password'] },
    });
  };

  AvailableServices.getOne = async (identifiers) => {
    return AvailableServices.findOne({
      where: identifiers,
      attributes: { exclude: ['password'] },
    });
  };
  return AvailableServices;
};
