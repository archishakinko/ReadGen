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
            var authors = "";
            data.book.bookauthor.forEach(function(author) {
                authors += ((authors!="")?", ":"")+author.name;
            })
            var genres = "";
            data.book.bookgenre.forEach(function(genre) {
                genres += ((genres!="")?", ":"")+genre.genre;
            })
            var reviews = {};
            $("#book img").attr("src", data.book.img);
            $("#book .author").html(authors);
            $("#book .title").html(data.book.title);
            $("#book .rate").html(data.book.rate);
            $("#book .annotation").html(data.book.annotation);
            $("#book .genre").html(genres);
            $("#book .review").html(genres);
            $("#book .status").attr("data-bookid", data.book.id).removeClass("active");
            if (data.book.bookshelv.length>0)
                $("#book .status[data-id='"+data.book.bookshelv[0].bookshelv.status+"']").addClass("active");
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
                "4":"stopped"
            };
            var cnt = {};
            for (var key in status) {
                $("#"+status[key]+" .list").html("");
                cnt[status[key]] = 0;
            }
            data.books.forEach(function(book){
                console.log(book);
                var authors = "";
                book.bookauthor.forEach(function(author) {
                    authors += ((authors!="")?", ":"")+author.name;
                })
                $('<div class="book" rel="book" data-id="'+book.id+'">'+
                    '<img src="'+book.img+'">'+
                    '<div class="author">'+authors+'</div>'+
                    '<div class="title">'+book.title+'</div>'+
                '</div>').appendTo("#"+status[book.bookshelv[0].bookshelv.status]+" .list");
                cnt[status[book.bookshelv[0].bookshelv.status]]++;
            })
            for (var key in status) {
                $("#"+status[key]+" .count").html(cnt[status[key]]);
            }
            $("#main").show();
            $("#spinner").hide();
        }
    },
    status: {
        type: "post",
        url: "/api/bookshelvs/:bookid:",
        callback: function(data) {
            console.log(data);
            $("#book .status.active").removeClass("active");
            $("#book .status[data-id='"+data.status+"']").addClass("active");
        }
    },
    genre: {
        type: "get",
        url: "/api/booksgenre/:genreid:",
        callback: function(data) {
            var genres = "";
            data.book.bookauthor.forEach(function(author) {
                authors += ((authors!="")?", ":"")+author.name;
            })
            console.log(data);
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