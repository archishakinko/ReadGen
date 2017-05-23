$(document).on('submit', 'form', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.post('/sessions', data).done(function (data) {
        //window.location.reload();
        console.log(data);
    })
});

function showError(error) {
    $("#notes").append('<div class="error">'+error.message+'</div>');
    setTimeout(function() {
        $("#notes>*").first().fadeOut("fast");
    }, 5000);
}

$(document).ajaxError(function(e,jq,s,er) {
    showError(jq.responseText);
});