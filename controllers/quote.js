const express = require('express');
const out = require('../utils/out');
 
module.exports = (quoteService)=>{
    const router = express.Router();
    
        router.delete('/quotes', (req, res) => {
            quoteService.deleteQuote(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.post('/quotes', (req, res) => {
            quoteService.addQuote(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.put('/quotes', (req, res) => {
            quoteService.changeQuote(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}