let book = [
    {
        id: 1,
        title: "Filth",
        rate: 5,
        pages: 332,
        annotation: "good book",
        img: "link to source"
    },
    {
        id: 2,
        title: "Three friends",
        rate: 5,
        pages: 432,
        annotation: "wery good book",
        img: "link to source"
    }
];

let mockBook = require('./../mock/repository') (book);
let serviceBook = require('../../services/books') (mockBook);

describe('book', () => {
     it('return promise', () => {
        expect(serviceBook.deleteFromDb({params:{bookid:1}},{}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await serviceBook.deleteFromDb({params:{bookid:1}},{});
        expect(mockBook.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data": 1
                                });
    });
     it('get book test', async () => {
        let record = await serviceBook.getBook({params:{bookid:5}},{});
        expect(mockBook.findOne).toHaveBeenCalled();
        expect(record).toEqual({"book":null, "success": true});
    });
    it('get book by rate test', async () => {
        let record = await serviceBook.getBooksByRate({params:{rate:9}},{});
        expect(mockBook.findAll).toHaveBeenCalled();
        expect(record).toEqual({"book":null, "success": true});
    });
});
