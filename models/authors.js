module.exports = (Sequelize, sequelize) => {
    return sequelize.define('author', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: Sequelize.STRING,
        website: Sequelize.STRING
    });    
};