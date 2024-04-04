let box = document.querySelectorAll(".box"); //to access the boxes
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;
let count = 0; //To Track Draw

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//to add eventlisteners to all boxes
box.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turnX){
            box.innerText = "X";
            turnX = false;
        }
        else{
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkwin();

        if (count === 9 && !isWinner) {
          gameDraw();
        }
    });
});

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBox();
    msgcontainer.classList.add("hide");
};

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disableBox();
  };
//enable boxes for new game
const enableBox = () => {
    for(let eachbox of box) {
        eachbox.disabled = false;
        eachbox.innerText = "";
    }
};

const disableBox = () => {
    for(let eachbox of box) {
        eachbox.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBox();
};

const checkwin = () => {
    for(let pattern of winPatterns)
    {
        let pos1 = box[pattern[0]].innerText;
        let pos2 = box[pattern[1]].innerText;
        let pos3 = box[pattern[2]].innerText;

        if(pos1 !="" && pos2 !="" && pos3 !="") {
            if(pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
};

newbtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);