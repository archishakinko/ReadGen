let bookshelf = [
    {
        bookId: 1,
        profileId: 1,
        status: 1
    },
    {
        bookId: 2,
        profileId: 2,
        status: 2
    }
];

let mockBookshelf = require('./../mock/repository') (bookshelf);
let serviceBookshelf = require('../../services/bookshelv') (mockBookshelf);

describe('bookshelf', () => {
     it('return promise', () => {
        expect(serviceBookshelf.deleteBook({params:{bookid:1}},{locals:{user:{id:1}}}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await serviceBookshelf.deleteBook({params:{bookid:1}}, {locals:{user:{id:1}}});
        expect(mockBookshelf.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":1
                                });
    });
    it('updated test', async () => {
        let record = await serviceBookshelf.changeStatus({body:{bookid:1}, params: {status: 2}}, {locals:{user:{id:1}}});
        expect(mockBookshelf.update).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data":[1,{"status": 2}],
                                "newStatus": 2
                                });
    });

});
