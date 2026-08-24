// ======================================
// CHICKEN FARM
// GAME.JS v0.7.2.1
// FULL VERSION
// ======================================


// ===============================
// CONFIG
// ===============================

const HATCH_TIME = 10000;      // test 10s
const EGG_TIME = 15000;        // test 15s
const EXP_TIME = 1500;         // +2 exp
const AGE_TIME = 120000;       // test tuổi 2 phút



// ===============================
// GAME DATA
// ===============================


let game = {


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




coops:{


// Chuồng thường

normal:{

name:"🏠 Chuồng thường",

open:true,

price:0,

limit:3,

chickens:[]

},



// Chuồng siêu cấp

super:{

name:"🔥 Chuồng siêu cấp",

open:false,

price:25000,

limit:5,

chickens:[]

},



// Chuồng siêu sao

star:{

name:"⭐ Chuồng siêu sao",

open:false,

price:20000,

limit:7,

chickens:[]

}



},




selectedCoop:"normal",


selectedChicken:null



};






let account={


id:10001,


name:"Player",


history:[]


};









// ===============================
// TẠO GÀ
// ===============================


function createChicken(type="normal",first=false){


return {


id:Date.now()+Math.random(),


type:type,


level:first?1:1,


exp:0,


age:0,



hatch:first,


hatchTime:

Date.now()+HATCH_TIME,



eggTime:

Date.now()+EGG_TIME,



maxAge:

type==="diamond"

?

30

:

type==="gold"

?

14

:

7



};


}









// ===============================
// TÊN GÀ
// ===============================


function chickenName(type){


switch(type){


case "super":

return "🔥 Gà siêu cấp";


case "gold":

return "🟡 Gà vàng";


case "diamond":

return "💎 Gà kim cương";


default:

return "🐔 Gà thường";


}


}









// ===============================
// ICON GÀ
// ===============================


function chickenIcon(type,level){


if(type==="diamond")

return "💎🐔";



if(type==="gold")

return "🟡🐔";



if(type==="super")

return "🔥🐔";



if(level<5)

return "🐣";



if(level<10)

return "🐥";



if(level<25)

return "🐓";



return "🐔";


}









// ===============================
// EXP
// ===============================


function needExp(level){


if(level<=1)

return 100;



return 100+(level-1)*50;


}






function levelUp(chicken){


while(

chicken.exp>=needExp(chicken.level)

&&

chicken.level<25

){


chicken.exp-=needExp(chicken.level);


chicken.level++;


}


}









// ===============================
// THÊM GÀ VÀO CHUỒNG
// ===============================


function addChicken(type,coop){


let house=game.coops[coop];



if(!house.open){


alert("Chưa mở chuồng");


return;


}



if(house.chickens.length>=house.limit){


alert("Chuồng đầy");


return;


}



house.chickens.push(

createChicken(type)

);



update();


}









// ===============================
// CHỌN CHUỒNG
// ===============================


function openCoop(type){


let coop=game.coops[type];



if(!coop.open){


if(type==="super"){


if(game.wallet.coin<25000){

alert("Cần 25000 xu");

return;

}


game.wallet.coin-=25000;


}



if(type==="star"){


if(game.wallet.money<20000){


alert("Cần 20000 VNĐ");


return;


}


game.wallet.money-=20000;


}



coop.open=true;


}



game.selectedCoop=type;


game.selectedChicken=null;


update();


}









// ===============================
// LẤY GÀ ĐANG CHỌN
// ===============================


function getCurrentChicken(){


if(game.selectedChicken===null)

return null;



return game.coops[game.selectedCoop]

.chickens[game.selectedChicken];


}
// ===============================
// CHỌN GÀ TRONG CHUỒNG
// ===============================


function selectChicken(index){


game.selectedChicken=index;


openChickenDetail();


update();


}









// ===============================
// POPUP CHI TIẾT GÀ
// ===============================


function openChickenDetail(){


let chicken=getCurrentChicken();



if(!chicken)

return;



let box=document.getElementById("chickenDetail");


let content=document.getElementById("detailContent");



if(!box || !content)

return;



box.style.display="block";




let status="🐣 Gà mới nở";



if(chicken.level>=25)

status="🐔 Trưởng thành";

else if(chicken.level>=10)

status="🐓 Gà lớn";

else if(chicken.level>=5)

status="🐥 Gà con";







let eggTime=Math.max(

0,

Math.ceil(

(chicken.eggTime-Date.now())/1000

)

);





content.innerHTML=


`

<h3>

${chickenIcon(chicken.type,chicken.level)}

${chickenName(chicken.type)}

</h3>



<p>

⭐ Level:

${chicken.level}/25

</p>



<p>

🔥 EXP:

${Math.floor(chicken.exp)}

/

${needExp(chicken.level)}

</p>



<p>

🎂 Tuổi:

${chicken.age}

/

${chicken.maxAge} ngày

</p>



<p>

📌 Trạng thái:

${status}

</p>



<p>

🥚 Đẻ trứng:

${eggTime}s

</p>


`;





let sell=document.getElementById("sellChickenBtn");



if(sell){


if(

chicken.type==="gold"

||

chicken.type==="diamond"

){


sell.innerHTML="🔒 Gà này không bán";


}


else if(chicken.level<25){


sell.innerHTML="🔒 Chưa đủ Lv25";


}


else{


sell.innerHTML="💰 Bán gà";


}


}



updateFeedDetail();



}









function closeChickenDetail(){


let box=document.getElementById("chickenDetail");


if(box)

box.style.display="none";



}









// ===============================
// MENU CÁM DROPDOWN
// ===============================


function toggleFeedMenu(){


let menu=document.getElementById("feedMenu");



if(!menu)

return;



if(menu.style.display==="block"){


menu.style.display="none";


}

else{


menu.style.display="block";


}


}









// ===============================
// CÁM
// ===============================


const feedExp={


normal:40,


super:120,


weight:240,


grow:500,


vip:1000


};









function feedChicken(type){


let chicken=getCurrentChicken();



if(!chicken){


alert("Chọn gà trước");


return;


}



if(chicken.hatch){


alert("Gà chưa nở");


return;


}



if(game.feed[type]<=0){


alert("Hết cám");


return;


}



game.feed[type]--;



chicken.exp+=feedExp[type];



levelUp(chicken);



update();



}









function feedDetailChicken(type){


feedChicken(type);



openChickenDetail();


}









// ===============================
// UPDATE SỐ CÁM TRONG POPUP
// ===============================


function updateFeedDetail(){



let list=[


["detailFeedNormal","normal"],


["detailFeedSuper","super"],


["detailFeedWeight","weight"],


["detailFeedGrow","grow"],


["detailFeedVip","vip"]


];




list.forEach(item=>{


let el=document.getElementById(item[0]);


if(el){


el.innerHTML=

game.feed[item[1]];


}



});


}









// ===============================
// EXP TỰ TĂNG
// ===============================


setInterval(()=>{



Object.values(game.coops)

.forEach(coop=>{



coop.chickens.forEach(chicken=>{



if(

!chicken.hatch

&&

chicken.level<25

){


chicken.exp+=2;



levelUp(chicken);



}



});


});



update();



},EXP_TIME);









// ===============================
// TRỨNG NỞ
// ===============================


setInterval(()=>{


Object.values(game.coops)

.forEach(coop=>{



coop.chickens.forEach(chicken=>{



if(chicken.hatch){



let time=Math.ceil(

(chicken.hatchTime-Date.now())

/1000

);



let box=document.getElementById("hatchTime");



if(time>0){


if(box){


box.style.display="block";


box.innerHTML=

"⏳ Còn "+time+"s";


}


}

else{


chicken.hatch=false;


chicken.level=1;



if(box)


box.style.display="none";



alert(

"🐣 "+chickenName(chicken.type)

+" mới nở!"

);



}



}



});



});



update();



},1000);
// ===============================
// ĐẺ TRỨNG
// ===============================


setInterval(()=>{


Object.values(game.coops)

.forEach(coop=>{


coop.chickens.forEach(chicken=>{



if(

!chicken.hatch

&&

chicken.level>=10

&&

Date.now()>=chicken.eggTime

){



switch(chicken.type){


case "super":

game.eggs.super++;

break;



case "gold":

game.eggs.gold++;

break;



case "diamond":

game.eggs.diamond++;

break;



default:

game.eggs.normal++;

break;


}





chicken.eggTime=

Date.now()+EGG_TIME;



addHistory(

chickenName(chicken.type)

+" đã đẻ trứng"

);



}



});


});



update();



},1000);









// ===============================
// TUỔI GÀ
// ===============================


setInterval(()=>{


Object.values(game.coops)

.forEach(coop=>{



for(let i=coop.chickens.length-1;i>=0;i--){


let chicken=coop.chickens[i];



if(!chicken.hatch){


chicken.age++;



if(chicken.age>=chicken.maxAge){



alert(

chickenName(chicken.type)

+" đã chết"

);



coop.chickens.splice(i,1);



}



}



}



});



update();



},AGE_TIME);









// ===============================
// SHOP GÀ
// ===============================


const chickenCoinPrice={


normal:400,


super:2000


};



const chickenMoneyPrice={


gold:35000,


diamond:80000


};







function buyChicken(type){



let targetCoop;



if(

type==="gold"

||

type==="diamond"

){


targetCoop="star";


if(game.wallet.money < chickenMoneyPrice[type]){


alert("Không đủ VNĐ");


return;


}



game.wallet.money-=chickenMoneyPrice[type];



}

else{



targetCoop=

type==="super"

?

"super"

:

"normal";





if(game.wallet.coin < chickenCoinPrice[type]){


alert("Không đủ xu");


return;


}



game.wallet.coin-=chickenCoinPrice[type];



}



addChicken(type,targetCoop);



addHistory(

"Mua "

+

chickenName(type)

);



update();



}









// ===============================
// SHOP CÁM
// ===============================


const feedPrice={


normal:80,


super:160,


weight:300,


grow:600,


vip:1200


};






function buyFeed(type){



if(game.wallet.coin < feedPrice[type]){


alert("Không đủ xu");


return;


}



game.wallet.coin-=feedPrice[type];



game.feed[type]++;



addHistory(

"Mua cám "

+

type

);



update();



}









// ===============================
// BÁN GÀ
// ===============================


function sellDetailChicken(){



let chicken=getCurrentChicken();



if(!chicken)

return;





if(

chicken.type==="gold"

||

chicken.type==="diamond"

){



alert(

"Gà vàng và kim cương không bán được"

);



return;



}






if(chicken.level<25){



alert(

"Gà phải đạt Lv25 mới bán được"

);



return;



}





let price=



chicken.type==="super"

?


2500


:


600;







game.wallet.coin+=price;



game.coops[game.selectedCoop]

.chickens.splice(

game.selectedChicken,

1

);





addHistory(

"Bán "

+

chickenName(chicken.type)

+

" +"

+

price

+

" xu"

);



game.selectedChicken=null;



closeChickenDetail();


update();



}









// ===============================
// BÁN TRỨNG
// ===============================


const eggPrice={


normal:25,


super:50,


gold:1000,


diamond:3500


};






function sellEgg(type){



if(game.eggs[type]<=0){


alert("Không có trứng");


return;


}



game.eggs[type]--;



game.wallet.coin+=eggPrice[type];



addHistory(

"Bán trứng "

+

type

);



update();



}









// ===============================
// MỞ CHUỒNG HIỂN THỊ
// ===============================


function showCoopInfo(){


let box=document.getElementById("coopAction");



if(!box)

return;




let coop=game.coops[game.selectedCoop];




if(coop.open){


box.innerHTML=

`

<div>

${coop.name}

<br>

Slot:

${coop.chickens.length}/${coop.limit}

</div>

`;



return;


}





if(game.selectedCoop==="super"){



box.innerHTML=

`

🔥 Chuồng siêu cấp

<br>

Giá:

25.000 xu

<br>

<button onclick="openCoop('super')">

Mở chuồng

</button>

`;



}





if(game.selectedCoop==="star"){



box.innerHTML=

`

⭐ Chuồng siêu sao

<br>

Giá:

20.000 VNĐ

<br>

<button onclick="openCoop('star')">

Mở chuồng

</button>

`;



}



}
// ===============================
// TIỀN + VÍ
// ===============================


// 100 VNĐ = 500 xu

function moneyToCoin(){


if(game.wallet.money < 100){


alert("Cần tối thiểu 100 VNĐ");


return;


}



game.wallet.money-=100;


game.wallet.coin+=500;



addHistory(

"Đổi 100 VNĐ → 500 xu"

);



update();



}







// 50000 xu = 500 VNĐ

function coinToMoney(){



if(game.wallet.coin < 50000){


alert("Cần 50000 xu");


return;


}



game.wallet.coin-=50000;


game.wallet.money+=500;



addHistory(

"Đổi 50000 xu → 500 VNĐ"

);



update();



}









// ===============================
// RÚT TIỀN / BANK
// ===============================


function withdrawMoney(){



alert(

"💸 Rút tiền demo: "

+

game.wallet.money

+

" VNĐ"

);



}



function linkBank(){



alert(

"🏦 Đã liên kết Bank demo"

);



}









// ===============================
// NHIỆM VỤ
// ===============================


function getQuestReward(){



game.wallet.coin+=10000;


game.wallet.money+=100000;



addHistory(

"🎯 Nhiệm vụ +10000 xu +100000 VNĐ"

);



alert(

"🎉 Nhận thưởng thành công!"

);



update();



}









// ===============================
// LỊCH SỬ
// ===============================


function addHistory(text){



account.history.unshift(text);



let box=document.getElementById("history");



if(box){


box.innerHTML=

account.history.join("<br>");


}



}









// ===============================
// UPDATE GIAO DIỆN
// ===============================


function update(){



let coin=document.getElementById("coin");

let money=document.getElementById("money");



if(coin)

coin.innerHTML=

game.wallet.coin;



if(money)

money.innerHTML=

game.wallet.money;





let wc=document.getElementById("walletCoin");

let wm=document.getElementById("walletMoney");



if(wc)

wc.innerHTML=

game.wallet.coin;



if(wm)

wm.innerHTML=

game.wallet.money;










// TRỨNG


let eggs=[


["eggNormal","normal"],


["eggSuper","super"],


["eggGold","gold"],


["eggDiamond","diamond"]


];



eggs.forEach(e=>{


let el=document.getElementById(e[0]);


if(el)


el.innerHTML=

game.eggs[e[1]];



});









// CÁM


let feeds=[


["feedNormal","normal"],


["feedSuper","super"],


["feedWeight","weight"],


["feedGrow","grow"],


["feedVip","vip"]


];



feeds.forEach(f=>{


let el=document.getElementById(f[0]);


if(el)


el.innerHTML=

game.feed[f[1]];



});








updateFeedDetail();



renderCoop();



let chicken=getCurrentChicken();



if(chicken){



let main=document.getElementById("mainChicken");



if(main)

main.innerHTML=

chickenIcon(

chicken.type,

chicken.level

);





let status=document.getElementById("mainStatus");



if(status)


status.innerHTML=

chickenName(chicken.type)

+

" Lv "

+

chicken.level;





let lv=document.getElementById("level");


if(lv)

lv.innerHTML=

chicken.level;





let exp=document.getElementById("exp");


if(exp)

exp.innerHTML=

Math.floor(chicken.exp)

+

"/"

+

needExp(chicken.level);





let age=document.getElementById("age");


if(age)

age.innerHTML=

chicken.age;



}



}









// ===============================
// RENDER CHUỒNG
// ===============================


function renderCoop(){



let box=document.getElementById("coopSlots");



if(!box)

return;



box.innerHTML="";



let coop=

game.coops[game.selectedCoop];





let title=document.getElementById("coopTitle");



if(title)

title.innerHTML=

coop.name;





coop.chickens.forEach((c,index)=>{



let div=document.createElement("div");



div.className="slot";



div.onclick=function(){


selectChicken(index);


};





div.innerHTML=


`

<div class="emoji">

${chickenIcon(c.type,c.level)}

</div>



${chickenName(c.type)}

<br>

⭐ Lv ${c.level}

<br>

🔥 ${Math.floor(c.exp)}/${needExp(c.level)}

<br>

🎂 ${c.age}/${c.maxAge}

`;




box.appendChild(div);



});





showCoopInfo();



}









// ===============================
// MENU
// ===============================


function openPage(id){



document.querySelectorAll(".page")

.forEach(page=>{


page.classList.remove("active");


});





let page=document.getElementById(id);



if(page)

page.classList.add("active");



}









// ===============================
// KHỞI TẠO GAME
// ===============================


// Trứng đầu tiên

game.coops.normal.chickens.push(

createChicken(

"normal",

true

)

);




// update lần đầu

update();

