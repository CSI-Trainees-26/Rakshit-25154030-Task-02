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

let sleepBtn = document.getElementById("calcsleepbtn");
sleepBtn.addEventListener('click' , ()=>{
    let bedtime = document.getElementById("bedtime").value;
    let waketime = document.getElementById("waketime").value;
    if(!bedtime || !waketime){
        document.getElementById("sleep-duration").innerText = `Enter both the time first`;
        return;
    }
    let date1 = new Date(bedtime);
    let date2 = new Date(waketime);

    let date = Math.abs(date2 - date1);

    document.getElementById("sleep-duration").innerText = `${date/(1000*60*60).toFixed(1)}`;
});

let save = document.getElementById("save-quote");
let mysavedquote = JSON.parse(localStorage.getItem("savedQuotes")) || [];
function saveCurrentQuote(){
    mysavedquote.push(quoteText.innerText);
    localStorage.setItem("savedQuotes" ,JSON.stringify(mysavedquote));
    save.innerText = `saved!`;
    setTimeout(()=>{save.innerText = `save`} , 1000);
}
save.addEventListener('click' , saveCurrentQuote);
