const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    release_date:{
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    genre: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  });
};
