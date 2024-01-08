module.exports = (sequelize, DataTypes) => {
    const Payments = sequelize.define("Payments", {
      amount: {
        type: DataTypes.FLOAT,
      },
      amountPaid: {
        type: DataTypes.FLOAT,
      },
      amountLeft: {
        type: DataTypes.FLOAT,
      },
      paymentDate: {
        type: DataTypes.DATE,
      },
      paymentMethod: {
        type: DataTypes.STRING,
      },
      paymentStatus: {
        type: DataTypes.STRING,
      },
    });
  
  
    return Payments;
  };
  