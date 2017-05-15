const express = require('express');
const out = require('../utils/out');
 
module.exports = (ratingService)=>{
    const router = express.Router();
    
        router.delete('/deleterate/:rateid', (req, res) => {
            ratingService.deleteRate(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.post('/addrate', (req, res) => {
            ratingService.addRate(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.put('/changerate/:rateid', (req, res) => {
            ratingService.changeRate(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}