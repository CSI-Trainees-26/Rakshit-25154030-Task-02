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
