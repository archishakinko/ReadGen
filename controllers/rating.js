const express = require('express');
const out = require('../utils/out');
 
module.exports = (ratingService)=>{
    const router = express.Router();
    
        router.get('/rates/:bookid', (req, res) => {
            ratingService.getRating(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 

        router.delete('/rates', (req, res) => {
            ratingService.deleteRate(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 

        router.post('/rates', (req, res) => {
            ratingService.rateBook(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 

        router.put('/rates/:rate', (req, res) => {
            ratingService.changeRate(req, res).then((message) => {
                out.send(req, res, message, 200);
            });
        }); 
              
    return router;
}