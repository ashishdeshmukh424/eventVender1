import { isEmpty } from 'lodash';
import Sequelize from 'sequelize';

import config from '../../../config';
import { paginate } from '../../../utils/misc/pagination';
import { valueValidators } from '../../../utils/validators';

export default (sequelize, DataTypes) => {
  const MstUsers = sequelize.define(
    'MstUsers',
    {
    UserId : {
        primaryKey: true,
        type : DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },
    FirstName : {
        type : DataTypes.STRING
    },
    LastName : {
        type : DataTypes.STRING
    },
    Email :{
        type : DataTypes.STRING,
        allowNull : false
    } ,
    Password : {
            type: DataTypes.STRING,
            allowNull: false
    },
    CountryId :{
        type :  DataTypes.INTEGER,
    },
    ReferralCode : {
        type: DataTypes.STRING,
        allowNull: false
    },
    IsActive :{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    IsVerified :{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    IsSubscribed : {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    ContactNo:{
        type : DataTypes.STRING,
    },
    createdAt:{
        type : DataTypes.TIME
    },
    updatedAt: {
        type : DataTypes.TIME
    },
    IsBusiness: {
        type: DataTypes.BOOLEAN
    },
    CompanyName : {
        type: DataTypes.STRING
    },
    MemberCount : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    IsPrimary : {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    CircleId : {
        type: DataTypes.INTEGER
    },
    RelationshipId : {
        type: DataTypes.INTEGER
    },
    IsAccess : {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true
    }

    },
    {
      paranoid: false,
      hooks: {},
    },
  );

  // MstUsers.associate = (models) => {
  //   MstUsers.belongsTo(models.UserGroups, {
  //     foreignKey: 'groupId',
  //   });
  // };

  MstUsers.getAll = async (includePassword) => {
    // if (includePassword) return MstUsers.findAll({});

    return MstUsers.findAll({
      where:{
        IsActive: true,
        IsDeleted: false
      },
      attributes: { exclude: ['password'] },
    });
  };

  MstUsers.createNew = async (input, transaction) => {
    return MstUsers.create({ ...input }, {
      transaction,
    });
  };

  MstUsers.getAllByPaginated = async (identifiers, queryParams) => {
    const sqlQuery = {
      where: identifiers,
      // attributes: { exclude: ['password', 'code'] },
    };

    return MstUsers.findAll(sqlQuery);
  };

  MstUsers.getOne = async (identifiers) => {
    return MstUsers.findOne({
      where: identifiers,
      // attributes: { exclude: ['password'] },
    });
  };

  MstUsers.doesExistUniqueCode = async (identifiers) => {
    const oneExists = await MstUsers.findOne({
      where: { [Sequelize.Op.or]: identifiers, isDeleted: false },
    });
    if (oneExists != null && identifiers.code === oneExists.code) return true;
    else return false;
  };


  return MstUsers;
};
