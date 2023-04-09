function averageThreeNumbers (a,b,c){
    let sum = a + b + c;
    let aveg = sum/3;
    return aveg;
}

function createSentence (num, noun){
    return "On average, a berkely student has " + num + " "  + noun +"s";
}

function getRandomNum(max) {
    
    let ok =  Math.random()*max;
    return Math.round(ok);
}

let x = getRandomNum(20);
let y = getRandomNum(10);
let z = getRandomNum(13);
let avg = averageThreeNumbers(x,y,z);
let sentence = createSentence(avg,"cat");

console.log(sentence);