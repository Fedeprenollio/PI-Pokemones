const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha:true ,
        len: [2,11]
      }, 
      
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1,
        max:1000

      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1,
        max:1000

      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1,
        max:1000

      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1,
        max:1000

      }
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1,
        max:1000

      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:1,
        max:1000,
         
        esValido(value){
          if(value>=1000){
            throw new Error ("El valor debe ser entre 0 y 1000");
          }
        }
      },
    },
    image: {
      type: DataTypes.STRING,
      // validate : {
      //   isUrl: true
      // }
    },
    createInBD: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
