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

  $('#tellMeMoreForm [name=website]').val(getUrlVars().page);

  // Add active class to left nav
  $('.left_nav li a[href$="/' + location.pathname.split("/").pop() + '"]').addClass('active');
});

