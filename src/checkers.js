var board, currentPlayer,move,input,webrow1,webcol1,webrow2,webcol2;
var clicks = 0;

var resetBoard = function () {
  board = [
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    ['wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X '],
    [' X ', 'wht', ' X ', 'wht', ' X ', 'wht', ' X ', 'wht'],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X '],
    [' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ', 'red'],
    ['red', ' X ', 'red', ' X ', 'red', ' X ', 'red', ' X ']
  ];
   board = [
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', 'red', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', 'wht', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ']
  ];

  currentPlayer = 'wht'
};

var clearBoard = function() {
  board = [
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X '],
    [' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ', ' X ']
  ];
}
var getMove = function() {
  console.log(currentPlayer+" it's your move!");
  var start = prompt('Please input the starting coordinate, seprate by comma, please input quit if you want to stop playing.');
  var end = prompt('Please input the ending coordinate, separate by comma, please input quit if you want to stop playing.');
  if (start==='quit' || end==='quit') {
    return 'quit';
  }
  input = {
    startRow: (start.split(",")[0]).charCodeAt()-97,
    startCol: parseInt(start.split(",")[1]),
    endRow: (end.split(",")[0]).charCodeAt()-97,
    endCol: parseInt(end.split(",")[1])
  };
  if (input.startRow>=0 && input.startRow<=7 && input.startCol>=0 && input.startCol<=7 && input.endCol>=0 && input.endCol<=7 && input.endRow>=0 && input.endRow<=7) {
    return input;
  } else {
    $(document).trigger('invalidMove');
    getMove();
  }
};

var getAnotherMove = function(row,col,r,c) {
  var row2 = r.charCodeAt()-97;
  var col2 = parseInt(c);
  var row = row.charCodeAt()-97;
  var col = parseInt(col);
  input = {
    startRow: row,
    startCol: col,
    endRow: row2,
    endCol: col2
  };
  if (currentPlayer === 'wht' && col2>col) {
    if (board[row+1][col+1] !== 'red' || col2 !== col+2) {
      $(document).trigger('invalidMove');
      getAnotherMove(row,col);
    }
  } else if (currentPlayer === 'wht' && col2<col) {
    if (board[row+1][col-1] !== 'red' || col2 !== col-2) {
      $(document).trigger('invalidMove');
      getAnotherMove(row,col);
    }
  } else if (currentPlayer === 'red' && col2<col) {
    if (board[row-1][col-1] !== 'wht' || col2 !== col-2) {
      $(document).trigger('invalidMove');
      getAnotherMove(row,col);
    }
  } else if (currentPlayer === 'red' && col2>col) {
    if (board[row-1][col+1] !== 'wht' || col2 !== col+2) {
      $(document).trigger('invalidMove');
      getAnotherMove(row,col);
    } 
  }
  return input;
};

var attemptMove = function(input) {
  if (input === 'quit') {
    clearBoard();
    return console.log('Hahaha!');
  }
  if (checkJump()) {
    if (Math.abs(input.endRow-input.startRow) === 2 && Math.abs(input.startCol-input.endCol) === 2) {
    } else {
      $(document).trigger('invalidMove');
      return console.log(currentPlayer+' you have to make a capture!');
    }
  }
  if (currentPlayer === 'wht') {
    if (board[input.startRow][input.startCol] === 'wht' && board[input.endRow][input.endCol] === ' X ') {
      if (input.endRow-input.startRow === 1 && Math.abs(input.startCol-input.endCol) === 1) { 
        makeMove(input);
        currentPlayer = changePlayer(currentPlayer);
        $('.invalid').text(""+currentPlayer+" it's your move!");
      } else if (input.endRow-input.startRow === 2 && Math.abs(input.startCol-input.endCol) === 2) {
        if (input.startCol>input.endCol && board[input.startRow+1][input.startCol-1] === 'red') {
          $(document).trigger('pieceTaken');
          removePiece(input.startRow+1,input.startCol-1);
          makeMove(input);
          if (checkAvailable(input.endRow,input.endCol)!==true) {
            currentPlayer = changePlayer(currentPlayer);
            $('.invalid').text(""+currentPlayer+" it's your move!");
          } else {
            $('.invalid').text(""+currentPlayer+' keep moving!');
          }
        } else if (input.startCol<input.endCol && board[input.startRow+1][input.startCol+1] === 'red') {
          $(document).trigger('pieceTaken');
          removePiece(input.startRow+1,input.startCol+1);
          makeMove(input);
          if (checkAvailable(input.endRow,input.endCol)!==true) {
            currentPlayer = changePlayer(currentPlayer);
            $('.invalid').text(""+currentPlayer+" it's your move!");
          } else {
            $('.invalid').text(""+currentPlayer+' keep moving!');
          }
        } else {
          $(document).trigger('invalidMove');
        }
      } else {
        $(document).trigger('invalidMove');
      }
    } else if ()
      else {board[input.startRow][input.startCol] === 'wht-king'
      $(document).trigger('invalidMove');
    }
  }
  else if (currentPlayer === 'red') {
    if (board[input.startRow][input.startCol] === 'red' && board[input.endRow][input.endCol] === ' X ') {
      if (input.endRow-input.startRow === -1 && Math.abs(input.startCol-input.endCol) === 1) { 
        makeMove(input);
        currentPlayer = changePlayer(currentPlayer);
        $('.invalid').text(""+currentPlayer+" it's your move!");
      } else if (input.endRow-input.startRow === -2 && Math.abs(input.startCol-input.endCol) === 2) {
        if (input.startCol>input.endCol && board[input.startRow-1][input.startCol-1] === 'wht') {
          $(document).trigger('pieceTaken');
          removePiece(input.startRow-1,input.startCol-1);
          makeMove(input);
          if (checkAvailable(input.endRow,input.endCol)!==true) {
            currentPlayer = changePlayer(currentPlayer);
            $('.invalid').text(""+currentPlayer+" it's your move!");
          } else {
            $('.invalid').text(""+currentPlayer+' keep moving!');
          }
        } else if (input.startCol<input.endCol && board[input.startRow-1][input.startCol+1] === 'wht') {
          $(document).trigger('pieceTaken');
          removePiece(input.startRow-1,input.startCol+1)
          makeMove(input);
          if (checkAvailable(input.endRow,input.endCol)!==true) {
            currentPlayer = changePlayer(currentPlayer);
            $('.invalid').text(""+currentPlayer+" it's your move!");
          } else {
            $('.invalid').text(""+currentPlayer+' keep moving!');
          }
        } else {
          $(document).trigger('invalidMove');
        }
      } else {
        $(document).trigger('invalidMove');
      }
    } else {
      $(document).trigger('invalidMove');
    }
  }
};

var makeMove = function(input) {
  board[input.endRow][input.endCol] = board[input.startRow][input.startCol];
  board[input.startRow][input.startCol] = ' X ';
  if ((input.endRow === 0 || input.endRow === 7) && (board[input.endRow][input.endCol]!=='wht-king' || board[input.endRow][input.endCol]!=='red-king')) {
    if (currentPlayer === 'wht') {
      board[input.endRow][input.endCol] = 'wht-king';      
    } else {
      board[input.endRow][input.endCol] = 'red-king';
    }
  }
  $(document).trigger('boardChange');
};

var removePiece = function(row,col) {
  board[row][col] = ' X ';
};

var checkJump = function(){
  if (currentPlayer === 'wht') {
    for (var i=0;i<6;i++) {
      if (board[i][0] === 'wht' || board[i][7] === 'wht') {
      if ((board[i+1][1] === 'red' && board[i+2][2] === ' X ') || (board[i+1][6] === 'red' && board[i+2][5] === ' X ')) {
        return true
      }
    }
      for (var j=2;j<6;j++) {
        if (board[i][j] === 'wht') {
          if((board[i+1][j+1] === 'red' && board[i+2][j+2] === ' X ') || (board[i+1][j-1] === 'red' && board[i+2][j-2] === ' X ')) {
            return true;
          } 
        } else if (board[i][j] === 'wht-king') {
          if((board[i+1][j+1] === 'red' && board[i+2][j+2] === ' X ') || (board[i+1][j-1] === 'red' && board[i+2][j-2] === ' X ') || (board[i-1][j-1] === 'red' && board[i-2][j-2] === ' X ') ||(board[i-1][j+1] === 'red' && board[i-2][j+2] === ' X ')) {
            return true;
          }
        }
      }
    }
  } else {
    for (var i=2;i<8;i++) {
      if (board[i][0] === 'red' || board[i][7] === 'red') {
      if ((board[i-1][1] === 'wht' && board[i-2][2] === ' X ') || (board[i-1][6] === 'wht' && board[i-2][5] === ' X ')) {
        return true
      }
    }
      for (var j=2;j<6;j++) {
        if (board[i][j] === 'red') {
          if((board[i-1][j+1] === 'wht' && board[i-2][j+2] === ' X ') || (board[i-1][j-1] === 'wht' && board[i-2][j-2] === ' X ')) {
            return true;
          }
        } else if (board[i][j] === 'red-king') {
          if((board[i-1][j+1] === 'wht' && board[i+2][j+2] === ' X ') || (board[i+1][j-1] === 'wht' && board[i-2][j-2] === ' X ') || (board[i-1][j-1] === 'wht' && board[i-2][j-2] === ' X ') ||(board[i-1][j+1] === 'wht' && board[i-2][j+2] === ' X ')) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

var checkAvailable = function(row,col) {
  if (currentPlayer === 'wht' && row<6) {
    if (col===0 || col===1) {
      if (board[row+1][col+1] === 'red' && board[row+2][col+2] === ' X ') {
        return true;
      }
    } else if (col===7 || col===6) {
      if (board[row+1][col-1] === 'red' && board[row+2][col-2] === ' X ') {
        return true;
      }
    } else {
      if((board[row+1][col-1] === 'red' && board[row+2][col-2] === ' X ') || (board[row+1][col+1] === 'red' && board[row+2][col+2] === ' X ')) {
        return true;
      }
    }
  } else if (currentPlayer === 'red' && row>1) {
    if (col===0 || col===1) {
      if (board[row-1][col+1] === 'wht' && board[row-2][col+2] === ' X ') {
        return true;
      }
    } else if (col===7 || col===6) {
      if (board[row-1][col-1] === 'wht' && board[row-2][col-2] === ' X ') {
        return true;
      }
    } else {
      if((board[row-1][col-1] === 'wht' && board[row-2][col-2] === ' X ') || (board[row-1][col+1] === 'wht' && board[row-2][col+2] === ' X ')) {
        return true;
      }
    }
  }
  return false;
};

var changePlayer = function(player) {
  if (player === 'wht') {
    $(document).trigger('turn');
    return 'red';
  } else {
    $(document).trigger('turn');
    return 'wht';
  }
};

var gameover = function(player) {
  var count = 0;
  var playerKing = player+'-king';
  for (var i=0;i<board.length;i++) {
    if ($.inArray(player,board[i]) === -1 && $.inArray(playerKing,board[i]) === -1) {
      count++;
    }
  }
  if (count === 8) {
    $('.played').text(1+parseInt($('.played').text()));
    $('.taken').text(0);
    $('.error').text(0);
    $('.turn').text(0);
    return false;
  }
  return true;
};

var webMove = function(a,b,c,d) {
  input = {
    startRow: a.charCodeAt()-97,
    startCol: parseInt(b),
    endRow: c.charCodeAt()-97,
    endCol: parseInt(d)
  };
  return input;
};

var play = function(){
  resetBoard();
  displayBoard();
  while (gameover('red') && gameover('wht')) {
    move = getMove();
    attemptMove(move);
  }
  $('.start').attr('disabled',false);
  alert('Gameover! '+currentPlayer+' you lose!');
};

var webPlay = function() {
  resetBoard();
  displayBoard();
  while (gameover('red') && gameover('wht')) {
    move = webMove();
    attemptMove(move);
  }
  $('.start').attr('disabled',false);
  alert('Gameover! '+currentPlayer+' you lose!');
};

$(document).ready(function(){
  $('.col','.row').append('<span class=piece></span>');

  $(document).on('boardChange',function(){
    displayBoard();
  });
  
  $(document).on("firstClick",function(){
    webrow1 = $('.rowmove').text();
    webcol1 = $('.colmove').text();
  });
  
  $(document).on("secondClick",function(){
    webrow2 = $('.rowmove').text();
    webcol2 = $('.colmove').text();
    attemptMove(webMove(webrow1,webcol1,webrow2,webcol2));
  });
  $(document).on("jump",function(){
    webrow1 = $('.rowmove').text();
    webcol1 = $('.colmove').text();
    attemptMove(getAnotherMove(webrow2,webcol2,webrow1,webcol1));
    clicks=0;
  });

  $('.row').click(function(e){
    row1 = ($(this).attr('class').slice(8,9));
    $('.rowmove').text(row1);
    clicks++;
    if(clicks === 1){
      $(document).trigger('firstClick');
    } else if (clicks === 2){
      $(document).trigger('secondClick');
      clicks = 0;
    }
  });

  $('.col').click(function(e){
   col1 = ($(this).attr('class').slice(8,9));
   $('.colmove').text(col1);
  });

  $(document).on('invalidMove',function(){
    $('.invalid').text('Invalid move!');
    $('.error').text(1+parseInt($('.error').text()));
  });

  $(document).on('pieceTaken',function(e){
    $('.invalid').text('LOL LOL LOL LOL');
    $('.taken').text(1+parseInt($('.taken').text()));
  });

  $(document).on('turn',function(e){
    $('.turn').text(1+parseInt($('.turn').text()));
  });
  $('.start').click(function(e){
    $(this).attr('disabled',true);
    $('.invalid').text("White it's your move!");
    resetBoard();
    displayBoard();
    //webPlay();
  });
});



