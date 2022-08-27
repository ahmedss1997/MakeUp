
$('.carousel').carousel({
  interval: 2000
});

$(document).ready(function () {
  
  'use strict';
  
  $(window).scroll(function () {
    var navbar = $('.navbar');
    if ($(window).scrollTop() >= navbar.height()) {
      navbar.addClass('scrolled');
    } else {
      navbar.removeClass('scrolled');
    }
  });
  
  // Scroll To Home
  
  $('.navbar-collapse ul.nav li.active').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 2000);
  });
  
  // Scroll To about
  
  $('.navbar-collapse ul.nav li.about').click(function () {
    $('.navbar-collapse ul.nav li.about a').css({
      backgroundColor: "transparent"
    });
    $('html, body').animate({
      scrollTop: $('section.about').offset().top
    }, 2000);
  });
  
  // Scroll To story
  
  $('.navbar-collapse ul.nav li.story').click(function () {
    $('.navbar-collapse ul.nav li.story a').css({
      backgroundColor: "transparent"
    });
    $('html, body').animate({
      scrollTop: $('section.my-story').offset().top
    }, 2000);
  });
  
  // Scroll To Testimonials
  
  $('.navbar-collapse ul.nav li.testimonials').click(function () {
    $('.navbar-collapse ul.nav li.testimonials a').css({
      backgroundColor: "transparent"
    });
    $('html, body').animate({
      scrollTop: $('section.testimonials').offset().top
    }, 2000);
  });
  
  // Scroll To Comments
  
  $('.navbar-collapse ul.nav li.comments').click(function () {
    $('.navbar-collapse ul.nav li.comments a').css({
      backgroundColor: "transparent"
    });
    $('html, body').animate({
      scrollTop: $('section.comments').offset().top
    }, 2000);
  });
  
  // Scroll To contact
  
  $('.navbar-collapse ul.nav li.contact').click(function () {
    $('.navbar-collapse ul.nav li.contact a').css({
      backgroundColor: "transparent"
    });
    $('html, body').animate({
      scrollTop: $('section.contact-us').offset().top
    }, 2000);
  });
  
  // Scroll To Button
  
  var scrollButton = $("#scroll-top");
  
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 1100) {
      scrollButton.show();
    } else {
      scrollButton.hide();
    }
  });
  scrollButton.click(function () {
    $("html,body").animate({scrollTop: 0}, 2000);
  })
  
  // Loading Screen
  
  $(window).on('load', function () {
    "use strict";
    $('.loading h1').fadeOut(2000);
    $('.loading .sk-circle').fadeOut(2000, function () {
      $(this).parent().fadeOut(2000, function () {
        $("body").css({
          overflow: "auto",
          overflowX: "hidden",
        });
        $(this).remove();
      });
    });
  });

  // Slider

  $(window).on("load", function () {
    $("ul.Poll li h4.top-h, p.top-p").slideUp();
  });

  $("section.testimonials ul.Poll li input").on("click", function () {
    $("h4.top-h, p.top-p").slideDown();
  })

  $("section.testimonials ul.Poll li.up input").on("click", function () {
    $("h4.top-h, p.top-p").slideUp();
  })
  
    // Check opactiy Button
  
  function checkbuttons() {
    if ($('.main:first').hasClass('activee')) {
      $('.testimonials .btnn button.prevv').addClass('opactiy');
    } else {
      $('.testimonials .btnn button.prevv').removeClass('opactiy');
    }
    $('.main:last').hasClass('activee') ? $('.testimonials .btnn button.nextt').addClass('opactiy') : $('.testimonials .btnn button.nextt').removeClass('opactiy');
  }
  checkbuttons();

    // Move To Question
    
  $('.testimonials .main .btnn button').on("click", function () {
    if ($(this).hasClass('nextt')) {
      if ($('.testimonials .activee').next().is('.main')) {
        $('.testimonials .activee').fadeOut(500, function () {
          $(this).removeClass('activee').next('.main').addClass('activee').fadeIn(1000);
          checkbuttons();
        });
      } 
    } else {
      if ($('.testimonials .activee').prev().is('.main')) {
        $('.testimonials .activee').fadeOut(500, function () {
          $(this).removeClass('activee').prev('.main').addClass('activee').fadeIn(1000);
          checkbuttons();
        });
      }
    }
  });
});


/* ****  */



jQuery(document).ready(function($){
  var dragging = false,
      scrolling = false,
      resizing = false;
  //cache jQuery objects
  var imageComparisonContainers = $('.cd-image-container');
  //check if the .cd-image-container is in the viewport 
  //if yes, animate it
  checkPosition(imageComparisonContainers);
  $(window).on('scroll', function(){
      if( !scrolling) {
          scrolling =  true;
          ( !window.requestAnimationFrame )
              ? setTimeout(function(){checkPosition(imageComparisonContainers);}, 100)
              : requestAnimationFrame(function(){checkPosition(imageComparisonContainers);});
      }
  });
  
  //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
  imageComparisonContainers.each(function(){
      var actual = $(this);
      drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual, actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-image-label[data-type="modified"]'));
  });

  //upadate images label visibility
  $(window).on('resize', function(){
      if( !resizing) {
          resizing =  true;
          ( !window.requestAnimationFrame )
              ? setTimeout(function(){checkLabel(imageComparisonContainers);}, 100)
              : requestAnimationFrame(function(){checkLabel(imageComparisonContainers);});
      }
  });

  function checkPosition(container) {
      container.each(function(){
          var actualContainer = $(this);
          if( $(window).scrollTop() + $(window).height()*0.5 > actualContainer.offset().top) {
              actualContainer.addClass('is-visible');
          }
      });

      scrolling = false;
  }

  function checkLabel(container) {
      container.each(function(){
          var actual = $(this);
          updateLabel(actual.find('.cd-image-label[data-type="modified"]'), actual.find('.cd-resize-img'), 'left');
          updateLabel(actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-resize-img'), 'right');
      });

      resizing = false;
  }

  //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
  function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
      dragElement.on("mousedown vmousedown", function(e) {
          dragElement.addClass('draggable');
          resizeElement.addClass('resizable');

          var dragWidth = dragElement.outerWidth(),
              xPosition = dragElement.offset().left + dragWidth - e.pageX,
              containerOffset = container.offset().left,
              containerWidth = container.outerWidth(),
              minLeft = containerOffset + 10,
              maxLeft = containerOffset + containerWidth - dragWidth - 10;
          
          dragElement.parents().on("mousemove vmousemove", function(e) {
              if( !dragging) {
                  dragging =  true;
                  ( !window.requestAnimationFrame )
                      ? setTimeout(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);}, 100)
                      : requestAnimationFrame(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);});
              }
          }).on("mouseup vmouseup", function(e){
              dragElement.removeClass('draggable');
              resizeElement.removeClass('resizable');
          });
          e.preventDefault();
      }).on("mouseup vmouseup", function(e) {
          dragElement.removeClass('draggable');
          resizeElement.removeClass('resizable');
      });
  }

  function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
      var leftValue = e.pageX + xPosition - dragWidth;   
      //constrain the draggable element to move inside his container
      if(leftValue < minLeft ) {
          leftValue = minLeft;
      } else if ( leftValue > maxLeft) {
          leftValue = maxLeft;
      }

      var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
      
      $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
          $(this).removeClass('draggable');
          resizeElement.removeClass('resizable');
      });

      $('.resizable').css('width', widthValue); 

      updateLabel(labelResizeElement, resizeElement, 'left');
      updateLabel(labelContainer, resizeElement, 'right');
      dragging =  false;
  }

  function updateLabel(label, resizeElement, position) {
      if(position == 'left') {
          ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
      } else {
          ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
      }
  }
});jQuery(document).ready(function($){
    var dragging = false,
        scrolling = false,
        resizing = false;
    //cache jQuery objects
    var imageComparisonContainers = $('.cd-image-container');
    //check if the .cd-image-container is in the viewport 
    //if yes, animate it
    checkPosition(imageComparisonContainers);
    $(window).on('scroll', function(){
        if( !scrolling) {
            scrolling =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkPosition(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkPosition(imageComparisonContainers);});
        }
    });
    
    //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
    imageComparisonContainers.each(function(){
        var actual = $(this);
        drags(actual.find('.cd-handle'), actual.find('.cd-resize-img'), actual, actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-image-label[data-type="modified"]'));
    });

    //upadate images label visibility
    $(window).on('resize', function(){
        if( !resizing) {
            resizing =  true;
            ( !window.requestAnimationFrame )
                ? setTimeout(function(){checkLabel(imageComparisonContainers);}, 100)
                : requestAnimationFrame(function(){checkLabel(imageComparisonContainers);});
        }
    });

    function checkPosition(container) {
        container.each(function(){
            var actualContainer = $(this);
            if( $(window).scrollTop() + $(window).height()*0.5 > actualContainer.offset().top) {
                actualContainer.addClass('is-visible');
            }
        });

        scrolling = false;
    }

    function checkLabel(container) {
        container.each(function(){
            var actual = $(this);
            updateLabel(actual.find('.cd-image-label[data-type="modified"]'), actual.find('.cd-resize-img'), 'left');
            updateLabel(actual.find('.cd-image-label[data-type="original"]'), actual.find('.cd-resize-img'), 'right');
        });

        resizing = false;
    }

    //draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
    function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
        dragElement.on("mousedown vmousedown", function(e) {
            dragElement.addClass('draggable');
            resizeElement.addClass('resizable');

            var dragWidth = dragElement.outerWidth(),
                xPosition = dragElement.offset().left + dragWidth - e.pageX,
                containerOffset = container.offset().left,
                containerWidth = container.outerWidth(),
                minLeft = containerOffset + 10,
                maxLeft = containerOffset + containerWidth - dragWidth - 10;
            
            dragElement.parents().on("mousemove vmousemove", function(e) {
                if( !dragging) {
                    dragging =  true;
                    ( !window.requestAnimationFrame )
                        ? setTimeout(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);}, 100)
                        : requestAnimationFrame(function(){animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement);});
                }
            }).on("mouseup vmouseup", function(e){
                dragElement.removeClass('draggable');
                resizeElement.removeClass('resizable');
            });
            e.preventDefault();
        }).on("mouseup vmouseup", function(e) {
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
    }

    function animateDraggedHandle(e, xPosition, dragWidth, minLeft, maxLeft, containerOffset, containerWidth, resizeElement, labelContainer, labelResizeElement) {
        var leftValue = e.pageX + xPosition - dragWidth;   
        //constrain the draggable element to move inside his container
        if(leftValue < minLeft ) {
            leftValue = minLeft;
        } else if ( leftValue > maxLeft) {
            leftValue = maxLeft;
        }

        var widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
        
        $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
            $(this).removeClass('draggable');
            resizeElement.removeClass('resizable');
        });

        $('.resizable').css('width', widthValue); 

        updateLabel(labelResizeElement, resizeElement, 'left');
        updateLabel(labelContainer, resizeElement, 'right');
        dragging =  false;
    }

    function updateLabel(label, resizeElement, position) {
        if(position == 'left') {
            ( label.offset().left + label.outerWidth() < resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        } else {
            ( label.offset().left > resizeElement.offset().left + resizeElement.outerWidth() ) ? label.removeClass('is-hidden') : label.addClass('is-hidden') ;
        }
    }
});



