// ======================================
// CHICKEN FARM
// GAME.JS v0.7.5 FULL FIX
// ======================================


// ===============================
// CONFIG
// ===============================

const HATCH_TIME = 10000;     // test 10s
const EGG_TIME = 15000;       // test 15s
const LIFE_TIME = 120000;     // test tuổi


// ===============================
// DATA GAME
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



// gà chưa thả

chickenStorage:[],



// chuồng

coops:{


normal:{


name:"🏠 Chuồng thường",

open:true,

limit:3,

chickens:[]


},



super:{


name:"🔥 Chuồng siêu cấp",

open:false,

price:25000,

limit:5,

chickens:[]


},



star:{


name:"⭐ Chuồng siêu sao",

open:false,

price:20000,

limit:7,

chickens:[]


}



},




selectedCoop:"normal",


selectedChicken:null,


selectedStorageChicken:null,


// gà đang hiện ở trang chủ

mainChicken:null



};









let account={


id:10001,


name:"Player",


history:[]


};









// ===============================
// TẠO GÀ
// ===============================


function createChicken(type="normal"){



return {


id:Date.now()+Math.random(),



type:type,



level:1,



exp:0,



birthTime:Date.now(),



hatch:true,



hatchTime:Date.now()+HATCH_TIME,



eggTime:Date.now()+EGG_TIME,



maxAge:

type==="diamond"

?

30*LIFE_TIME

:

type==="gold"

?

14*LIFE_TIME

:

7*LIFE_TIME



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
// LẤY GÀ
// ===============================


function getCurrentChicken(){



if(game.selectedChicken===null)

return null;



return game.coops[game.selectedCoop]

.chickens[game.selectedChicken];



}
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









// ===============================
// MUA GÀ VÀO KHO
// ===============================


function buyChicken(type){



if(

type==="gold"

||

type==="diamond"

){



if(

game.wallet.money < chickenMoneyPrice[type]

){



alert("Không đủ VNĐ");


return;


}



game.wallet.money-=chickenMoneyPrice[type];



}

else{



if(

game.wallet.coin < chickenCoinPrice[type]

){



alert("Không đủ xu");


return;


}



game.wallet.coin-=chickenCoinPrice[type];



}





let chicken=createChicken(type);



game.chickenStorage.push(chicken);



addHistory(

"Mua "+chickenName(type)

);



update();



}









// ===============================
// CHỌN GÀ TRONG KHO
// ===============================


function selectStorageChicken(index){



game.selectedStorageChicken=index;



let chicken=

game.chickenStorage[index];



if(chicken){


alert(

"Đã chọn "

+

chickenName(chicken.type)

);



}



renderStorage();



}









// ===============================
// KIỂM TRA LOẠI CHUỒNG
// ===============================


function canPutChicken(coop,type){



// Chuồng thường

if(coop==="normal"){


return type==="normal";


}




// Chuồng siêu cấp

if(coop==="super"){


return (

type==="normal"

||

type==="super"

);



}





// Chuồng siêu sao

if(coop==="star"){


return true;


}




return false;



}









// ===============================
// THẢ GÀ VÀO CHUỒNG
// ===============================


function putChickenToCoop(coopType){



let index=

game.selectedStorageChicken;



if(index===null){



alert("Chọn gà trước");


return;


}



let chicken=

game.chickenStorage[index];



if(!chicken)

return;






if(

!canPutChicken(

coopType,

chicken.type

)

){



alert(

"Gà này không phù hợp chuồng này"

);



return;


}







let coop=

game.coops[coopType];



if(!coop.open){



alert(

"Chuồng chưa mở"

);



return;


}






if(

coop.chickens.length>=coop.limit

){



alert(

"Chuồng đã đầy"

);



return;


}







coop.chickens.push(chicken);



game.chickenStorage.splice(index,1);



game.selectedStorageChicken=null;



game.selectedCoop=coopType;



// chọn luôn con vừa thả

game.selectedChicken=

coop.chickens.length-1;



game.mainChicken=chicken;



update();



}









// ===============================
// MỞ CHUỒNG
// ===============================


function openCoop(type){



let coop=

game.coops[type];



if(!coop.open){



if(type==="super"){



if(game.wallet.coin<25000){



alert(

"Cần 25000 xu"

);



return;


}



game.wallet.coin-=25000;



}







if(type==="star"){



if(game.wallet.money<20000){



alert(

"Cần 20000 VNĐ"

);



return;


}



game.wallet.money-=20000;



}





coop.open=true;



addHistory(

"Mở "

+

coop.name

);



}



game.selectedCoop=type;



update();



}









// ===============================
// RENDER KHO GÀ
// ===============================


function renderStorage(){



let box=document.getElementById(

"chickenStorage"

);



if(!box)

return;



box.innerHTML="";





game.chickenStorage.forEach((c,index)=>{



let div=document.createElement("div");



div.className="storageChicken";



div.onclick=function(){


selectStorageChicken(index);


};





div.innerHTML=

`

<div class="emoji">

${chickenIcon(c.type,c.level)}

</div>



${chickenName(c.type)}

<br>

⭐ Lv ${c.level}



<br><br>



<button onclick="event.stopPropagation();putChickenToCoop('normal')">

🏠

</button>



<button onclick="event.stopPropagation();putChickenToCoop('super')">

🔥

</button>



<button onclick="event.stopPropagation();putChickenToCoop('star')">

⭐

</button>


`;




box.appendChild(div);



});



}









// ===============================
// RENDER CHUỒNG
// ===============================


function renderCoop(){



let box=document.getElementById(

"coopSlots"

);



if(!box)

return;



box.innerHTML="";



let coop=

game.coops[game.selectedCoop];



let title=

document.getElementById(

"coopTitle"

);



if(title){


title.innerHTML=

coop.name

+

" "

+

coop.chickens.length

+

"/"

+

coop.limit;



}







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



`;




box.appendChild(div);



});



}
// ===============================
// CHỌN GÀ TRONG CHUỒNG
// ===============================


function selectChicken(index){


game.selectedChicken=index;



game.mainChicken=

game.coops[game.selectedCoop]

.chickens[index];



updateMainChicken();



openChickenDetail();



update();



}









// ===============================
// LẤY GÀ TRANG CHỦ
// ===============================


function getMainChicken(){



if(game.mainChicken)

return game.mainChicken;



if(game.chickenStorage.length>0)

return game.chickenStorage[0];



return null;



}









// ===============================
// UPDATE GÀ TRANG CHỦ
// ===============================


function updateMainChicken(){



let chicken=

getMainChicken();



if(!chicken)

return;





let img=

document.getElementById(

"mainChicken"

);



let status=

document.getElementById(

"mainStatus"

);



if(img){



if(chicken.hatch){



img.innerHTML="🥚";



}

else{



img.innerHTML=

chickenIcon(

chicken.type,

chicken.level

);



}



}





if(status){



status.innerHTML=

chickenName(

chicken.type

)

+

" Lv "

+

chicken.level;



}





let lv=

document.getElementById(

"level"

);



let exp=

document.getElementById(

"exp"

);



let age=

document.getElementById(

"age"

);





if(lv)

lv.innerHTML=

chicken.level;



if(exp)

exp.innerHTML=

Math.floor(chicken.exp)

+

"/"

+

needExp(chicken.level);



if(age)



age.innerHTML=

Math.floor(

(Date.now()-chicken.birthTime)

/

LIFE_TIME

);



}









// ===============================
// POPUP CHI TIẾT GÀ
// ===============================


function openChickenDetail(){



let chicken=

getCurrentChicken();



if(!chicken)

return;





let box=

document.getElementById(

"chickenDetail"

);



let content=

document.getElementById(

"detailContent"

);



if(!box || !content)

return;



box.style.display="block";





let age=

Math.floor(

(Date.now()-chicken.birthTime)

/

LIFE_TIME

);





let egg=

Math.max(

0,

Math.ceil(

(chicken.eggTime-Date.now())

/

1000

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

${age}

</p>



<p>

🥚 Đẻ trứng:

${egg}s

</p>

`;





}



function closeChickenDetail(){



let box=

document.getElementById(

"chickenDetail"

);



if(box)

box.style.display="none";



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









function toggleFeedMenu(){



let menu=

document.getElementById(

"feedMenu"

);



if(!menu)

return;



menu.style.display=

menu.style.display==="block"

?

"none"

:

"block";



}









function feedChicken(type){



let chicken=

getCurrentChicken();



if(!chicken){



alert(

"Chọn gà trước"

);



return;


}





if(chicken.hatch){



alert(

"Gà chưa nở"

);



return;


}





if(game.feed[type]<=0){



alert(

"Hết cám"

);



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
// CẬP NHẬT SỐ CÁM
// ===============================


function updateFeedDetail(){



let list=[



["detailFeedNormal","normal"],



["detailFeedSuper","super"],



["detailFeedWeight","weight"],



["detailFeedGrow","grow"],



["detailFeedVip","vip"]



];




list.forEach(x=>{



let el=

document.getElementById(x[0]);



if(el)



el.innerHTML=

game.feed[x[1]];



});



}
// ===============================
// TIMER TRANG CHỦ + NỞ TRỨNG
// ===============================


function updateMainTimer(){



let chicken=getMainChicken();



if(!chicken)

return;



let box=document.getElementById(

"hatchTime"

);



if(chicken.hatch){



let time=Math.max(

0,

Math.ceil(

(chicken.hatchTime-Date.now())

/1000

)

);



if(box)

box.innerHTML=

"🥚 Còn "

+

time

+

"s";





if(time<=0){



chicken.hatch=false;



chicken.birthTime=Date.now();



chicken.eggTime=

Date.now()+EGG_TIME;



}



}



else{



if(box)

box.innerHTML=

"🐔 Đã nở";



}



updateMainChicken();



}









setInterval(()=>{


updateMainTimer();


},1000);









// ===============================
// NỞ TRỨNG TRONG CHUỒNG
// ===============================


setInterval(()=>{



Object.values(game.coops)

.forEach(coop=>{



coop.chickens.forEach(c=>{



if(

c.hatch

&&

Date.now()>=c.hatchTime

){



c.hatch=false;



c.birthTime=Date.now();



c.eggTime=

Date.now()+EGG_TIME;



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



coop.chickens.forEach(c=>{



if(

!c.hatch

&&

c.level>=10

&&

Date.now()>=c.eggTime

){



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



addHistory(

chickenName(c.type)

+

" đẻ trứng"

);



}



});



});



update();



},1000);









// ===============================
// TUỔI GÀ + CHẾT
// ===============================


setInterval(()=>{



Object.values(game.coops)

.forEach(coop=>{



for(

let i=coop.chickens.length-1;

i>=0;

i--

){



let c=

coop.chickens[i];



if(

!c.hatch

&&

Date.now()-c.birthTime>=c.maxAge

){



alert(

chickenName(c.type)

+

" đã chết"

);



coop.chickens.splice(i,1);



}



}



});



update();



},1000);









// ===============================
// EXP TỰ TĂNG
// ===============================


setInterval(()=>{



Object.values(game.coops)

.forEach(coop=>{



coop.chickens.forEach(c=>{



if(

!c.hatch

&&

c.level<25

){



c.exp+=2;



levelUp(c);



}



});



});



update();



},1500);









// ===============================
// SHOP GÀ
// ===============================


const chickenShopCoin={



normal:400,


super:2000



};



const chickenShopMoney={



gold:35000,


diamond:80000



};









function buyChickenShop(type){



if(

type==="gold"

||

type==="diamond"

){



if(

game.wallet.money<chickenShopMoney[type]

){



alert(

"Không đủ VNĐ"

);



return;


}



game.wallet.money-=chickenShopMoney[type];



}



else{



if(

game.wallet.coin<chickenShopCoin[type]

){



alert(

"Không đủ xu"

);



return;


}



game.wallet.coin-=chickenShopCoin[type];



}







game.chickenStorage.push(

createChicken(type)

);



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



if(

game.wallet.coin<feedPrice[type]

){



alert(

"Không đủ xu"

);



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



let c=getCurrentChicken();



if(!c)

return;





if(

c.type==="gold"

||

c.type==="diamond"

){



alert(

"Gà vàng và kim cương không thể bán"

);



return;


}





if(c.level<25){



alert(

"Cần Lv25"

);



return;


}







let price=

c.type==="super"

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



game.selectedChicken=null;



addHistory(

"Bán "

+

chickenName(c.type)

);



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



alert(

"Không có trứng"

);



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
// QUY ĐỔI TIỀN
// ===============================


// 100 VNĐ = 4000 xu

function moneyToCoin(){



if(game.wallet.money<100){



alert(

"Cần ít nhất 100 VNĐ"

);



return;


}



game.wallet.money-=100;



game.wallet.coin+=4000;



addHistory(

"Đổi 100 VNĐ → 4000 xu"

);



update();



}









// 50000 xu = 500 VNĐ


function coinToMoney(){



if(game.wallet.coin<50000){



alert(

"Cần 50000 xu"

);



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

"🏦 Liên kết Bank demo"

);



}









// ===============================
// NHIỆM VỤ
// ===============================


function getQuestReward(){



game.wallet.coin+=10000;



game.wallet.money+=100000;



addHistory(

"🎯 Nhận thưởng +10000 xu +100000 VNĐ"

);



alert(

"🎉 Nhận thưởng thành công"

);



update();



}









// ===============================
// LỊCH SỬ
// ===============================


function addHistory(text){



account.history.unshift(text);



let box=document.getElementById(

"history"

);



if(box){



box.innerHTML=

account.history.join(

"<br>"

);



}



}









// ===============================
// UPDATE NÚT CHUỒNG
// ===============================


function updateCoopButton(){



let buttons=document.querySelectorAll(

"#coopPage button"

);



let list=[

"normal",

"super",

"star"

];





buttons.forEach((btn,index)=>{



let type=list[index];



let coop=game.coops[type];



if(!coop)

return;






if(coop.open){



btn.innerHTML=


coop.name

+

"<br>"

+

"✅ Đã mở"

+

"<br>"

+

coop.chickens.length

+

"/"

+

coop.limit

+

" slot";



}

else{



if(type==="super"){



btn.innerHTML=


"🔥 Chuồng siêu cấp"

+

"<br>"

+

"25000 xu"

+

"<br>5 slot";



}



if(type==="star"){



btn.innerHTML=


"⭐ Chuồng siêu sao"

+

"<br>20000 VNĐ"

+

"<br>7 slot";



}



}



});



}









// ===============================
// UPDATE TOÀN BỘ GAME
// ===============================


function update(){



// tiền


let coin=

document.getElementById(

"coin"

);



let money=

document.getElementById(

"money"

);



if(coin)

coin.innerHTML=

game.wallet.coin;



if(money)

money.innerHTML=

game.wallet.money;









// ví


let wc=

document.getElementById(

"walletCoin"

);



let wm=

document.getElementById(

"walletMoney"

);





if(wc)

wc.innerHTML=

game.wallet.coin;



if(wm)

wm.innerHTML=

game.wallet.money;









// trứng


let eggList=[



["eggNormal","normal"],



["eggSuper","super"],



["eggGold","gold"],



["eggDiamond","diamond"]



];




eggList.forEach(e=>{



let el=document.getElementById(

e[0]

);



if(el)

el.innerHTML=

game.eggs[e[1]];



});









// cám


let feedList=[



["feedNormal","normal"],



["feedSuper","super"],



["feedWeight","weight"],



["feedGrow","grow"],



["feedVip","vip"]



];




feedList.forEach(f=>{



let el=document.getElementById(

f[0]

);



if(el)

el.innerHTML=

game.feed[f[1]];



});









updateFeedDetail();



updateMainChicken();



updateCoopButton();



renderCoop();



renderStorage();



}
// ===============================
// CHUYỂN TRANG
// ===============================


function openPage(id){



document.querySelectorAll(".page")

.forEach(page=>{



page.classList.remove(

"active"

);



});






let page=document.getElementById(id);



if(page){



page.classList.add(

"active"

);



}



}









// ===============================
// KHỞI TẠO GAME
// ===============================



function initGame(){



// tạo quả trứng đầu tiên



let firstChicken=

createChicken(

"normal"

);



firstChicken.hatch=true;



firstChicken.hatchTime=

Date.now()+HATCH_TIME;



game.chickenStorage.push(

firstChicken

);





game.mainChicken=

firstChicken;



update();



}









// ===============================
// CHẠY GAME
// ===============================


initGame();
