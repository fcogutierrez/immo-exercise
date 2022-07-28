const propertiesService = require('../services/app_implementation');

const getInvestableProperties = async (req, res) => {
    res.send(await propertiesService.getInvestableProperties(req.params.region));
}

module.exports = {
    getInvestableProperties
};