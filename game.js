// =======================
// CẤU HÌNH TEST
// =======================

const HATCH_TIME = 10000; // trứng nở 10s

const EGG_TIME = 15000; // đẻ trứng 15s

const AGE_TIME = 120000; // 2 phút = 1 ngày



// =======================
// GIÁ GAME
// =======================

const SELL_CHICKEN = 600;

const SELL_EGG = 25;

const BUY_EGG = 250;




// =======================
// DỮ LIỆU GAME
// =======================


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

age:0,

maxAge:7,

hatchTime:Date.now()+HATCH_TIME,

eggTime:Date.now()+EGG_TIME

}

]


};




// Tài khoản demo

let account = {

id:10001,

name:"ChickenPlayer",

wallet:0

};






function chicken(){

return game.chickens[0];

}





// EXP cần lên cấp

function needExp(level){

return 100 + ((level-1)*50);

}








// =======================
// UPDATE GIAO DIỆN
// =======================


function updateGame(){


let c = chicken();



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

Math.floor(c.exp)+"/"+needExp(c.level);



document.getElementById("coin").innerHTML=

game.coin;



document.getElementById("egg").innerHTML=

game.eggs.normal;



document.getElementById("age").innerHTML=

c.age;




if(c.level>=25){

document.getElementById("sellButton").style.display="inline-block";

}

else{

document.getElementById("sellButton").style.display="none";

}



// cập nhật chuồng

document.getElementById("coopInfo").innerHTML=

"🐔 "+name+
"<br>⭐ Lv "+c.level+
"<br>🔥 EXP "+Math.floor(c.exp)+
"/"+needExp(c.level)+
"<br>🎂 Tuổi "+c.age+"/"+c.maxAge;



// cập nhật kho

document.getElementById("storageEgg").innerHTML=

game.eggs.normal;



}









// =======================
// TRỨNG NỞ
// =======================


function checkHatch(){


let c=chicken();



if(c.level===0){


let t=Math.ceil(

(c.hatchTime-Date.now())/1000

);



if(t>0){

document.getElementById("time").innerHTML=

"🥚 Còn "+t+"s";

}



if(t<=0){


c.level=1;


alert("🐣 Trứng đã nở!");

}


}


updateGame();


}










// =======================
// EXP TỰ TĂNG
// =======================


setInterval(()=>{


let c=chicken();



if(c.level>0 && c.level<25){


c.exp+=2;


levelUp();


}



updateGame();



},1500);







function levelUp(){


let c=chicken();



while(c.exp>=needExp(c.level)){


c.exp-=needExp(c.level);


c.level++;


alert(

"🎉 Gà lên Lv "+c.level

);


}


}









// =======================
// CÁM
// =======================


function feed(amount){


let c=chicken();



if(c.level===0){

alert("🥚 Trứng chưa nở!");

return;

}



c.exp+=amount;


levelUp();


updateGame();


}



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









// =======================
// ĐẺ TRỨNG
// =======================


function layingEgg(){


let c=chicken();



if(c.level<10){

return;

}



if(Date.now()>=c.eggTime){


game.eggs.normal++;


alert("🥚 Gà đã đẻ trứng");


c.eggTime=

Date.now()+EGG_TIME;


}



updateGame();


}









// =======================
// BÁN TRỨNG
// =======================


function sellEgg(){


if(game.eggs.normal<=0){

alert("Không có trứng");

return;

}



game.eggs.normal--;


game.coin+=SELL_EGG;



updateGame();


}









// =======================
// BÁN GÀ
// =======================


function sellChicken(){


let c=chicken();



if(c.level<25){

return;

}



game.coin+=SELL_CHICKEN;



alert("🐔 Bán gà +600 xu");



game.chickens[0]={


type:"normal",

level:0,

exp:0,

age:0,

maxAge:7,

hatchTime:Date.now()+HATCH_TIME,

eggTime:Date.now()+EGG_TIME


};



updateGame();


}









// =======================
// TUỔI GÀ
// =======================


setInterval(()=>{


let c=chicken();



if(c.level>0){


c.age++;



if(c.age>=c.maxAge){


alert("💀 Gà hết tuổi thọ");



game.chickens[0]={


type:"normal",

level:0,

exp:0,

age:0,

maxAge:7,

hatchTime:Date.now()+HATCH_TIME,

eggTime:Date.now()+EGG_TIME


};



}


}



updateGame();



},AGE_TIME);









// =======================
// MENU
// =======================


function openPage(page){


let pages=document.querySelectorAll(".page");


pages.forEach(p=>{

p.classList.remove("active");

});



document.getElementById(page).classList.add("active");



}









// =======================
// SHOP
// =======================


function buyEgg(){


if(game.coin<BUY_EGG){

alert("Không đủ xu");

return;

}



game.coin-=BUY_EGG;


game.eggs.normal++;


alert("🥚 Mua trứng thành công");


updateGame();


}









// =======================
// NHIỆM VỤ
// =======================


function questReward(){


let reward=Math.floor(

Math.random()*4501

)+500;



game.coin+=reward;



alert(

"🎁 Nhận "+reward+" xu"

);



updateGame();


}









// =======================
// TÀI KHOẢN
// =======================


function withdrawDemo(){


if(game.coin<=0){

alert("Chưa có xu");

return;

}



account.wallet+=game.coin;


game.coin=0;



document.getElementById("wallet").innerHTML=

account.wallet;



alert("💸 Rút demo thành công");


updateGame();


}






// =======================
// CHẠY GAME
// =======================


setInterval(checkHatch,1000);


setInterval(layingEgg,1000);



updateGame();
