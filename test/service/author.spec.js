let author = [
    {
        id: 1,
        name: "Gerbert Frank",
        website: "http://blabla"
    },
    {
        id: 2,
        name: "Misha Veller",
        website: "http://blabla"
    }
];

let mockAuthor = require('./../mock/repository') (author);
let serviceAuthor = require('../../services/authors') (mockAuthor);

describe('author', () => {
     it('return promise', () => {
        expect(serviceAuthor.deleteAuthor({params:{authorid:1}},{}))
            .toBeInstanceOf(Promise);
    });
    it('destroy test', async () => {
        let record = await serviceAuthor.deleteAuthor({params:{authorid:1}},{});
        expect(mockAuthor.destroy).toHaveBeenCalled();
        expect(record).toEqual({
                                "success": true,
                                "data": 1
                                });
    });

});
