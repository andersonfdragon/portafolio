// Anclas ID suavizadas
$(document).on('click', 'a[href*=\\#]:not([href=\\#])', function (e) {
  e.preventDefault();
  $('html, body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top
  }, 400, 'linear');
});

//BARRA DE CARGA SCROLL
window.onscroll = function() { myFunction() };

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar-xs").style.width = scrolled + "%";
}

// Collpse menu contacto agil
$('.collapsar-menu-agil').click(function () {
  $("#menu-contacto-web").collapse('hide')
})

// Collpse menu contacto agil
$('.collapsar-menu-agil-xs').click(function () {
  $("#navbarContactoAgilMobile").collapse('hide')
})


$('#telephone').on('input', function () { 
  this.value = this.value.replace(/[^0-9]/g,'');
});


/* TRANSICION DE CONTENIDO */
$('.interaction-portafolio-web').click(function () {
  // console.log('Click portafolio')
  $("#content-portafolio").insertAfter("#content-index");

  $('#content-index').removeClass('transition-left transition-intro')
  $('#content-index').addClass('transition-left')

  $('#content-portafolio').removeClass('d-none transition-intro')
  $('#content-portafolio').addClass('transition-intro')  
  setTimeout(function(){ 
    $('#content-index').addClass('d-none')
    $('#content-index').removeClass('transition-left transition-intro')
  }, 750);

})

$('.interaction-inicio-web').click(function () {
  // console.log('Click inicio')
  $("#content-index").insertAfter("#content-portafolio");

  $('#content-portafolio').removeClass('transition-right transition-intro')
  $('#content-portafolio').addClass('transition-right')

  $('#content-index').removeClass('d-none transition-intro')
  $('#content-index').addClass('transition-intro')  
  setTimeout(function(){ 
    $('#content-portafolio').addClass('d-none')
    $('#content-portafolio').removeClass('transition-right transition-intro')
  }, 750);
})




//FORMULARIO DE CONTACTO - ENVIAR DESDE FORMULARIO CONTACTO PC
$("#contactForm").validator().on("submit", function (event) {
  var valido_form_01 = 0;

  if (event.isDefaultPrevented("Complete este campo")) {
      // handle the invalid form...
      submitMSG(false, "Complete los campos que faltan.");
  } else {
      event.preventDefault();
      submitMSG(true, "");
      valido_form_01 = 1;
  }

  if ((valido_form_01) === 1) {
      event.preventDefault();
      submitMSG(true, "");
      $("#form-submit").prop("disabled", true);
      submitForm();
  }
  else {
      submitMSG(false, "Completa los campos que faltan");
  }
});


function submitMSG(valid, msg){
  if(valid){
      var msgClasses = "h4 text-center text-success";
  } else {
      var msgClasses = "h4 text-center";
  }
  $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}

function formSuccess(){
  $("#contactForm")[0].reset();
  submitMSG(true, "Gracias por dejar sus datos, pronto estaremos en contacto.")
}

function submitForm(){
  // Initiate Variables With Form Content
  var first_name = $("#first_name").val();
  var email = $("#email").val();
  var telephone = $("#telephone").val();
  var mensaje = $("#mensaje").val();
  
  $.ajax({
      type: "POST",
      url:  "php/process_formulario_portafolio.php",
      data: "first_name=" + first_name +
            "&email=" + email +
            "&telephone=" + telephone +
            "&mensaje=" + mensaje,
            
      success: function(text){
          if (text == "success"){
              formSuccess();
              // window.location.href = "mensaje-enviado-portafolio.html";
          } else {
              submitMSG(false,text);
          }
      }
  });
}
