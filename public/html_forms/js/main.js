(function($) {

  $('#state').parent().append('<ul class="list-item" id="newstate"></ul>');
  $('#state option').each(function(){
      $('#newstate').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
  });
  $('#state').remove();
  $('#newstate').attr('id', 'state');
  $('#state li').first().addClass('init');
  $("#state").on("click", ".init", function() {
      $(this).closest("#state").children('li:not(.init)').toggle();
  });
  
  var allOptions = $("#state").children('li:not(.init)');
  $("#state").on("click", "li:not(.init)", function() {
      allOptions.removeClass('selected');
      $(this).addClass('selected');
      $("#state").children('.init').html($(this).html());
      allOptions.toggle();
  });

  var marginSlider = document.getElementById('slider-margin');
  if (marginSlider != undefined) {
      noUiSlider.create(marginSlider, {
            start: [500],
            step: 10,
            connect: [true, false],
            tooltips: [true],
            range: {
                'min': 0,
                'max': 1000
            },
            format: wNumb({
                decimals: 0,
                thousand: ',',
                prefix: '$ ',
            })
    });
  }
  $('#reset').on('click', function(){
      $('#register-form').reset();
  });

  $('#register-form').validate({
    rules : {
        victim_name : {
            required: true,
        },
        age : {
            required: true,
        },
        contactno : {
            required: true,
        },
        address : {
            required: true
        },
        email : {
            required: true,
            email : true
        },
        description : {
            required: true,
        },
        criminalName : {
            required: true,
        },
        rfName : {
            required: true,
        },
        victim_number : {
            required: true,
        },
        nGOName : {
            required: true,
        },
        filingPersonName : {
            required: true,
        },
        experience : {
            required: true,
        }
    },
    onfocusout: function(element) {
        $(element).valid();
    },
});

    jQuery.extend(jQuery.validator.messages, {
        required: "",
        remote: "",
        email: "",
        url: "",
        date: "",
        dateISO: "",
        number: "",
        digits: "",
        creditcard: "",
        equalTo: ""
    });
})(jQuery);

function validate() {
    var x=document.myform.email.value;  
    var atposition=x.indexOf("@");  
    var dotposition=x.lastIndexOf(".");
    // name validation
    if( document.myform.fname.value == "" ) {
       alert( "Please provide your name!" );
       document.myform.fname.focus() ;
       return false;
    }

      //gender field
      if ( ( document.myform.gender1.checked == false ) && ( document.myform.gender2.checked == false ) &&
      (document.myform.gender3.checked == false) ){
        alert("Please select any gender!");
        return false;
    }

     //age validation
     var ageno=document.myform.age.value;  
     if (isNaN(ageno) || ageno.length>2 || ageno == ""){  
     alert("Please enter a valid age!");
     document.myform.age.focus();
     return false;  
     }

     //phone number validation
    var num=document.myform.contactno.value;  
    if (isNaN(num) || num.length>10 || num == ""){  
    alert("Please enter a valid contact number!");
    document.myform.contactno.focus();
    return false;  
    }

    //email validation
    if( atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length || x=="" ) {
        alert( "Please enter a valid email address!" );
        document.myform.email.focus() ;
        return false;
     }

     //issue facing validation
     if ( ( document.myform.issueFacing[0].checked == false ) && ( document.myform.issueFacing[1].checked == false ) &&
         (document.myform.issueFacing[2].checked == false) ){
           alert("Please select the issue you are facing!");
           return false;
       }
      
       //abuse status validation
    if ( ( document.myform.abuse_status[0].checked == false ) && ( document.myform.abuse_status[1].checked == false )){
         alert("Please tell us the status of abuse!");
         return false;
       }

       //extent of abuse validation
       if ( ( document.myform.extent_abuse[0].checked == false ) && ( document.myform.extent_abuse[1].checked == false ) &&
         (document.myform.extent_abuse[2].checked == false) ){
           alert("Please tell us the extent of abuse!");
           return false;
       }

       //relation with abuse validation
       if ( ( document.myform.relationWithCriminal[0].checked == false ) && ( document.myform.relationWithCriminal[1].checked == false ) &&
       (document.myform.relationWithCriminal[2].checked == false) ){
         alert("Please tell us your relation with the criminal!");
         return false;
     }
 }

 function validateRF() {
      // name validation
    if( document.myform.fname.value == "" ) {
        alert( "Please provide your name!" );
        document.myform.fname.focus() ;
        return false;
     }

      //age validation
      var ageno=document.myform.age.value;  
      if (isNaN(ageno) || ageno.length>2 || ageno == ""){  
      alert("Please enter a valid age!");
      document.myform.age.focus();
      return false;  
      }

       //phone number validation
        var num=document.myform.contactno.value;  
        if (isNaN(num) || num.length>10 || num == ""){  
        alert("Please enter a valid contact number!");
        document.myform.contactno.focus();
        return false;  
        }

        var x=document.myform.email.value;  
        var atposition=x.indexOf("@");  
        var dotposition=x.lastIndexOf(".");
        //email validation
    if( atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length || x=="" ) {
        alert( "Please enter a valid email address!" );
        document.myform.email.focus() ;
        return false;
     }

     //victim name validation
        if( document.myform.victim_name.value == "" ) {
            alert( "Please provide your victim's full name!" );
            document.myform.victim_name.focus() ;
            return false;
         }

     //victim's phone number validation
        var vnum=document.myform.victim_number.value;  
        if (isNaN(vnum) || vnum.length>10 || vnum == ""){  
        alert("Please enter a valid contact number of victim!");
        document.myform.victim_number.focus();
        return false;  
        }

    //relationship with the victim
     if ( ( document.myform.relationshipWithVictim[0].checked == false ) && ( document.myform.relationshipWithVictim[1].checked == false ) &&
     (document.myform.relationshipWithVictim[2].checked == false) ){
       alert("Please tell us your relation with the victim!");
       return false;
   }
    
 }