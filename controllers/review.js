const express = require('express');
const out = require('../utils/out');
 
module.exports = (reviewService)=>{
    const router = express.Router();
    
        router.get('/reviews/:bookid', (req, res) => {
            reviewService.getReviews(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
        
        router.delete('/reviews', (req, res) => {
            reviewService.deleteReview(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.post('/reviews', (req, res) => {
            reviewService.addReview(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.put('/reviews', (req, res) => {
            reviewService.changeReview(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}