
// zoom in on pictures
$(document).ready(function () {
    $(".smig").click(function (e) {
        $('#imgViewer').html('').append($(e.currentTarget).clone().removeClass('img-fluid').removeClass('img-thumbnail').removeClass('smig').addClass('modal-img'));
        $('#viewImg').modal('show');

    });
    $(".smig").hover(function () {
        $(this).css('cursor', 'zoom-in');
    });
});

// write into firebase
function writeUserData(fname, lname, email, count, message) {
    firebase.database().ref('RSVP/333').set({
        fname: fname,
        lname: lname,
        email: email,
        message: message,
    });
}

function tmp() {
    var data = $('form').serialize();// document.getElementById('form').elements;
    // var queryString = $('#rsvpForm').formSerialize();
    // var rsvpObject = {
    //     email: document.getElementById("email").nodeValue()
    // };
    // console.log(rsvpObject, 'triggered');
    alert(data + 'triggered');

    firebase.database().ref('subscription-entries').push().set(emailObject)
        .then(function (snapshot) {
            success(); // some success method
        }, function (error) {
            console.log('error' + error);
            error(); // some error method
        });
}

$("form").submit(function (event) {
    event.preventDefault();
    var gnames = $('#gnames').val();
    var email = $('#email').val();
    var count = $('#count').val();
    var message = $('#message').val();
    var date = Date().toLocaleString();

    firebase.database().ref('RSVP/').push().set({
        gnames: gnames,
        email: email,
        count: count,
        message: message,
        date: date,
    }).then(function (snapshot) {
        alert('Done! Thanks for your RSVP!')
    }, function (error) {
        alert('RSVP did not go through! Please refresh the page and try again.');
    });

    // console.log('ran!'+count+ email);
    // alert('tets');

});

// for new quetions
$(document).ready(function () {
    $("#faqForm").click(function (event) {
        event.preventDefault();
        var email = $('#email').val();
        var question = $('#question').val();
        var date = Date().toLocaleString();

        firebase.database().ref('Questions/').push().set({
            email: email,
            question: question,
            date: date,
        }).then(function (snapshot) {
            alert('We will get back to you with an answer as soon as we can!')
        }, function (error) {
            alert('Something went wrong! Please refresh the page and try again.');
        });

        // console.log('triggered!' + email);
        // alert('tets');
    });
});

// carousel speed
$('.carousel').carousel({
    interval: 3000
  })