function updateGame(){

let icon = "🥚";
let stage = "Trứng";
let level = 0;
let timeText = "";



if(chicken.stage=="newborn"){

    icon = "🐣";
    stage = "Gà mới nở";
    level = 3;

}



if(chicken.stage=="baby"){

    icon = "🐥";
    stage = "Gà con";
    level = 5;

}



if(chicken.stage=="adult"){

    icon = "🐓";
    stage = "Gà lớn";
    level = 10;

}



document.getElementById("chicken").innerHTML = icon;

document.getElementById("stage").innerHTML = stage;

document.getElementById("level").innerHTML = level;

document.getElementById("exp").innerHTML = chicken.exp;

document.getElementById("food").innerHTML = chicken.food;

document.getElementById("coin").innerHTML = chicken.coin;


// chỉ hiện thời gian khi còn là trứng

if(chicken.stage=="egg"){

    timeText = Math.ceil(
    (chicken.hatchTime-Date.now())/1000
    ) + "s";

}
else{

    timeText = "Đã nở";

}


document.getElementById("time").innerHTML = timeText;


}
