let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;

let colors=["red","yellow","green","purple"];

let h2=document.querySelector('h2');

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(()=>{
        btn.classList.remove('flash');
    },250);
}
function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(()=>{
        btn.classList.remove('userflash');
    },250);
}

function levelUp(){
    level++;
    h2.innerText=`Level ${level}`;
    userSeq=[];

    let randIndex=Math.floor(Math.random()*3);
    let randColor=colors[randIndex];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

document.addEventListener("keydown",function(){
    if(started==false){
        started=true;
        levelUp();
    }
})

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

function checkAns(ind,currbtn){
    if(userSeq[ind]==gameSeq[ind]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br>Press any key to restart`;
        document.querySelector('body').style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector('body').style.backgroundColor="";
        },150);
        reset();
    }
}

function btnPress(){
    let userColor=this.getAttribute('id');
    userSeq.push(userColor);
    userFlash(this);
    checkAns(userSeq.length-1,this);
}

let btns=document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click",btnPress);
}