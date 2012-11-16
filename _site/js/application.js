// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash; 
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'); // cut the URL string down to just everything after the ?, split this into an array with information like this: array [0] = "var=xxx"; array [1] = "var2=yyy";

   //loop through each item in that array
    for(var i = 0; i < hashes.length; i++)
    {
        //split the item at the "="
        hash = hashes[i].split('=');

        //put the value name of the first variable into the "vars" array
        vars.push(hash[0]);

        //assign the value to the variable name, now you can access it like this:
        // alert(vars["var1"]); //alerts the value of the var1 variable from the url string
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(document).ready(function() {

  // determine videos for home and solutions pages displayed in a modal
  var videos = ['0bymXYUYmwE','QptCT672CAc','KHXuQt6HMbA', '_Ql_Zwodirc'];
  var video_code;

  // check if data-video-num (only defined on solutions pages)
  if ($('#video_image').attr("data-video-num")) {
    video_code = videos[$('#video_image').attr("data-video-num")];
  } else {
    // randomly load homepage video and image
    var rand = Math.floor(Math.random()*3);
    var featured_video_img = 'homeVideo' + rand + '.png';
    video_code = videos[rand];
    $('#video_image').attr("src","/img/" + featured_video_img);
  }

  var video_iframe = _.template('<iframe width="560" height="315" src="http://www.youtube.com/embed/<%= video_code %>?rel=0&wmode=transparent" frameborder="0" allowfullscreen></iframe>', { video_code: video_code });
  $('#VideoModal .modal-body').html(video_iframe);
  

  // initialize carousel on homepage
  $('.dropdown-toggle').dropdown();
  $('.carousel').carousel({
    interval: 7000
  });

  // Add/Remove open class to top nav dropdown li
  $('li.dropdown').hover(
    function () {
      $(this).addClass("open");
    },
    function () {
      $(this).removeClass("open");
    }
  );

  // add page to tellMeMore url
  if ($('#tellMeMore')) {
    $('#tellMeMore').attr('href', $('#tellMeMore').attr('href') + '?page=' + document.URL.split('/').pop());
  }

  // page tracking for tell me more form
  $('#tellMeMoreForm [name=website]').val(getUrlVars().page);

  // Add active class to left nav
  $('.left_nav li a[href*="' + location.pathname + '"]').addClass('active');

  $('#tellMeMoreForm, #requestDemoForm').validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        first_name: {
          minlength: 2,
          required: true
        },
        last_name: {
          minlength: 2,
          required: true
        },
        phone: {
          minlength: 2,
          required: true
        },
        company: {
          minlength: 2,
          required: true
        }
      },
      highlight: function(label) {
        $(label).closest('.control-group').addClass('error');
      },
      success: function(label) {
        label.closest('.control-group').removeClass('error');
      }
  });

});

