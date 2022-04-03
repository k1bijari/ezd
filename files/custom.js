
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
    // var count = $('#count').val();
    var message = $('#message').val();
    var date = Date().toLocaleString();

    firebase.database().ref('RSVP/').push().set({
        gnames: gnames,
        email: email,
        // count: count,
        message: message,
        date: date,
    }).then(function (snapshot) {
        alert('Done! Thanks for your RSVP!')
    }, function (error) {
        alert('RSVP did not go through! Please refresh the page and try again.');
    });

    // console.log('ran!'+count+ email);

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

// for new quetions
function read_names(){
    return new Promise(resolve => {
        var guests = document.getElementsByName('guests[]'); 
        var foodChoice = document.getElementsByName('foodChoice[]');
        var guest_choice = "";
        for (var i = 0; i<guests.length; i++){
            guest_choice += guests[i].value + "-" + foodChoice[i].value;
        }
        setTimeout(() => resolve(guest_choice), 500)
    })
}

$(document).ready(function () {
    $("#foodSubmit").click(async function (event) {
        event.preventDefault();
        var date = Date().toLocaleString();
        var email = $('#email').val();

        try {
            let guest_choice = await read_names();
            console.log('triggered!' + guest_choice);
        } catch(error){
            alert("We could not save your request! Please refresh the page and try again later!"+error);
        }

        // firebase.database().ref('Questions/').push().set({
        //     email: email,
        //     question: question,
        //     date: date,
        // }).then(function (snapshot) {
        //     alert('We will get back to you with an answer as soon as we can!')
        // }, function (error) {
        //     alert('Something went wrong! Please refresh the page and try again.');
        // });

        // alert('tets');
    });
});

// carousel speed
$('.carousel').carousel({
    interval: 3000
  })


// food menu - adding new guest
var party = 1;
function guest_fields() {
 
    party++;
    var objTo = document.getElementById('new_guest_name')
    var divtest = document.createElement("div");
	divtest.setAttribute("class", "form-group removeclass"+party);
	var rdiv = 'removeclass'+party;
    divtest.innerHTML = '<div class="form-group"> <div class="row"> <div class="col-6"> <input type="text" class="form-control form-control-lg" id="gname1" placeholder="Guest name" required> </div> <div class="col-6"> <!-- <label for="exampleFormControlSelect1">Example select</label> --> <div class="input-group"> <select class="form-control form-control-lg" id="foodid" name="foodChoice"> <option>Please select a meal choice</option> <option>Option 1</option> <option>Option 2</option> <option>Option 3</option> <option>Option 4</option> <option>Kid\'s</option> </select> <div class="input-group-append"> <button title="Delete" class="btn btn-warning btn-lg" type="button" onclick="remove_guest_fields('+ party +');">-</button> </div> </div> </div> </div> </div>';
    
    objTo.appendChild(divtest)
}
   function remove_guest_fields(rid) {
	   $('.removeclass'+rid).remove();
   }