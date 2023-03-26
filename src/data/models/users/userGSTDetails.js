// import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const UserGSTDetails = sequelize.define(
    'UserGSTDetails',
    {
      gstIN: {
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
          await UserGSTDetails.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  UserGSTDetails.associate = (models) => {
    UserGSTDetails.belongsTo(models.Users, {
      foreignKey: 'userId',
      allowNull: false,
      type: DataTypes.INTEGER,
    });
  };

  UserGSTDetails.getAll = async (includePassword) => {
    return UserGSTDetails.findAll({
    });
  };

  UserGSTDetails.getOne = async (identifiers) => {
    return UserGSTDetails.findOne({
      where: identifiers,
    });
  };
  return UserGSTDetails;
};
