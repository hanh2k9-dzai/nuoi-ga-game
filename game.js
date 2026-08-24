// ==========================
// CẤU HÌNH TEST
// ==========================

const HATCH_TIME = 10000;

const EGG_TIME = 15000;

const AGE_TIME = 120000;


// ==========================
// GIÁ
// ==========================

const PRICE_NORMAL = 400;

const PRICE_SUPER = 2000;

const PRICE_SUPER_COOP = 25000;

const SELL_EGG = 25;





// ==========================
// DỮ LIỆU CHUỒNG
// ==========================


let coop = {

type:"normal",

name:"🏠 Chuồng thường",

capacity:3,

};



let coopList = {


normal:{

name:"🏠 Chuồng thường",

capacity:3

},


super:{

name:"🔥 Chuồng siêu cấp",

capacity:5

},


star:{

name:"⭐ Chuồng siêu sao",

capacity:7

}


};







// ==========================
// GAME DATA
// ==========================


let game = {


coin:0,


eggs:{


normal:0,

super:0,

gold:0,

diamond:0


},



chickens:[


{

id:1,

type:"normal",

level:1,

exp:0,

age:0,

maxAge:7,

eggTime:Date.now()+EGG_TIME


}


]


};








let account={


id:10001,

name:"ChickenPlayer",

wallet:0


};








// ==========================
// GÀ
// ==========================


function getChicken(id){

return game.chickens.find(c=>c.id===id);

}



function needExp(level){

return 100+(level-1)*50;

}







function chickenIcon(type){


if(type==="super")

return "🔥🐔";


if(type==="gold")

return "🟡🐔";


if(type==="diamond")

return "💎🐔";



return "🐔";


}







function chickenName(type){


if(type==="super")

return "Gà siêu cấp";


if(type==="gold")

return "Gà vàng";


if(type==="diamond")

return "Gà kim cương";


return "Gà thường";


}










// ==========================
// UPDATE
// ==========================


function updateGame(){


let c=game.chickens[0];



if(c){


document.getElementById("mainChicken").innerHTML=

chickenIcon(c.type);



document.getElementById("mainStatus").innerHTML=

chickenName(c.type)+
" Lv "+c.level;



document.getElementById("level").innerHTML=

c.level;



document.getElementById("exp").innerHTML=

Math.floor(c.exp)+"/"+needExp(c.level);



}




document.getElementById("coin").innerHTML=

game.coin;



document.getElementById("egg").innerHTML=

game.eggs.normal;



document.getElementById("normalEgg").innerHTML=

game.eggs.normal;


document.getElementById("superEgg").innerHTML=

game.eggs.super;


document.getElementById("goldEgg").innerHTML=

game.eggs.gold;


document.getElementById("diamondEgg").innerHTML=

game.eggs.diamond;



document.getElementById("coopName").innerHTML=

coop.name;


document.getElementById("coopCapacity").innerHTML=

coop.capacity;



renderCoop();


}








// ==========================
// HIỂN THỊ CHUỒNG
// ==========================


function renderCoop(){


let box=document.getElementById("chickenSlots");


box.innerHTML="";



for(let i=0;i<coop.capacity;i++){


let chicken=game.chickens[i];



let div=document.createElement("div");


div.className="slot";



if(chicken){


div.innerHTML=

`
<div class="emoji">
${chickenIcon(chicken.type)}
</div>

${chickenName(chicken.type)}

<br>

Lv ${chicken.level}

<br>

Tuổi ${chicken.age}/${chicken.maxAge}

`;


}

else{


div.innerHTML=

`
🥚
<br>
Slot trống
`;

}



box.appendChild(div);



}



}









// ==========================
// EXP
// ==========================


setInterval(()=>{


game.chickens.forEach(c=>{


if(c.level<25){


c.exp+=2;


levelUp(c);


}


});



updateGame();


},1500);








function levelUp(c){


while(c.exp>=needExp(c.level)){


c.exp-=needExp(c.level);


c.level++;


alert(

chickenName(c.type)+
" lên Lv "+
c.level

);



}


}









// ==========================
// CHO ĂN
// ==========================


function feedSelected(exp){


let c=game.chickens[0];


if(!c)return;


c.exp+=exp;


levelUp(c);


updateGame();


}









// ==========================
// ĐẺ TRỨNG
// ==========================


setInterval(()=>{


game.chickens.forEach(c=>{


if(c.level>=10){


if(Date.now()>=c.eggTime){



if(c.type==="super"){


game.eggs.super++;


}

else{


game.eggs.normal++;


}



c.eggTime=
Date.now()+EGG_TIME;



alert(
chickenName(c.type)+" đẻ trứng"
);



}



}



});



updateGame();



},1000);









// ==========================
// SHOP MUA GÀ
// ==========================


function addChicken(type){


if(game.chickens.length>=coop.capacity){

alert("Chuồng đầy");

return;

}



game.chickens.push({


id:Date.now(),


type:type,


level:1,


exp:0,


age:0,


maxAge:type==="diamond"?30:
type==="gold"?14:7,


eggTime:Date.now()+EGG_TIME


});


renderCoop();


}






function buyNormalChicken(){


if(game.coin<PRICE_NORMAL){

alert("Không đủ xu");

return;

}


game.coin-=PRICE_NORMAL;


addChicken("normal");


updateGame();


}







function buySuperChicken(){


if(game.coin<PRICE_SUPER){

alert("Không đủ xu");

return;

}


game.coin-=PRICE_SUPER;


addChicken("super");


updateGame();


}









// ==========================
// CHUỒNG
// ==========================


function buySuperCoop(){


if(game.coin<PRICE_SUPER_COOP){

alert("Cần 25000 xu");

return;

}


game.coin-=PRICE_SUPER_COOP;


coop=coopList.super;


updateGame();


}






function buyStarCoop(){


alert(
"⭐ Demo mở bằng 20000đ"
);


}









// ==========================
// MENU
// ==========================


function openPage(id){


document.querySelectorAll(".page")
.forEach(p=>{


p.classList.remove("active");


});



document.getElementById(id)
.classList.add("active");


}









// ==========================
// KHO / BÁN TRỨNG
// ==========================


function sellEgg(){


if(game.eggs.normal<=0)

return;


game.eggs.normal--;

game.coin+=SELL_EGG;


updateGame();


}









// ==========================
// NHIỆM VỤ
// ==========================


function questReward(){


let reward=
Math.floor(Math.random()*4501)+500;


game.coin+=reward;


alert(
"🎁 +"+reward+" xu"
);


updateGame();


}









// ==========================
// RÚT DEMO
// ==========================


function withdrawDemo(){


account.wallet+=game.coin;


game.coin=0;


document.getElementById("wallet").innerHTML=

account.wallet;


updateGame();


}









// ==========================
// TUỔI
// ==========================


setInterval(()=>{


game.chickens.forEach(c=>{


c.age++;


if(c.age>=c.maxAge){


alert(
chickenName(c.type)+" hết tuổi"
);


game.chickens=
game.chickens.filter(x=>x.id!==c.id);



}



});



updateGame();



},AGE_TIME);










updateGame();
