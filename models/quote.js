module.exports = (Sequelize, sequelize) => {
    return sequelize.define('quote', {
        quote: Sequelize.TEXT
    });    
};