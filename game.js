let game = {

    coin:0,

    eggs:{
        normal:0
    },

    chickens:[

        {
            type:"normal",
            level:0,
            exp:0,
            hatchTime:Date.now()+10000,
            eggTime:Date.now()+240000
        }

    ]

};



function chicken(){

    return game.chickens[0];

}




// EXP cần để lên cấp

function needExp(level){

    return 100 + ((level-1)*50);

}




function updateGame(){


    let c=chicken();


    let icon="🥚";
    let name="Trứng";



    if(c.level>=1 && c.level<5){

        icon="🐣";
        name="Gà mới nở";

    }


    if(c.level>=5 && c.level<10){

        icon="🐥";
        name="Gà con";

    }


    if(c.level>=10 && c.level<25){

        icon="🐓";
        name="Gà lớn";

    }


    if(c.level>=25){

        icon="🐔";
        name="Gà trưởng thành";

    }



    document.getElementById("chicken").innerHTML=icon;

    document.getElementById("stage").innerHTML=name;

    document.getElementById("level").innerHTML=c.level;

    document.getElementById("exp").innerHTML=
    c.exp+"/"+needExp(c.level);


    document.getElementById("coin").innerHTML=
    game.coin;


    document.getElementById("egg").innerHTML=
    game.eggs.normal;



    if(c.level>=25){

        document.getElementById("sellButton").style.display="block";

    }
    else{

        document.getElementById("sellButton").style.display="none";

    }



}




// trứng nở

function checkHatch(){


let c=chicken();



if(c.level==0){


let time=Math.ceil(
(c.hatchTime-Date.now())/1000
);



document.getElementById("time").innerHTML=
"🥚 Còn "+time+"s";



if(time<=0){


c.level=1;


document.getElementById("timeBox").style.display="none";


alert("🎉 Trứng nở thành 🐣");


}



}



}




// tự tăng EXP

setInterval(function(){


let c=chicken();


if(c.level>0 && c.level<25){


c.exp+=2;



while(c.exp>=needExp(c.level)){


c.exp-=needExp(c.level);

c.level++;


alert(
"🎉 Gà lên Lv "+c.level
);


}



}


updateGame();



},1500);





// cho ăn bằng cám

function feed(amount){


let c=chicken();


if(c.level==0){

alert("🥚 Trứng chưa nở");

return;

}



c.exp+=amount;



while(c.exp>=needExp(c.level)){


c.exp-=needExp(c.level);

c.level++;


alert(
"🎉 Gà lên Lv "+c.level
);


}



updateGame();


}





// các loại cám

function camThuong(){

feed(10);

}


function camTangTrong(){

feed(30);

}


function camConHeo(){

feed(50);

}


function camTangTruong(){

feed(100);

}


function camSieuVip(){

feed(300);

}





// đẻ trứng

function layingEgg(){


let c=chicken();



if(c.level<10){

return;

}



if(Date.now()>=c.eggTime){


game.eggs.normal++;


let time =
240000 - ((c.level-10)*10000);



if(time<90000){

time=90000;

}



c.eggTime=
Date.now()+time;


alert("🥚 Gà đã đẻ trứng");


}



}





// bán gà

function sellChicken(){


let c=chicken();



if(c.level<25){

return;

}



game.coin+=600;



alert("💰 Bán gà +600 xu");



game.chickens[0]={

type:"normal",

level:0,

exp:0,

hatchTime:Date.now()+10000,

eggTime:Date.now()+240000

};



document.getElementById("timeBox").style.display="block";


updateGame();


}





// bán trứng

function sellEgg(){


if(game.eggs.normal<=0){

return;

}


game.eggs.normal--;

game.coin+=25;


alert("🥚 +25 xu");


updateGame();


}





setInterval(checkHatch,1000);

setInterval(layingEgg,1000);


updateGame();
