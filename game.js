// ==========================
// CONFIG TEST
// ==========================

const HATCH_TIME = 10000;

const AGE_TIME = 120000;

const EGG_TIME = 15000;


// ==========================
// GIÁ
// ==========================

const SELL_PRICE = {

normal:600,

super:2500

};


const EGG_PRICE = {

normal:25,

super:50,

gold:1000,

diamond:3500

};



// ==========================
// GAME DATA
// ==========================


let game={


wallet:{


coin:0,

money:0


},



eggs:{


normal:0,

super:0,

gold:0,

diamond:0


},



feed:{


normal:0,

super:0,

weight:0,

grow:0,

vip:0


},



chickens:[


{

id:1,

type:"normal",

level:0,

exp:0,

age:0,

maxAge:7,

hatch:true,

hatchTime:Date.now()+HATCH_TIME,

eggTime:Date.now()+EGG_TIME


}


],



coop:{


type:"normal",

limit:3


}


};






let account={


id:10001,

name:"ChickenPlayer",


history:[]


};








// ==========================
// DATA
// ==========================


function needExp(level){

return 100+(level-1)*50;

}




function chickenName(type){


if(type==="super")

return "🔥 Gà siêu cấp";


if(type==="gold")

return "🟡 Gà vàng";


if(type==="diamond")

return "💎 Gà kim cương";


return "🐔 Gà thường";


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









// ==========================
// UPDATE
// ==========================


function update(){



let c=game.chickens[0];



document.getElementById("coin").innerHTML=
game.wallet.coin;



document.getElementById("money").innerHTML=
game.wallet.money;



document.getElementById("walletCoin").innerHTML=
game.wallet.coin;



document.getElementById("walletMoney").innerHTML=
game.wallet.money;




document.getElementById("eggNormal").innerHTML=
game.eggs.normal;


document.getElementById("eggSuper").innerHTML=
game.eggs.super;


document.getElementById("eggGold").innerHTML=
game.eggs.gold;


document.getElementById("eggDiamond").innerHTML=
game.eggs.diamond;





if(c){


document.getElementById("mainChicken").innerHTML=

chickenIcon(c.type);



if(c.hatch){


document.getElementById("mainStatus").innerHTML=

"🥚 Trứng đang nở";


}

else{


document.getElementById("mainStatus").innerHTML=

chickenName(c.type)+
" Lv "+
c.level;



}



document.getElementById("level").innerHTML=
c.level;



document.getElementById("exp").innerHTML=

Math.floor(c.exp)+"/"+needExp(c.level);



document.getElementById("age").innerHTML=

c.age;



}




renderCoop();



}





// ==========================
// TRỨNG NỞ
// ==========================


setInterval(()=>{


let c=game.chickens[0];


if(c && c.hatch){


let t=Math.ceil(
(c.hatchTime-Date.now())/1000
);



document.getElementById("hatchTime").innerHTML=

"⏳ Còn "+t+"s";



if(t<=0){


c.hatch=false;

c.level=1;



document.getElementById("hatchTime").innerHTML="";

alert("🐣 Gà mới nở Lv1");


}



}


update();


},1000);









// ==========================
// CHUỒNG
// ==========================


function renderCoop(){


let box=document.getElementById("chickenSlots");


if(!box)return;


box.innerHTML="";



document.getElementById("chickenCount").innerHTML=
game.chickens.length;


document.getElementById("coopLimit").innerHTML=
game.coop.limit;




game.chickens.forEach((c,i)=>{


let div=document.createElement("div");


div.className="slot";


div.onclick=function(){

selectedChicken=i;

};




div.innerHTML=

`

<div class="emoji">

${chickenIcon(c.type)}

</div>


${chickenName(c.type)}

<br>

Lv ${c.level}

<br>

EXP ${Math.floor(c.exp)}

<br>

Tuổi ${c.age}/${c.maxAge}


`;



box.appendChild(div);


});



}






let selectedChicken=0;







// ==========================
// EXP + CẤP
// ==========================


setInterval(()=>{


game.chickens.forEach(c=>{


if(!c.hatch && c.level<25){


c.exp+=2;


levelUp(c);


}



});



update();


},1500);







function levelUp(c){


while(c.exp>=needExp(c.level)){


c.exp-=needExp(c.level);

c.level++;



}


}








// ==========================
// CHO ĂN
// ==========================


let feedExp={


normal:40,

super:120,

weight:240,

grow:500,

vip:1000


};





function feedChicken(type){


let c=game.chickens[selectedChicken];


if(!c || c.hatch)return;



if(game.feed[type]<=0){

alert("Hết cám");

return;

}



game.feed[type]--;


c.exp+=feedExp[type];


levelUp(c);



update();



}









// ==========================
// SHOP CÁM
// ==========================


let feedPrice={


normal:80,

super:160,

weight:300,

grow:600,

vip:1200


};





function buyFeed(type){


if(game.wallet.coin<feedPrice[type]){


alert("Không đủ xu");

return;

}


game.wallet.coin-=feedPrice[type];


game.feed[type]++;


update();


}









// ==========================
// ĐẺ TRỨNG
// ==========================


setInterval(()=>{


game.chickens.forEach(c=>{


if(!c.hatch && c.level>=10){



if(Date.now()>=c.eggTime){



if(c.type==="super")

game.eggs.super++;


else if(c.type==="gold")

game.eggs.gold++;


else if(c.type==="diamond")

game.eggs.diamond++;


else

game.eggs.normal++;




c.eggTime=
Date.now()+EGG_TIME;


}



}



});



update();


},1000);









// ==========================
// SHOP GÀ
// ==========================


function buyChicken(type){


if(game.chickens.length>=game.coop.limit){

alert("Chuồng đầy");

return;

}



let price={

normal:400,

super:2000

};



if(type==="gold"||type==="diamond"){


alert("Demo tiền thật");

return;


}



if(game.wallet.coin<price[type]){


alert("Không đủ xu");

return;

}



game.wallet.coin-=price[type];



game.chickens.push({


id:Date.now(),


type:type,

level:1,

exp:0,

age:0,

maxAge:

type==="gold"?14:

type==="diamond"?30:

7,

hatch:false,

eggTime:Date.now()+EGG_TIME


});



update();


}









// ==========================
// BÁN TRỨNG
// ==========================


function sellEgg(type){


if(game.eggs[type]<=0)return;



game.eggs[type]--;


game.wallet.coin+=EGG_PRICE[type];



addHistory(

"Bán trứng "+type+
" +"+EGG_PRICE[type]+" xu"

);



update();


}









// ==========================
// BÁN GÀ
// ==========================


function sellChicken(index){


let c=game.chickens[index];


if(c.type==="gold"||c.type==="diamond")

return;


if(c.level<25)

return;



game.wallet.coin+=SELL_PRICE[c.type];


game.chickens.splice(index,1);


update();


}









// ==========================
// CHUỒNG
// ==========================


function changeSuperCoop(){


if(game.wallet.coin<25000)return;


game.wallet.coin-=25000;


game.coop.type="super";


game.coop.limit=5;


update();


}





function changeStarCoop(){


if(game.wallet.money<20000){

alert("Cần 20000 VNĐ");

return;

}



game.wallet.money-=20000;


game.coop.type="star";


game.coop.limit=7;


update();


}









// ==========================
// NHIỆM VỤ
// ==========================


function getQuestReward(){


game.wallet.coin+=10000;


addHistory(
"Nhận nhiệm vụ +10000 xu"
);


update();


}









// ==========================
// TIỀN
// ==========================


function exchangeMoney(){


if(game.wallet.coin<50000)return;



game.wallet.coin-=50000;


game.wallet.money+=500;



addHistory(
"Đổi 50000 xu lấy 500 VNĐ"
);


update();


}







function withdrawMoney(){


alert(
"Demo rút tiền: "+
game.wallet.money+
" VNĐ"
);


}







function linkBank(){


alert("🏦 Đã liên kết bank demo");


}








function addHistory(text){


account.history.push(text);



document.getElementById("history").innerHTML=

account.history.join("<br>");



}








// ==========================
// MENU
// ==========================


function openPage(id){


document.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));



document.getElementById(id)
.classList.add("active");


}








// ==========================
// TUỔI
// ==========================


setInterval(()=>{


game.chickens.forEach((c,i)=>{


if(!c.hatch){


c.age++;



if(c.age>=c.maxAge){


alert(chickenName(c.type)+" đã chết");


game.chickens.splice(i,1);


}



}



});



update();


},AGE_TIME);







update();
