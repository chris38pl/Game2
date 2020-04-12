const grid = document.querySelector('.grid')
const main = document.querySelector('.main')
const body = document.querySelector('body')

var itemsInLine = 20;
var quanityLines = 12;

const colors = ['dodgerblue','red']
const shadows = ["inset 2px 0 30px rgba(204,34,65,1), inset -2px 0 30px rgba(204,34,65,1)","inset 2px 0 30px rgba(25,72,153,1), inset -2px 0 30px rgba(25,72,153,1)"]
var currentPlayer = 0;

startGame();




// Event Listeners
grid.addEventListener('click', click);

function click(event){
    const item = event.target;
    /* console.log(item) */

    // Proceed only for actual items in the container
    if (item.classList[0] === 'item'){
        if (item.classList[2] === "clicked"){
            /* item.classList.remove('clicked'); */
        }else{
            item.classList.add('clicked');
            
         
            item.setAttribute('user', colors[currentPlayer]);
            /* item.style.backgroundColor = colors[currentPlayer]; */
            item.style.opacity = 0.4;

            item.classList.add('player' + currentPlayer);
            body.style.boxShadow = shadows[currentPlayer]

            if (currentPlayer > 0){
                currentPlayer = currentPlayer - 1
            }else{
                currentPlayer = currentPlayer + 1
            }

            check(item);
        }
    }
}

function check(item){

    x = item.getAttribute('x')-1;
    y = item.getAttribute('y')-1;

    searchRows();
    searchColumns();
    searchDiagonalA(x,y);
    searchDiagonalB(x,y);

}

function endGame(){
    grid.style.pointerEvents = 'none';
    setTimeout(function(){
        main.addEventListener('click', startGame);
    }, 2000);
}

function startGame(){
    grid.style.pointerEvents = 'auto';
    main.removeEventListener('click', startGame);
    grid.innerHTML = '';

    var i, j;
    for (i = 0; i < quanityLines; i++) {
        var newRow = document.createElement('div');
        newRow.classList.add('row');
        grid.appendChild(newRow); 
        for (j = 1; j <= itemsInLine; j++) {
            var newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.classList.add('column');
            newItem.setAttribute('x', j);
            newItem.setAttribute('y', i+1);
            newRow.appendChild(newItem);  
        }
    } 
}

function searchRows(){
    for (a = 0; a <= quanityLines-1; a++) {
        var row = a
        var selectedRow = document.querySelectorAll('.row')[row];

        var player1 = [];
        var player2 = [];

        for (i = 0; i < itemsInLine; i++) {
            item = selectedRow.children.item(i)
            currPlayer = item.getAttribute('user');

            if (currPlayer===colors[0]){
                player1.push(parseInt(item.getAttribute('x')));
            }

            if (currPlayer===colors[1]){
                player2.push(parseInt(item.getAttribute('x')));
            }
        }

        var counter1 = 0;
        var counter2 = 0;
        var difference = 0;

        if (player1.length >= 5){
            for (j = 0; j < player1.length-1; j++) {
                difference = player1[j+1] - player1[j]
                if (difference === 1){
                    counter1 = counter1 + 1
                }else{
                    counter1 = 0;
                }

                if (counter1 === 4){
                    var lastItem = player1[j];
                    selectedRow.children.item(lastItem).style.opacity = 1;
                    selectedRow.children.item(lastItem-1).style.opacity = 1;
                    selectedRow.children.item(lastItem-2).style.opacity = 1;
                    selectedRow.children.item(lastItem-3).style.opacity = 1;
                    selectedRow.children.item(lastItem-4).style.opacity = 1;
                    endGame();
                    break;
                }
            }
        }

        if (player2.length >= 5){
            for (j = 0; j < player2.length-1; j++) {
                difference = player2[j+1] - player2[j]
                if (difference === 1){
                    counter2 = counter2 + 1
                }else{
                    counter2 = 0;
                }

                if (counter2 === 4){
                    var lastItem = player2[j];
                    selectedRow.children.item(lastItem).style.opacity = 1;
                    selectedRow.children.item(lastItem-1).style.opacity = 1;
                    selectedRow.children.item(lastItem-2).style.opacity = 1;
                    selectedRow.children.item(lastItem-3).style.opacity = 1;
                    selectedRow.children.item(lastItem-4).style.opacity = 1;
                    endGame();
                    break;
                }
            }
        }
    }
}

function searchColumns(){
    for (a = 0; a <= itemsInLine-1; a++) {
        var colummn = a;

        var player1 = [];
        var player2 = [];

        for (i = 0; i < quanityLines; i++) {
            /* item = selectedRow.children.item(i) */
            item = document.querySelectorAll('.row')[i].children.item(colummn)
            currPlayer = item.getAttribute('user');

            if (currPlayer===colors[0]){
                player1.push(parseInt(item.getAttribute('y')));
            }

            if (currPlayer===colors[1]){
                player2.push(parseInt(item.getAttribute('y')));
            }
        }

        var counter1 = 0;
        var counter2 = 0;
        var difference = 0;

        if (player1.length >= 5){
            for (j = 0; j < player1.length-1; j++) {
                difference = player1[j+1] - player1[j]
                if (difference === 1){
                    counter1 = counter1 + 1
                }else{
                    counter1 = 0;
                }

                if (counter1 === 4){
                    var lastItem = player1[j];
                    document.querySelectorAll('.row')[lastItem].children.item(colummn).style.opacity = 1;
                    document.querySelectorAll('.row')[lastItem-1].children.item(colummn).style.opacity = 1;
                    document.querySelectorAll('.row')[lastItem-2].children.item(colummn).style.opacity = 1;
                    document.querySelectorAll('.row')[lastItem-3].children.item(colummn).style.opacity = 1;
                    document.querySelectorAll('.row')[lastItem-4].children.item(colummn).style.opacity = 1;
                    endGame();
                    break;
                }
            }
        }

        if (player2.length >= 5){
            for (j = 0; j < player2.length-1; j++) {
                difference = player2[j+1] - player2[j]
                if (difference === 1){
                    counter2 = counter2 + 1
                }else{
                    counter2 = 0;
                }

                if (counter2 === 4){
                    var lastItem = player2[j];
                    document.querySelectorAll('.row')[lastItem].children.item(colummn).style.opacity = 1;
                    document.querySelectorAll('.row')[lastItem-1].children.item(colummn).style.opacity = 1;
                    document.querySelectorAll('.row')[lastItem-2].children.item(colummn).style.opacity = 1;
                    document.querySelectorAll('.row')[lastItem-3].children.item(colummn).style.opacity = 1;
                    document.querySelectorAll('.row')[lastItem-4].children.item(colummn).style.opacity = 1;
                    endGame();
                    break;
                }
            }
        }
    }
}

function searchDiagonalA(x,y){

    // Store Atual Coordinates in temporary variables used in WHILE loop
    var a = x;
    var b = y;

    // This will find the coordinates of first element in left top corner in that diagonal and save it
    while (a > 0 && b > 0) {  
        a = a - 1
        b = b - 1
    }

    // This will loop, starting from top left tile (found before) till the end of diagonal
    var player1 = [];
    var player2 = [];
    var player1row = [];
    var player2row = [];

    while (a < itemsInLine && b < quanityLines) {
        item = document.querySelectorAll('.row')[b].children.item(a)
        currPlayer = item.getAttribute('user');

        if (currPlayer===colors[0]){
            player1.push(parseInt(a));
            player1row.push(parseInt(b));
        }

        if (currPlayer===colors[1]){
            player2.push(parseInt(a));
            player2row.push(parseInt(b));
        }

        a = a + 1
        b = b + 1
    }

    var counter1 = 0;
    var counter2 = 0;
    var difference = 0;

    if (player1.length >= 5){
        for (j = 0; j < player1.length-1; j++) {
            difference = player1[j+1] - player1[j]
            if (difference === 1){
                counter1 = counter1 + 1
            }else{
                counter1 = 0;
            }

            if (counter1 === 4){
                var lastItem = player1[j]+1;
                var lastRow = player1row[j]+1;
                document.querySelectorAll('.row')[lastRow].children.item(lastItem).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-1].children.item(lastItem-1).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-2].children.item(lastItem-2).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-3].children.item(lastItem-3).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-4].children.item(lastItem-4).style.opacity = 1;
                endGame();
                break;
            }
        }
    }

    if (player2.length >= 5){
        for (j = 0; j < player2.length-1; j++) {
            difference = player2[j+1] - player2[j]
            if (difference === 1){
                counter2 = counter2 + 1
            }else{
                counter2 = 0;
            }

            if (counter2 === 4){
                var lastItem = player2[j]+1;
                var lastRow = player2row[j]+1;
                document.querySelectorAll('.row')[lastRow].children.item(lastItem).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-1].children.item(lastItem-1).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-2].children.item(lastItem-2).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-3].children.item(lastItem-3).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-4].children.item(lastItem-4).style.opacity = 1;
                endGame();
                break;
            }
        }
    }
    
}

function searchDiagonalB(x,y){

    // Store Atual Coordinates in temporary variables used in WHILE loop
    var a = x;
    var b = y;

    // This will find the coordinates of first element in right top corner in that diagonal and save it
    while (a <= itemsInLine-1 && b >= 0) {  
        a = a + 1
        b = b - 1
    }
    a = a - 1
    b = b + 1

    /* document.querySelectorAll('.row')[b].children.item(a).style.opacity = 1; */

    // This will loop, starting from top right tile (found before) till the end of diagonal
    var player1 = [];
    var player2 = [];
    var player1col = [];
    var player2col = [];

    while (a >= 0 && b < quanityLines) {
        item = document.querySelectorAll('.row')[b].children.item(a);
        currPlayer = item.getAttribute('user');

        if (currPlayer===colors[0]){
            player1.unshift(parseInt(a));
            player1col.unshift(parseInt(b));
        }

        if (currPlayer===colors[1]){
            player2.unshift(parseInt(a));
            player2col.unshift(parseInt(b));
        }

        a = a - 1
        b = b + 1
    }
    
    var counter1 = 0;
    var counter2 = 0;
    var difference = 0;

    if (player1.length >= 5){
        for (j = 0; j < player1.length-1; j++) {
            difference = player1[j+1] - player1[j]
            if (difference === 1){
                counter1 = counter1 + 1
            }else{
                counter1 = 0;
            }

            if (counter1 === 4){
                var firstItem = player1[0];
                var lastRow = player1col[j]+3;
                document.querySelectorAll('.row')[lastRow].children.item(firstItem).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-1].children.item(firstItem+1).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-2].children.item(firstItem+2).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-3].children.item(firstItem+3).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-4].children.item(firstItem+4).style.opacity = 1;
                endGame();
                break;
            }
        }
    }

    if (player2.length >= 5){
        for (j = 0; j < player2.length-1; j++) {
            difference = player2[j+1] - player2[j]
            if (difference === 1){
                counter2 = counter2 + 1
            }else{
                counter2 = 0;
            }

            if (counter2 === 4){
                var firstItem = player2[0];
                var lastRow = player2col[j]+3;
                document.querySelectorAll('.row')[lastRow].children.item(firstItem).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-1].children.item(firstItem+1).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-2].children.item(firstItem+2).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-3].children.item(firstItem+3).style.opacity = 1;
                document.querySelectorAll('.row')[lastRow-4].children.item(firstItem+4).style.opacity = 1;
                endGame();
                break;
            }
        }
    }
    
}