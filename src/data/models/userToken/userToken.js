import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const UserTokens = sequelize.define(
    'UserTokens',
    {
    Id : {
        primaryKey : true,
        type : DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    UserId : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    AccessToken :{
        type : DataTypes.STRING
    } ,
    EmailId : {
        type: DataTypes.STRING
    },
    RefreshToken :{
        type: DataTypes.STRING
    },
    JsonObject :{
        type: DataTypes.JSON
    },
    Provider: {
        type: DataTypes.STRING
    },
    Scope: {
        type: DataTypes.STRING
    },
    TokenType: {
        type: DataTypes.STRING
    },
    ExpiryDate: {
        type: DataTypes.STRING
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    LinkDate: {
        type: DataTypes.DATEONLY,
    }
   
    },
    {
      paranoid: false,
      hooks: {},
      // createdAt : 'createdAt',
      // updatedAt : 'modifiedAt',
      deletedAt: false,

    },
  );

  UserTokens.associate = (models) => {
    UserTokens.belongsTo(models.MstUsers, {
      foreignKey: 'UserId',
    });
  };

  UserTokens.getAll = async () => {
     return UserTokens.findAll({
       where:{
         IsDeleted:false,
       },
       include:[
         {
          model: sequelize.models.MstUsers,
        },
       ],
      //  limit:2
       
     });
  };

  UserTokens.createNew = async (input, transaction) => {
    return UserTokens.create({ ...input }, {
      transaction,
    });
  };

  UserTokens.getAllByPaginated = async (identifiers, queryParams) => {
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return UserTokens.findAll(sqlQuery);
  };

  UserTokens.getOne = async (identifiers) => {
    return UserTokens.findOne({
      where: {
        EmailId:identifiers.Email,
        IsDeleted: false
    },
      // attributes: { exclude: ['password'] },
    });
  };

  UserTokens.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await UserTokens.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };

  UserTokens.updateExisting = async (identifier, input, transaction) => {
    return UserTokens.update({ ...input }, {
      where: {
        UserId: identifier.UserId,
        EmailId: identifier.EmailId
      },
      // transaction,
    });
  };


  return UserTokens;
};
