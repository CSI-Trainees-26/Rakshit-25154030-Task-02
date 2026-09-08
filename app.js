let currentWater = 0;
const TargetWater = 5000;
let current_water = document.getElementById("current-water");
let add250 = document.getElementById("add-water-250");
let add500 = document.getElementById("add-water-500");
function AddWater(n){
    currentWater += n;
    if(currentWater > TargetWater){
        return TargetWater;
    }
    return currentWater;
}
add250.addEventListener('click' , ()=>{
    let add = AddWater(250);
    current_water.innerText = `${add/1000}`;
})
add500.addEventListener('click' , ()=>{
    let add = AddWater(500);
    current_water.innerText = `${add/1000}`;
})

let sleepBtn = document.getElementById("calcsleepbtn");
sleepBtn.addEventListener('click' , ()=>{
    console.log("click")
    let bedtime = document.getElementById("bedtime").value;
    let waketime = document.getElementById("waketime").value;
    if(!bedtime || !waketime){
        document.getElementById("sleep-duration").innerText = `Enter both the time first`;
        return;
    }
    let time1 = bedtime.split(":");
    let time2 = waketime.split(":");
    let firsttime = Number(time1[0]) * 60 + Number(time1[1]);
    let secondtime = Number(time2[0]*60 + Number(time2[1]));

    let time = secondtime - firsttime;
    if(time >= 0){
        document.getElementById("sleep-duration").innerText = `${Math.floor(time/60)}hrs and ${time%60} min`;

    }else{
        time += 24*60;
        document.getElementById("sleep-duration").innerText = `${Math.floor(time/60)}hrs and ${time%60} min`;
    }
});

let quoteText = document.getElementById("quote-text");
let quoteBtn = document.getElementById("new-quote-btn");
async function getNewQuote(){
    try{
        quoteText.innerText = `Loading the quote...`;
        let response = await fetch('https://dummyjson.com/quotes/random');
        let data = await response.json();
        quoteText.innerText = `"${data.quote}" - ${data.author}`;
    }catch(error){
        quote.innerText = `Failed to fetch code! Try again`;
        console.log("API error");
    }
}
quoteBtn.addEventListener('click' , getNewQuote);


let save = document.getElementById("save-quote");
let mysavedquote = JSON.parse(localStorage.getItem("savedQuotes")) || [];
function saveCurrentQuote(){
    mysavedquote.push(quoteText.innerText);
    localStorage.setItem("savedQuotes" ,JSON.stringify(mysavedquote));
    save.innerText = `saved!`;
    setTimeout(()=>{save.innerText = `save`} , 1000);
    displayQuote();
}
save.addEventListener('click' , saveCurrentQuote);

let savedQuotes = document.getElementById("savedquotes");
function displayQuote(){
    let savedquote = JSON.parse(localStorage.getItem("savedQuotes")) || [];
    savedQuotes.innerHTML = "";
    for(let i = savedquote.length - 1; i >= 0; i--){
        let li = document.createElement("li");
        li.innerText = savedquote[i];
        savedQuotes.appendChild(li);
    }
}
displayQuote();

let pending = document.querySelector('.pending');
let completed = document.querySelector('.completed');
let taskCard = document.getElementsByClassName("task-card");

if(localStorage.getItem("pending")){
    pending.innerHTML = localStorage.getItem("pending");
}
if(localStorage.getItem("completed")){
    completed.innerHTML = localStorage.getItem("completed");
}

let selected = null;
for(let task of taskCard){
    task.addEventListener('dragstart' , (e)=>{
        selected = e.target;
    });
}
completed.addEventListener('dragover' , (e)=>{
    e.preventDefault();
});
completed.addEventListener('drop' , (e)=>{
    completed.appendChild(selected);
    selected = null;
    localStorage.setItem("pending" , pending.innerHTML);
    localStorage.setItem("completed" , completed.innerHTML);
});

for(let task of taskCard){
    task.addEventListener('dragstart' , (e)=>{
        selected = e.target;
    });
}
pending.addEventListener('dragover' , (e)=>{
    e.preventDefault();
});
pending.addEventListener('drop' , (e)=>{
    pending.appendChild(selected);
    selected = null;
    localStorage.setItem("pending" , pending.innerHTML);
    localStorage.setItem("completed" , completed.innerHTML);
});

let btn = document.getElementById("addtask");


btn.addEventListener('click' , addNewTask);
function addNewTask(){
    let input = document.getElementById("add-task");
    let select = document.getElementById("priority");
    let taskname = input.value;
    let priority = select.value;
    let div = document.createElement('div');
    let span = document.createElement('span');
    let p = document.createElement('p');
    div.className = 'task-card';
    div.id = 'task-card';
    div.setAttribute('draggable' , true); 

    if(priority ==='high'){
        span.className = 'badge badge-high';
    }
    if(priority === 'medium'){
        span.className = 'badge badge-medium';
    }
    if(priority == 'low'){
        span.className = 'badge badge-low';
    }
    span.innerText = `${priority}`;
    p.className = 'task-title';
    p.innerText = `${taskname}`;
    div.appendChild(span);
    div.appendChild(p);
    div.addEventListener('dragstart' , (e)=>{
        selected = e.target;
    });
    pending.appendChild(div);
    localStorage.setItem("pending" , pending.innerHTML);
    input.value = "";
}

let timerCard = document.getElementById("timer");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let startTimer = document.getElementById("start-timer");
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");

let time = 1500;
let timer = null;
function start(){
    clearInterval(timer);
    timer = setInterval(()=>{ 
    if(time > 0){
        time = time - 1;
        let min = Math.floor(time / 60);
        let sec = Math.floor(time % 60);
        if(min < 10){
            minutes.innerText = `0${min}`;
        }else{
            minutes.innerText = min;
        }

        if(sec < 10){
            seconds.innerText = `0${sec}`;
        }else{
            seconds.innerText = sec;
        }
    }else{
        clearInterval(timer);
    }
    },1000);
}
startTimer.addEventListener('click' , start);
pause.addEventListener('click' , ()=>{
    clearInterval(timer);
})

reset.addEventListener('click' , ()=>{
    time = 1500;
    minutes.innerText = "25";
    seconds.innerText = "00";
    clearInterval(timer);
    timer = null;
})
