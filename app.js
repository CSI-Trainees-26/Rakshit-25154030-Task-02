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
