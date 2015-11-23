function returnRand(min, max) {
  return Math.floor(Math.random() * (1 + max - min) + min);
}

function populatePeople(data, current) {

  var peopleSource = $('#people-template').html();
  var peopleTemplate = Handlebars.compile(peopleSource);

  var prev = 0;
  var next = 0;

  if (current === 0) {
    prev = data.length - 1;
  } else {
    prev = current - 1;
  }

  if (current === data.length - 1) {
    next = 0;
  } else {
    next = current + 1;
  }

  var peopleContext = {
    prevFirstName: data[prev].firstName,
    prevLastName: data[prev].lastName,
    firstName: data[current].firstName,
    lastName: data[current].lastName,
    NextFirstName: data[next].firstName,
    NextLastName: data[next].lastName,
  };

  var peopleHtml = peopleTemplate(peopleContext);

  $('#peopleHook').fadeOut('slow', function() {
    $('#peopleHook').delay(1000).html(peopleHtml);
  });

  $('#peopleHook').fadeIn();
}

function populateMovies(data, current) {
  var movieSource = $('#movie-template').html();
  var movieTemplate = Handlebars.compile(movieSource);

  var movieHtml = movieTemplate(data[current]);

  $('#movieHook').fadeOut('slow', function() {
    $('#movieHook').delay(1000).html(movieHtml);
  });

  $('#movieHook').fadeIn();
}

function populate(data, current) {
  populatePeople(data, current);
  populateMovies(data, current);
}

$(function() {

  $.ajax({
    url:'/data/eta.json',
  }) .done(function(json) {

    var timer = 10000;
    var data = json.eta;
    var current = returnRand(0, data.length - 1);

    populate(data, current);

    $('body').on('click', '.previous', function() {
      if (current === 0) {
        current = 20;
      } else {
        current--;
      }

      populate(data, current);
      timer = 10000;
    });

    $('body').on('click', '.next', function() {
      if (current === 20) {
        current = 0;
      } else {
        current++;
      }

      populate(data, current);
      timer = 10000;
    });

    setInterval(function() {
      $('.next').delay(timer).click();

    }, timer);

  });

});
