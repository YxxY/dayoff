
export const schema = DataTypes => {
  const { STRING, INTEGER } = DataTypes;

  return {
    date: { type: STRING(10), primaryKey: true, allowNull: false },
    off: { type: INTEGER(1), defaultValue: 1, comment: '是否休息 0:否 1:是' },
  };

};

export default function(app) {
  const { DataTypes } = app.Sequelize;
  const Day = app.model.define('day', schema(DataTypes));
  return Day;
}
