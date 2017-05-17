const express = require('express');
const out = require('../utils/out');
 
module.exports = (quoteService)=>{
    const router = express.Router();
    
        router.delete('/deletequote', (req, res) => {
            quoteService.deleteQuote(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.post('/addquote', (req, res) => {
            quoteService.addQuote(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 

        router.put('/changequote', (req, res) => {
            quoteService.changeQuote(req, res).then((message) => {
                out.send(req, res, message);
            });
        }); 
              
    return router;
}