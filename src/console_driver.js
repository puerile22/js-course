var numToChar = ["a", "b", "c", "d", "e", "f", "g", "h"];
var charToNum = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
}

var displayBoard = function () {
  var column = [0, 1, 2, 3, 4, 5, 6, 7];
  console.log("  | " + column.join("   "));
  console.log("-----------------------------------");
  for (var i = 0; i < board.length; i++) {
    var k = numToChar[i]; 
    console.log(numToChar[i] + " |" + board[i].join(" "));
    for (var j = 0; j < board.length; j++) {
      if (board[i][j] === 'wht') {
        $('.col-'+j+'','.row-'+k+'').children().attr('class','piece wht');
      } else if (board[i][j] === 'red') {
        $('.col-'+j+'','.row-'+k+'').children().attr('class','piece red');
      } else if (board[i][j] === ' X ') {
        $('.col-'+j+'','.row-'+k+'').children().attr('class','piece');
      } else if (board[i][j] === 'wht-king') {
        $('.col-'+j+'','.row-'+k+'').children().attr('class','piece wht-king');
      } else if (board[i][j] === 'red-king') {
        $('.col-'+j+'','.row-'+k+'').children().attr('class','piece red-king');
      }
    } 
  }
};

