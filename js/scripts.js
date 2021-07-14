// Change Icon Menu - Hamburguesa XS
$("#btn-menu-xs").click(function () {
  if ($("#navbarMenuPrincipal").hasClass("show")){
    $('#icon-menu-drop').removeClass("fa-times")
    $('#icon-menu-drop').addClass("fa-bars")
  }
  else{
    $('#icon-menu-drop').removeClass("fa-bars")
    $('#icon-menu-drop').addClass("fa-times")
  }
});

$("#btn-menu-portafolio-xs").click(function () {
  if ($("#navbarContactoAgilMobile").hasClass("show")){
    $('#icon-menu-agil-drop').removeClass("fa-chevron-down")
    $('#icon-menu-agil-drop').addClass("fa-chevron-up")
  }
  else{
    $('#icon-menu-agil-drop').removeClass("fa-chevron-up")
    $('#icon-menu-agil-drop').addClass("fa-chevron-down")
  }
});

// Scripts transition ID scroll
$("#ancla-nav").on('click', function() {
  if ($("#navbarMenuPrincipal").hasClass("show")){
    $('#icon-menu-drop').removeClass("fa-times")
    $('#icon-menu-drop').addClass("fa-bars")
  }
  else{
    $('#icon-menu-drop').removeClass("fa-bars")
    $('#icon-menu-drop').addClass("fa-times")
  }
  $('html, body').stop().animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 400, 'linear');
  $("#navbarMenuPrincipal").collapse('hide')
});

$("#click-ancla-main-index").on('click', function() {
  $('html, body').stop().animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 400, 'linear');
});
$("#click-ancla-main-index-xs").on('click', function() {
  $('html, body').stop().animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 400, 'linear');
});


// Scripts accordions portfolio version mobile - Scroll transition
$(".btn-accordion-portafolio").on('click', function(event) {
  let eventTarget = $(event.target)
  // console.log(eventTarget)
  collapseAccordionsMobile(eventTarget)
});

function collapseAccordionsMobile(target) {
  $('#collapsePortafolio-01, #collapsePortafolio-02, #collapsePortafolio-03, #collapsePortafolio-04, #collapsePortafolio-05, #collapsePortafolio-06, #collapsePortafolio-07, #collapsePortafolio-08, #collapsePortafolio-09, #collapsePortafolio-10, #collapsePortafolio-11').on('shown.bs.collapse', function () {
    $('html, body').stop().animate({
      scrollTop: $(target).offset().top
    }, 400, 'linear');
  });
  $('#collapsePortafolio-01, #collapsePortafolio-02, #collapsePortafolio-03, #collapsePortafolio-04, #collapsePortafolio-05, #collapsePortafolio-06, #collapsePortafolio-07, #collapsePortafolio-08, #collapsePortafolio-09, #collapsePortafolio-10, #collapsePortafolio-11').on('hidden.bs.collapse', function () {
    $('html, body').stop().animate({
      scrollTop: $(target).offset().top
    }, 400, 'linear');
  });
}

//BARRA DE CARGA SCROLL
window.onscroll = function() { scrollBarFunction() };

function scrollBarFunction() {
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


// SCRIPTS ACCORDIONS
$( '#headingPortafolio-01' ).click(function() {
  $('#icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-01").hasClass('show')) {
    $('#icon-accordion-portafolio-01').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-01').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-01').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-01').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-02' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-02").hasClass('show')) {
    $('#icon-accordion-portafolio-02').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-02').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-02').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-02').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-03' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-03").hasClass('show')) {
    $('#icon-accordion-portafolio-03').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-03').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-03').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-03').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-04' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-04").hasClass('show')) {
    $('#icon-accordion-portafolio-04').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-04').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-04').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-04').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-05' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-05").hasClass('show')) {
    $('#icon-accordion-portafolio-05').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-05').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-05').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-05').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-06' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-06").hasClass('show')) {
    $('#icon-accordion-portafolio-06').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-06').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-06').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-06').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-07' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-07").hasClass('show')) {
    $('#icon-accordion-portafolio-07').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-07').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-07').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-07').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-08' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-08").hasClass('show')) {
    $('#icon-accordion-portafolio-08').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-08').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-08').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-08').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-09' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-10, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-09").hasClass('show')) {
    $('#icon-accordion-portafolio-09').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-09').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-09').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-09').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-10' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-11').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-11').addClass('fa-chevron-up')

  if($("#collapsePortafolio-10").hasClass('show')) {
    $('#icon-accordion-portafolio-10').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-10').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-10').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-10').addClass('fa-chevron-down')
  }
})

$( '#headingPortafolio-11' ).click(function() {
  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10').removeClass('fa-chevron-down')

  $('#icon-accordion-portafolio-01, #icon-accordion-portafolio-02, #icon-accordion-portafolio-03, #icon-accordion-portafolio-04, #icon-accordion-portafolio-05, #icon-accordion-portafolio-06, #icon-accordion-portafolio-07, #icon-accordion-portafolio-08, #icon-accordion-portafolio-09, #icon-accordion-portafolio-10').addClass('fa-chevron-up')

  if($("#collapsePortafolio-11").hasClass('show')) {
    $('#icon-accordion-portafolio-11').removeClass('fa-chevron-down')
    $('#icon-accordion-portafolio-11').addClass('fa-chevron-up')
  } else{
    $('#icon-accordion-portafolio-11').removeClass('fa-chevron-up')
    $('#icon-accordion-portafolio-11').addClass('fa-chevron-down')
  }
})