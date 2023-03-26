// import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const CatalogSubcategory = sequelize.define(
    'CatalogSubcategory',
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
          await CatalogSubcategory.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  CatalogSubcategory.associate = (models) => {
    CatalogSubcategory.belongsTo(models.CatalogCategory, {
      foreignKey: 'catalogCategoryId',
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  };

  CatalogSubcategory.getAll = async (includePassword) => {
    return CatalogSubcategory.findAll({
    });
  };

  CatalogSubcategory.getOne = async (identifiers) => {
    return CatalogSubcategory.findOne({
      where: identifiers,
    });
  };
  return CatalogSubcategory;
};
