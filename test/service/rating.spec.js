let rating = [
    {
        bookId: 1,
        profileId:1,
        rate: 5
    },
    {
        bookId: 2,
        profileId:2,
        rate: 5
    }
];

let mockRating = require('./../mock/repository') (rating);
let serviceRating = require('../../services/rating') (mockRating);

describe('rating', () => {
     it('return promise', () => {
        expect(serviceRating.deleteRate({body:{bookid:1}},{locals:{user:{id:1}}}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await serviceRating.deleteRate({body:{bookid:1}},{locals:{user:{id:1}}});
        expect(mockRating.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data": 1
                                });
    });
     it('updated test', async () => {
        let record = await serviceRating.changeRate({body:{bookid:1}, params:{rate: 4}},{locals:{user:{id:1}}});
        expect(mockRating.update).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":[1,{"rate":4}]
                                });
    });

});

