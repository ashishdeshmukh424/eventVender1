// import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const UserCatalogDetails = sequelize.define(
    'UserCatalogDetails',
    {
      images: {
        type: DataTypes.TEXT,
        allowNull: false,
        // unique: true,
      },
      hotelName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      minGuests: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maxGuests: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      whatsappNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availableServices: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: true,
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
          await UserCatalogDetails.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  UserCatalogDetails.associate = (models) => {
    UserCatalogDetails.belongsTo(models.CatalogCategory, {
      foreignKey: 'catalogCategoryId',
      allowNull: false,
      type: DataTypes.INTEGER,
    });
    UserCatalogDetails.belongsTo(models.Users, {
      foreignKey: 'userId',
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  };

  UserCatalogDetails.getAll = async (includePassword) => {
    return UserCatalogDetails.findAll({
    });
  };

  UserCatalogDetails.getOne = async (identifiers) => {
    return UserCatalogDetails.findOne({
      where: identifiers,
    });
  };
  return UserCatalogDetails;
};
