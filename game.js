let chicken = {

    stage:"egg",

    level:0,

    exp:0,

    food:100,

    coin:0,

    hatchTime:Date.now()+10000

};



function updateGame(){


let icon="🥚";
let stage="Trứng";
let level=0;



if(chicken.stage=="newborn"){

    icon="🐣";
    stage="Gà mới nở";
    level=3;

}



if(chicken.stage=="baby"){

    icon="🐥";
    stage="Gà con";
    level=5;

}



if(chicken.stage=="adult"){

    icon="🐓";
    stage="Gà lớn";
    level=10;

}



document.getElementById("chicken").innerHTML=icon;

document.getElementById("stage").innerHTML=stage;

document.getElementById("level").innerHTML=level;

document.getElementById("exp").innerHTML=chicken.exp;

document.getElementById("food").innerHTML=chicken.food;

document.getElementById("coin").innerHTML=chicken.coin;


}



function checkEgg(){


if(chicken.stage=="egg"){


let time=Math.ceil(
(chicken.hatchTime-Date.now())/1000
);



document.getElementById("time").innerHTML=time;



if(Date.now()>=chicken.hatchTime){


chicken.stage="newborn";


alert("🥚✨ Trứng đã nở thành 🐣");


}

}


updateGame();


}





function feed(){


if(chicken.stage=="egg"){

alert("🥚 Trứng chưa nở!");

return;

}



chicken.food+=5;

chicken.exp+=20;

chicken.coin+=1;



if(chicken.food>100){

chicken.food=100;

}



if(chicken.stage=="newborn" && chicken.exp>=100){

chicken.stage="baby";

chicken.exp=0;

alert("🎉 Gà đã thành 🐥 Gà con!");

}



else if(chicken.stage=="baby" && chicken.exp>=100){

chicken.stage="adult";

chicken.exp=0;

alert("🎉 Gà đã lớn thành 🐓!");

}



updateGame();


}



setInterval(checkEgg,1000);


updateGame();
