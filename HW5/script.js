document.addEventListener("DOMContentLoaded", () => {
  let answerButton = document.getElementById("getResult");

  answerButton.addEventListener('click', function (e) {
    let words = document.getElementById('someText').value.split(' ');
    var map = words.reduce(function (acc, el) {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {});

    let result = '';
    for (var key in map) {
      if (key.length < 2) continue;
      result += '<p>' + key + ' : ' + map[key] + '</p>';
    }
    document.getElementById('answer').innerHTML = result;
  }, false);

}); 
