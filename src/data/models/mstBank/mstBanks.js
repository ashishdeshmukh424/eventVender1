import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const MstBanks = sequelize.define(
    'MstBanks',
{
    Id : {
        primaryKey : true,
        type : DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    BankName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    CountryId : {
        type : DataTypes.INTEGER
    },
    BankIcon : {
        type : DataTypes.STRING,
        allowNull : false
    },
    BankNumber : {
        type : DataTypes.STRING,
        allowNull : false
    },
    IsDeleted : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
    {
      paranoid: false,
      hooks: {},
    },
  );

  // MstBanks.associate = (models) => {
  //   MstBanks.belongsTo(models.UserGroups, {
  //     foreignKey: 'groupId',
  //   });
  // };

  MstBanks.getAll = async (includePassword) => {
    // if (includePassword) return MstBanks.findAll({});

    return MstBanks.findAll({
      where:{
        IsActive: true,
        IsDeleted: false
      },
      attributes: { exclude: ['password'] },
    });
  };

  MstBanks.createNew = async (input, transaction) => {
    return MstBanks.create({ ...input }, {
      transaction,
    });
  };

  MstBanks.getAllByPaginated = async (identifiers, queryParams) => {
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return MstBanks.findAll(sqlQuery);
  };

  MstBanks.getOne = async (identifiers) => {
    return MstBanks.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };

  MstBanks.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await MstBanks.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };


  return MstBanks;
};
