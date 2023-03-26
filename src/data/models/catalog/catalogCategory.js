import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const CatalogCategory = sequelize.define(
    'CatalogCategory',
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
          await CatalogCategory.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  // CatalogCategory.associate = (models) => {
  //   CatalogCategory.belongsTo(models.UserGroups, {
  //     foreignKey: 'groupId',
  //   });
  // };

  CatalogCategory.getAll = async (includePassword) => {
    if (includePassword) return CatalogCategory.findAll({});

    return CatalogCategory.findAll({
      attributes: { exclude: ['password'] },
    });
  };

  CatalogCategory.getOne = async (identifiers) => {
    return CatalogCategory.findOne({
      where: identifiers,
      attributes: { exclude: ['password'] },
    });
  };
  return CatalogCategory;
};
