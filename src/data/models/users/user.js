import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // lastName: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        select: false,
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
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
          await Users.update({ synced: false }, {
            where: { id: options.where.id },
            transaction: options.transaction,
          });
        },
      },
    },
  );

  // Users.associate = (models) => {
  //   Users.belongsTo(models.UserGroups, {
  //     foreignKey: 'groupId',
  //   });
  // };

  Users.getAll = async (includePassword) => {
    if (includePassword) return Users.findAll({});

    return Users.findAll({
      attributes: { exclude: ['password'] },
    });
  };

  Users.createNew = async (input, transaction) => {
    console.log('🚀 ^~^ - Users.createNew= - input:', input);
    return Users.create({ ...input }, {
      transaction,
    });
  };

  Users.getAllByPaginated = async (identifiers, queryParams) => {
    console.log('🚀 ^~^ - Users.getAllByPaginated= - identifiers:', identifiers, queryParams);
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return Users.findAll(sqlQuery);
  };

  Users.getOne = async (identifiers) => {
    return Users.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };

  Users.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await Users.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };


  return Users;
};
