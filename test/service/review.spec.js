let review = [
    {
        bookId: 1,
        profileId:1,
        text: "text"
    },
    {
        bookId: 2,
        authorId:2,
        text: "text"
    }
];

let mockReview = require('./../mock/repository') (review);
let serviceReview = require('../../services/review') (mockReview);

describe('review', () => {
     it('return promise', () => {
        expect(serviceReview.deleteReview({body:{bookid:1}},{locals:{user:{id:1}}}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await serviceReview.deleteReview({body:{bookid:1}},{locals:{user:{id:1}}});
        expect(mockReview.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data": 1
                                });
    });
    it('updated test', async () => {
        let record = await serviceReview.changeReview({body:{bookid:1, review: "new text"}},{locals:{user:{id:1}}});
        expect(mockReview.update).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":[1,{"text":"new text"}]
                                });
    });


});
