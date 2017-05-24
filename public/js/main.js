var ajaxHandlers = {
    search_form: {
        type: "get",
        url: "/api/books",
        precall: function() {
            $("#search #results").html("");
            $("#search .fa-spin").show();
        },
        callback: function(data) {
            data.work.forEach(function(book){
                $("#search #results").append('<div class="result" rel="book" data-title="'+book.best_book.title+'" data-author="'+book.best_book.author.name+'">'+
                    '<img src="'+book.best_book.small_image_url+'">'+
                    '<span class="author">'+book.best_book.author.name+'</span>'+
                    '<span class="title">'+book.best_book.title+'</span>'+
                '</div>');
            });
            $("#search .fa-spin").hide();
            $("#search #results").show();
        }
    },
    get_book: {
        type: "get",
        url: "/api/books/:author:/:title:",
        precall: function() {
            $("#content>.content").hide();
            $("#spinner").show();
        },
        callback: function(data){
            console.log(data);
            $("#book img").attr("src", data.book.img);
            $("#book .author").html(typeof data.book.bookauthor != 'Object'?data.book.bookauthor[0].name:data.book.bookauthor.name);
            $("#book .title").html(data.book.title);
            $("#book .rate").html(data.book.rate);
            $("#book .annotation").html(data.book.annotation);
            $("#book").show();
            $("#spinner").hide();
        }
    },
    get_my_books: {
        type: "get",
        url: "/api/bookshelvs",
        precall: function() {
            $("#content>.content").hide();
            $("#spinner").show();
        },
        callback: function(data) {
            var status = {
                "1":"notreading",
                "2":"reading",
                "3":"wanted",
                "4":"stoped"
            };
            $("#reading .list, #wanted .list, #stoped .list, #recomend .list").html("");
            data.books.forEach(function(book){
                $('<div class="book" rel="book" data-id="'+book.id+'">');
            })
            $("#main").show();
            $("#spinner").hide();
        }
    }
};

ajaxHandlers.get_book_id = {};
Object.assign(ajaxHandlers.get_book_id, ajaxHandlers.get_book);
ajaxHandlers.get_book_id.url = "/api/books/:id:";

$(document).ready(function() {
    callAjax("get_my_books", {});
});

$(document).on("click", "#logo", function(e) {
    e.preventDefault();
    callAjax("get_my_books", {});
});