const express = require('express');
const out = require('../utils/out');
 
module.exports = (ratingService)=>{
    const router = express.Router();
    
        router.delete('/deleterate', (req, res) => {
            ratingService.deleteRate(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.post('/addrate', (req, res) => {
            ratingService.rateBook(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.put('/changerate/:rate', (req, res) => {
            ratingService.changeRate(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}