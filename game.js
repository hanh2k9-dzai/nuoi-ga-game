// ======================
// CẤU HÌNH TEST
// ======================

const HATCH_TIME = 10000;

const EGG_TIME = 15000;

const AGE_TIME = 120000;


// ======================
// GIÁ
// ======================

const PRICE_NORMAL = 400;

const PRICE_SUPER = 2000;

const PRICE_SUPER_COOP = 25000;

const SELL_EGG = 25;




// ======================
// CHUỒNG
// ======================


let coop = {

type:"normal",

name:"🏠 Chuồng thường",

capacity:3

};



let coops={


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






// ======================
// GAME DATA
// ======================


let game={


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





let selectedChicken=0;





let account={

id:10001,

name:"ChickenPlayer",

wallet:0

};






// ======================
// THÔNG TIN GÀ
// ======================


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




function needExp(level){

return 100+(level-1)*50;

}






// ======================
// UPDATE
// ======================


function updateGame(){


let c=game.chickens[selectedChicken];



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



document.getElementById("age").innerHTML=

c.age;


document.getElementById("maxAge").innerHTML=

c.maxAge;



document.getElementById("selectedChicken").innerHTML=

chickenName(c.type)+
" Lv "+c.level;


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








// ======================
// HIỂN THỊ CHUỒNG
// ======================


function renderCoop(){


let box=document.getElementById("chickenSlots");


box.innerHTML="";



for(let i=0;i<coop.capacity;i++){


let c=game.chickens[i];


let div=document.createElement("div");


div.className="slot";



if(c){



div.onclick=function(){

selectChicken(i);

};



div.innerHTML=

`

<div class="emoji">

${chickenIcon(c.type)}

</div>


${chickenName(c.type)}


<br>

⭐ Lv ${c.level}


<br>

🔥 ${Math.floor(c.exp)}/${needExp(c.level)}


<br>

🎂 ${c.age}/${c.maxAge}


`;



}

else{


div.innerHTML=

`

<div class="emoji">
🥚
</div>

Slot trống

`;

}


box.appendChild(div);


}



}









// ======================
// CHỌN GÀ
// ======================


function selectChicken(index){


selectedChicken=index;


updateGame();


}








// ======================
// EXP
// ======================


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








// ======================
// CÁM
// ======================


function feedChicken(amount){


let c=game.chickens[selectedChicken];



if(!c){

alert("Chọn gà trước");

return;

}



c.exp+=amount;


levelUp(c);


updateGame();


}









// ======================
// ĐẺ TRỨNG
// ======================


setInterval(()=>{


game.chickens.forEach(c=>{


if(c.level>=10){



if(Date.now()>=c.eggTime){



if(c.type==="super"){


game.eggs.super++;


}

else if(c.type==="gold"){


game.eggs.gold++;


}

else if(c.type==="diamond"){


game.eggs.diamond++;


}

else{


game.eggs.normal++;


}



c.eggTime=

Date.now()+EGG_TIME;



}



}



});



updateGame();



},1000);









// ======================
// SHOP GÀ
// ======================


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


maxAge:

type==="diamond"?30:

type==="gold"?14:

7,


eggTime:Date.now()+EGG_TIME


});



updateGame();


}







function buyNormalChicken(){


if(game.coin<PRICE_NORMAL){

alert("Không đủ xu");

return;

}



game.coin-=PRICE_NORMAL;


addChicken("normal");


}







function buySuperChicken(){


if(game.coin<PRICE_SUPER){

alert("Không đủ xu");

return;

}



game.coin-=PRICE_SUPER;


addChicken("super");


}







function buyGoldChicken(){


alert("🟡 Demo mua bằng 35000đ");


}




function buyDiamondChicken(){


alert("💎 Demo mua bằng 80000đ");


}








// ======================
// CHUỒNG
// ======================


function buySuperCoop(){


if(game.coin<PRICE_SUPER_COOP){


alert("Cần 25000 xu");


return;


}



game.coin-=PRICE_SUPER_COOP;


coop=coops.super;


updateGame();


}







function buyStarCoop(){


alert("⭐ Demo mở bằng 20000đ");


}








// ======================
// KHO
// ======================


function sellNormalEgg(){


if(game.eggs.normal<=0)

return;



game.eggs.normal--;


game.coin+=SELL_EGG;


updateGame();


}








// ======================
// MENU
// ======================


function openPage(id){


document.querySelectorAll(".page")
.forEach(p=>{


p.classList.remove("active");


});


document.getElementById(id)
.classList.add("active");


}








// ======================
// NHIỆM VỤ
// ======================


function questReward(){


let reward=

Math.floor(Math.random()*4501)+500;



game.coin+=reward;


alert("🎁 +"+reward+" xu");


updateGame();


}








// ======================
// RÚT DEMO
// ======================


function withdrawDemo(){


account.wallet+=game.coin;


game.coin=0;



document.getElementById("wallet").innerHTML=

account.wallet;


updateGame();


}








// ======================
// TUỔI GÀ
// ======================


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



if(selectedChicken>=game.chickens.length){

selectedChicken=0;

}



updateGame();



},AGE_TIME);








updateGame();
