module.exports = (Sequelize, sequelize) => {
    return sequelize.define('book', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: Sequelize.STRING,
        rate: Sequelize.INTEGER,
        pages: Sequelize.INTEGER,
        annotation: Sequelize.TEXT,
        img: Sequelize.STRING
    });    
};