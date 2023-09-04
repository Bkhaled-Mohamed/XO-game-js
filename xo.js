const btn = document.querySelector('.btn');
const vsCpu = document.querySelector('.vsCpu');
const vsPlayer = document.querySelector('.vsPlayer');
const startMenu = document.querySelector('.startMenu');
const gameBoard = document.querySelector('.gameBoard');
const squares = document.querySelectorAll('[data-cell]');
const whosTurn = document.querySelector('.whosTurn');
const winPannel = document.querySelector('.winPannel');
const pannelText1 = document.querySelector('.pannelText1')
const pannelText2=document.querySelector('.pannelText2');


let turn= true;
let gameTurn=0;

const winOptions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

let winningComb=[];

let options = ["","","","","","","","",""];
let availableOption =["0","1","2","3","4","5","6","7","8"];

let running ;
let winner='';
let player=true;
let playerX=true;

let roundWon=false;

let winnerXScore=0;
let winnerOScore=0;
let drawScore=0;

let vsCpuCheck;
let currentPlayer;

function switchPlyerX(){

        btn.style.left = '0'
        btn.style.backgroundColor ='#22A699'
        playerX=true;
        console.log('player is =' ,player);
   
}

function switchPlyerO(){

        btn.style.left = '91px'
        btn.style.backgroundColor ='#F24C3D'
        playerX=false;
        console.log('player is =' ,player);

}

function switchMenu(){

    startMenu.classList.toggle('active');
    gameBoard.classList.toggle('active');
    startTheGame()
}

function startTheGame(){

        squares.forEach(square => {
            square.addEventListener('click', handleClick , {once:true})
    
        })

        if(playerX==false && vsCpuCheck==true){
            computerMove()
            squares[compMove].innerText = "X"
            squares[compMove].classList.add('X')
            options[compMove]="X"
            squares[compMove].setAttribute('disabled', 'disabled');
            turn=false;
            whosTurn.innerText="O TURN"
            whosTurn.style.color= '#F24C3D'
            return
        }

}

function handleClick(e){
    if(running===true){

    const cell = e.target
    currentPlayer = turn? "X":"O"; 

        if(vsCpuCheck==true){
            placeMarkComputerMove(cell,currentPlayer)

        
        }else if(vsCpuCheck==false){
            placeMark(cell,currentPlayer)
        }
    }else{
        //nothing
    }
}

function placeMark(cell,currentPlayer){

        if(currentPlayer==="X" ){
            cell.innerText = currentPlayer
            
            options[cell.getAttribute('cellIndex')]=currentPlayer
            gameTurn++;
            cell.classList.add('X');
            turn =false;
    
            whosTurn.innerText="O TURN"
            whosTurn.style.color= '#F24C3D'
        }else if(currentPlayer=='O'){
            cell.innerText = currentPlayer
            options[cell.getAttribute('cellIndex')]=currentPlayer
            cell.classList.add('O');
            turn =true;
    
            gameTurn++;
            whosTurn.innerText="X TURN"
            whosTurn.style.color= '#22A699'
        }
    
        console.log("curren options= ", options);
        checkWinner()
    }


function computerMove(){
    if(options.includes("")){
        for(let i=0 ;i<100;i++ ){
            compMove= availableOption[Math.floor((Math.random() * availableOption.length))]
            if (options[compMove]==''){
                availableOption.splice(compMove,1);
                
                return compMove
            }
        }
    }
}

function placeMarkComputerMove(cell,currentPlayer){

    if(playerX===true  ){
        
        if(!cell.getAttribute('disabled')){
            player=true
            turn=false
            currentPlayer="X";
            whosTurn.innerText="X TURN"
            cell.innerText = "X"       
            options[cell.getAttribute('cellIndex')]="X"
            gameTurn++;
            cell.classList.add('X');
    
            if (roundWon==true){return}else{
            player=false;
            turn=true;
            currentPlayer="O";
            computerMove(currentPlayer)
            squares[compMove].innerText = "O"
            options[compMove]="O"
            squares[compMove].classList.add('O');
            squares[compMove].setAttribute('disabled', 'disabled');

            if (roundWon==true){return}else{
                player=true;

            }
        } }
        checkWinner(currentPlayer);

    }
    else if(playerX===false ){

        if(!cell.getAttribute('disabled')){
        player=false;
        turn=true;
        currentPlayer="O";
        cell.innerText = "O"
        options[cell.getAttribute('cellIndex')]="O"
        gameTurn++;
        cell.classList.add('O');

        if (roundWon==true){return} else{
          
            player=true
            turn=false

            currentPlayer="X";
            computerMove(currentPlayer)
            squares[compMove].innerText = "X"
            options[compMove]="X"
            squares[compMove].classList.add('X');
            squares[compMove].setAttribute('disabled', 'disabled');

            if (roundWon==true)return
            player=false;
        }
        }
        checkWinner(currentPlayer);
    }
}

function checkWinner(){

    for(let i = 0 ; i< winOptions.length;i++){
        const conditions = winOptions[i];
        const cellA = options[conditions[0]];
        const cellB = options[conditions[1]];
        const cellC = options[conditions[2]];

        if(cellA=="" || cellB=="" || cellC==""){
           continue; 
        }
        if(cellA== cellB && cellC == cellB){

            winningComb=winOptions[i]
            roundWon=true
            winner=cellA;
            break;
        }
    }
    if(roundWon){
       console.log(`${winner} wins!`); 
       whosTurn.innerText=`${winner} WINS!`
 
       whosTurn.style.color= '#eee'

    } else if (!options.includes("")){
        console.log(` its a draw!`); 
        whosTurn.innerText=`DRAW!`
 
        whosTurn.style.color= 'grey'
        winner="draw" 
    }
    score()
   
}

function score(){

    if(winner=='X' || winner =="O" ){
        for(let i=0; i<winningComb.length;i++){
            squares[winningComb[i]].style.backgroundColor='#eee'
            running = false;
        }
    }
    if(winner=='X'){
        const winnerX=document.querySelector('.winnerX');

        pannelText2.classList.add('X')
        winnerXScore++;
        winnerX.innerText=winnerXScore;
        running = false;
        winPannel.classList.remove('hidden')

        if (playerX==true){
            pannelText1.innerText='YOU WIN!'
            pannelText2.innerText=`X TAKES THE ROUND`

        }else if(playerX==false){
            pannelText1.innerText='YOU LOSE!'
            pannelText2.innerText="X TAKES THE ROUND"

        }
        
    } if (winner=="O"){
        const winnerO=document.querySelector('.winnerO');

        pannelText2.classList.add('O')
        winnerOScore++;
        winnerO.innerText=winnerOScore;
        running = false;
        winPannel.classList.remove('hidden')

        if (playerX==false){
            pannelText1.innerText='YOU WIN!'
            pannelText2.innerText="O TAKES THE ROUND"

        }else {
            pannelText1.innerText='YOU LOSE!'
            pannelText2.innerText="O TAKES THE ROUND"
        }

    } if( winner=='draw'){
        console.log("score its a draw");
        running = false;
        const winnerDraw=document.querySelector('.winnerDraw');
        drawScore++;
        winnerDraw.innerText=drawScore;
        winPannel.classList.remove('hidden')
        pannelText1.innerText='A TIE!'
        pannelText2.innerText="ITS A DRAW!"
        pannelText2.classList.add('draw');
    }

}

const restart = document.querySelector('.restart');
    
//reset current game
restart.addEventListener('click',()=>{
    reset();
})

function reset(){

        squares.forEach(square => {
            square.innerText="";
            square.classList.remove('O');
            square.classList.remove('X');
            square.style.backgroundColor="#1a2b33";
            square.removeAttribute('disabled', 'disabled');

        })

        options = ["","","","","","","","",""];
        availableOption =["0","1","2","3","4","5","6","7","8"];
        running = true;
        turn= true;
        whosTurn.innerText=  `${currentPlayer} TURN` ;
        whosTurn.style.color=  turn? "#22A699":"#F24C3D" ;
        winningComb=[];
        gameTurn=0;
        pannelText2.classList.remove('O')
        pannelText2.classList.remove('X')
        pannelText2.classList.remove('draw');
        roundWon=false
        winner='';
        winPannel.classList.add('hidden')

        startTheGame()

    }

function restartGame(){

    const pannelBtn1= document.querySelector('.pannelBtn1');
    pannelBtn1.addEventListener('click',()=>{
     location.reload();

    })

    const pannelBtn2 = document.querySelector('.pannelBtn2');
    pannelBtn2.addEventListener('click',()=>{
        reset()

    });
}

function init(){
    vsCpu.addEventListener('click',()=>{

        vsCpuCheck=true;
        running = true;
        switchMenu();
        winnerXScore=0;
        winnerOScore=0;
        drawScore=0;

    })

    vsPlayer.addEventListener('click',()=>{
        
        vsCpuCheck=false;
        running = true;
        switchMenu();
        winnerXScore=0;
        winnerOScore=0;
        drawScore=0;

    })
}


restartGame()
init();