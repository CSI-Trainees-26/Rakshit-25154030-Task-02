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
    let bedtime = document.getElementById("bedtime").textcontent;
    let waketime = document.getElementById("waketime").textContent;
    if(!bedtime || !waketime){
        document.getElementById("sleep-duration").innerText = `Enter both the time first`;
        return;
    }
    let date1 = new Date(bedtime);
    let date2 = new Date(waketime);
    console.log(date1);
    console.log(date2);

    let date = Math.abs(date2.now - date1.now);
    console.log(date);

    document.getElementById("sleep-duration").innerText = `${date/(1000*60*60).toFixed(1)}`;
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