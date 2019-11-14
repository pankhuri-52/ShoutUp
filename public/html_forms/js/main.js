(function($) {

  $('#state').parent().append('<ul class="list-item" id="newstate" name="state"></ul>');
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
// (function($) {

//   $('#gender').parent().append('<ul class="list-item" id="newgender" name="gender"></ul>');
//   $('#gender option').each(function(){
//       $('#newgender').append('<li value="' + $(this).val() + '">'+$(this).text()+'</li>');
//   });
//   $('#gender').remove();
//   $('#newgender').attr('id', 'gender');
//   $('#gender li').first().addClass('init');
//   $("#gender").on("click", ".init", function() {
//       $(this).closest("#gender").children('li:not(.init)').toggle();
//   });
  
//   var allOptions = $("#gender").children('li:not(.init)');
//   $("#gender").on("click", "li:not(.init)", function() {
//       allOptions.removeClass('selected');
//       $(this).addClass('selected');
//       $("#gender").children('.init').html($(this).html());
//       allOptions.toggle();
//   });

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
        first_name : {
            required: true,
        },
        last_name : {
            required: true,
        },
        company : {
            required: true
        },
        email : {
            required: true,
            email : true
        },
        phone_number : {
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