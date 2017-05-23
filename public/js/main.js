var ajaxHandlers = {
    search_form: {
        type: "get",
        url: "/api/books/:q:",
        precall: function() {
            $("#search #results").html("");
        },
        callback: function(data) {
            data.work.forEach(function(book){
                $("#search #results").append('<div class="result" rel="book" data-title="'+book.best_book.title+'" data-author="'+book.best_book.author.name+'">'+
                    '<img src="'+book.best_book.small_image_url+'">'+
                    '<span class="author">'+book.best_book.author.name+'</span>'+
                    '<span class="title">'+book.best_book.title+'</span>'+
                '</div>');
            });
            $("#search #results").show();
        }
    },
    get_book: {
        type: "get",
        url: "/api/books/:author:/:title:",
        callback: function(data){
            
        }
    }
};

function callAjax(id, data) {
    var $ajax;
    switch (ajaxHandlers[id].type) {
        case "get":
            $ajax = $.get;
        break;
        case "post":
            $ajax = $.post;
        break;
    }
    var url = ajaxHandlers[id].url;
    $(this).serializeArray().forEach(function(item) {
        url = url.replace(':'+item.name+':', item.value);
    });
    if (ajaxHandlers[id].precall)
        ajaxHandlers[id].precall();
    $ajax(url, data).done(ajaxHandlers[id].callback);
}

$(document).on('submit', 'form', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    var id = $(this).attr("id");
    callAjax(id, data);
});

function showError(error) {
    $("#notes").append('<div class="error">'+error.message+'</div>');
    setTimeout(function() {
        $("#notes>*").first().fadeOut("fast", function() {
            $("#notes>*").first().remove();
        });
    }, 5000);
}

$(document).ajaxError(function(e,jq,s,er) {
    showError(JSON.parse(jq.responseText));
});

$(document).on('click', '[rel=book]', function(e) {
    e.preventDefault();
    callAjax("get_book", {
        title: $(this).data('title'),
        author: $(this).data('author')
    });
})