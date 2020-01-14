module.exports = (sequelize, DataTypes) => {
  const Airport = sequelize.define('Airport', {
    airport_id: {
      type: DataTypes.INTEGER,
      primary_key: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IATA: {
      type: DataTypes.STRING
    },
    ICAO: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    altitude: {
      type: DataTypes.INTEGER
    },
    timezone: {
      type: DataTypes.INTEGER
    },
    daylight_savings_time: {
      type: DataTypes.STRING
    },
    tz: {
      type: DataTypes.STRING
    }
  });
  return Airport;
};
