const settings = {
  async: true,
  crossDomain: true,
  url: "https://type.fit/api/quotes/?_limit=1",
  method: "GET",
};

var quotesData;
var randomQuote;

$(document).ready(function () {
  $.ajax(settings).done(function (response) {
    const data = JSON.parse(response);
    quotesData = data;
    console.log(quotesData);

    randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];

    $("#text")
      .find("h1")
      .text(() => {
        return randomQuote.text;
      });

    $("p", "#author").text(() => {
      return randomQuote.author;
    });
  });

  $("#new-quote").on("click", () => {
    $.ajax(settings).done(function (response) {
      const data = JSON.parse(response);
      quotesData = data;

      randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
      $("#text")
        .find("h1")
        .text(() => {
          return randomQuote.text;
        });

      $("p", "#author").text(() => {
        return randomQuote.author;
      });
    });
  });

  $("#tweet-quote").on("click", function () {
    console.log("Tweet");
  });
});
