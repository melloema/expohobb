(function ($) {
  $(document).ready(function(){
    deplegableMenuEfects();
    initSocialNetworks();
    initPuginsForms();
    removePreviewImages();  
    initModals();
    //$.removeCookie('expohobby_revista');
    set_cookie(); 
  });

  function set_cookie(){
    if($.cookie('expohobby_revista')){
      $("a.ver-revista").click(function(){
        id = $(this).attr('id').split("_");
        window.location = "ver_revista.php?q="+id[1];
      });
    }else{
      registro_mail();
      $('.ver-revista').magnificPopup({
        type: 'inline',
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,   
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom',
        alignTop: true,
        fixedContentPos: true,
        callbacks: {
          close: function() {
            if($('#estado_registro').val() == 'fin'){
              location.reload();
            }
          }
        }
      });
    }
  }

  function registro_mail(){
    $('#btn_registrar_mail').click(function(){
      var mail = $('#registration_mail').val();
      $.ajax({
        type: "POST",
        url: "controllers.php",
        data: { registration_mail: mail }
      }).done(function( msg ) {
        if(msg == 'ok'){
          text = '<h3>Revista Expohobby</h3>';
          text += '<p>Gracais Por registrarse, ya puede acceder nuestros contenidos</p>';
          text += '<input type="hidden" id="estado_registro" value="fin" />';
          text += '<button title="Close (Esc)" type="button" class="mfp-close">×</button></div>';
          $('div#modal_registration').html(text);
          $.cookie('expohobby_revista', mail);
        }
      });
    });
  }

  function removePreviewImages(){
    $('#small_image_marquee').change(function (){ 
      $('#preview_small_image').remove();
    });
    $('#big_image_marquee').change(function (){ 
      $('#preview_big_image').remove();
    });
    $('#image_revista').change(function (){ 
     $('#preview_image').remove();
    });
  }

  function initPuginsForms(){
    $('#type_marquee').change(function(){
      if($(this).val() == 'imagen'){
        var newHTML = '<label>Imagen Grande</label><input id="big_image" type="file" name="big_image" required="required" class="input_file_marquee input_file" />';
        $('#wrapper_type_marquee').html(newHTML);
      }else if($(this).val() == 'video'){
        var newHTML = '<label>URL del Video</label><input id="big_image" name="big_image" type="text" required="required" class="input_text_revista input_text" />';
        $('#wrapper_type_marquee').html(newHTML);
      }
    });
    $(function() {
      $("#edicion").datepicker();
      $("#edicion").datepicker( "option", "dateFormat", "yy-mm-dd");
    });
  }

  function deplegableMenuEfects(){
    $('.deplegablemenu').hide();
    $("nav a").click(function(){
      $("nav a").removeClass('select');
      $(this).addClass('select');
      $('.deplegablemenu').hide();
    });
    $("a[title='Exposiciones']").click(function(){
      $('.deplegablemenu').show();
    });
    $(".deplegablemenu").mouseleave(function(){
      $('.deplegablemenu').hide();
      $("nav a").removeClass('select');
    });
  }

  function initSocialNetworks(){
    $('#redes-sociales a').fadeTo('slow', 0.5);
    $('#redes-sociales a').hover(function() {
      $(this).fadeTo('slow', 1.0);
    }, function() {
      $(this).fadeTo('slow', 0.5);
    });
  }

  function initModals(){
    $('.eliminar_marquee').magnificPopup({
      type: 'inline',
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,   
      midClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      alignTop: true,
      fixedContentPos: true
    });

    $('.eliminar_revista').magnificPopup({
      type: 'inline',
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,   
      midClick: true,
      removalDelay: 300,
      mainClass: 'my-mfp-slide-bottom',
      alignTop: true,
      fixedContentPos: true
    });

    $('#btn_cancelar').live('click',function(){
      $.magnificPopup.close();
    });
  }
})(jQuery);