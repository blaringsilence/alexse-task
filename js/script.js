// Chose to make several instances of vue then later found out I could've made 1 for the whole body
$('[title]').qtip({
 	style:{
 		classes: 'qtip-tipsy'
 	}
 }); //TOOLTIPS
//FOR THE REGULAR PAGE
var profilevm = new Vue({
	el: '#profile',
	data: {
		name: 'Mariam',
		picture: 'img/puppy.jpg',
		email: 'mariam@maarouf.me',
		department: 'Software Engineering',
		semester: '7',
		password: 'happy',
		id: '2361'
	}
});

var subjectvm = new Vue({
	el: '#subject-container',
	data: {
		subjects: [
		{name: 'Database Systems', url: '#database'},
		{name: 'Computer Networks', url: '#networks'},
		{name: 'Numerical Analysis', url: '#numerical'},
		{name: 'Microprocessors', url: '#micro'},
		{name: 'Analog Communications', url: '#analog'}
		]
	}
});

//FOR THE MODALS
var changePicvm = new Vue({
	el: '#changePic',
	methods: {
		changeImage: function(e){
			e.preventDefault();
			//first, validate
			var imgURL = /.*\.(jpg|jpeg|png|gif)$/;
			var inputURL = $('#profilepicURL').val();
			if(imgURL.test(inputURL)){
				profilevm.picture = inputURL;
				$('#changePic').modal('toggle');
			}
			else{
				alert("Invalid picture!");
			}
		}
	}
});

var changePWvm = new Vue({
	el: '#changePW',
	methods: {
		changePassword: function(e){
			e.preventDefault();
			//first validate old password
			var old = $('#oldpassword').val();
			if(old == profilevm.password){ //Insert actual validation against hashed password here (or you know, at the server)
				var new1 = $('#newpassword1').val();
				var new2 = $('#newpassword2').val();
				if(new1 == new2){
					profilevm.password = new1; //Insert actual function here to reset password
					$('#oldpassword').val('');
					$('#newpassword1').val('');
					$('#newpassword2').val('');
					$('#changePW').modal('toggle');
				}
				else
					alert("New password doesn't match!");
			}
			else
				alert("The old password isn't correct!");
		}
	}
});

var changeIDvm = new Vue({
	el: '#changeID',
	data: {
		id: profilevm.$data.id
	},
	methods: {
		changeID: function(e){
			e.preventDefault();
			var num = /^\d+$/;
			var id = $('#sspidtext').val();
			if(num.test(id)){
				profilevm.id = id;
				$('#changeID').modal('toggle');
			}
			else
				alert("This is not a valid ID!");
		}
	}
});

//EDITABLE (using jeditable.js)
 $('.profile-name').editable(function(value, settings) {
 	if(value==""){return profilevm.name;}
     else{profilevm.name = value; //and change in db
     return value;}
  }, {
     type    : 'text',
     //width: 300,
     style: 'display: inline;',
     onblur: 'submit'
 });


 $('.profile-email small').editable(function(value, settings) {
 	if(value=="") {return profilevm.email;}
 		else{
 	var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|me|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
 	if(emailRegex.test(value)){
 		profilevm.email = value; //and change in db
     	return value;	
 	}
 	else {
 		alert("This is not a valid email!");
 		return profilevm.email;
 	}
 }
     
  }, {
     type    : 'text',
     //width: 400,
     style: 'display: inline;',
     onblur: 'submit'
 });


