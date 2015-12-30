var Anderson;

Anderson = (function() {
  var getIdade, idade;

  function Anderson() {
    console.log("Programmer");
  }

  idade = 22;

  getIdade = function() {
    return console.log(idade + " é uma boa idade.");
  };

  return Anderson;

})();
