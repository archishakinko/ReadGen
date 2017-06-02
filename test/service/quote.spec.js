let quote = [
    {
        bookId: 1,
        authorId:1,
        quote: "bla bala bal lbal"
    },
    {
        bookId: 2,
        authorId:2,
        quote: "bla bala bal lbal"
    }
];

let mockQuote = require('./../mock/repository') (quote);
let serviceQuote = require('../../services/quote') (mockQuote);

describe('quote', () => {
     it('return promise', () => {
        expect(serviceQuote.deleteQuote({body:{bookid:1, authorid:1}},{}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await serviceQuote.deleteQuote({body:{bookid:1, authorid:1}},{});
        expect(mockQuote.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":1
                                });
    });
    it('updated test', async () => {
        let record = await serviceQuote.changeQuote({body:{bookid:1, authorid:1, quote: "new text"}},{});
        expect(mockQuote.update).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":[1,{"quote":"new text"}]
                                });
    });

});
