const express = require('express');
const out = require('../utils/out');
 
module.exports = (reviewService)=>{
    const router = express.Router();
    
        router.delete('/deletereview', (req, res) => {
            reviewService.deleteReview(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.post('/addreview', (req, res) => {
            reviewService.addReview(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.put('/changereview', (req, res) => {
            reviewService.changeReview(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}