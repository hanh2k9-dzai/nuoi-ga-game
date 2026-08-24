// ======================================
// CHICKEN FARM
// GAME.JS v0.7.3 FULL
// ======================================


// ===============================
// CONFIG
// ===============================


const HATCH_TIME = 10000; // test 10s

const EGG_TIME = 15000;   // test 15s

const LIFE_TIME = 120000; // test 2 phút



// ===============================
// DATA
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




// gà chưa thả chuồng

chickenStorage:[],





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


limit:5,


chickens:[]


},




star:{


name:"⭐ Chuồng siêu sao",


open:false,


limit:7,


chickens:[]


}



},





selectedCoop:"normal",


selectedChicken:null,


selectedStorageChicken:null



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


if(type==="super")

return "🔥 Gà siêu cấp";



if(type==="gold")

return "🟡 Gà vàng";



if(type==="diamond")

return "💎 Gà kim cương";



return "🐔 Gà thường";


}









// ===============================
// ICON
// ===============================


function chickenIcon(type,lv){


if(type==="diamond")

return "💎🐔";



if(type==="gold")

return "🟡🐔";



if(type==="super")

return "🔥🐔";



if(lv<5)

return "🐣";



if(lv<10)

return "🐥";



if(lv<25)

return "🐓";



return "🐔";


}









// ===============================
// EXP
// ===============================


function needExp(level){


return 100+(level-1)*50;


}





function levelUp(c){


while(

c.exp>=needExp(c.level)

&&

c.level<25

){


c.exp-=needExp(c.level);


c.level++;


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
// MUA GÀ VÀO KHO
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



if(type==="gold" || type==="diamond"){



if(game.wallet.money < chickenMoneyPrice[type]){


alert("Không đủ VNĐ");


return;


}



game.wallet.money-=chickenMoneyPrice[type];



}

else{



if(game.wallet.coin < chickenCoinPrice[type]){


alert("Không đủ xu");


return;


}



game.wallet.coin-=chickenCoinPrice[type];


}





let chicken=createChicken(type);



game.chickenStorage.push(chicken);



addHistory(

"Mua "

+

chickenName(type)

);



update();



}









// ===============================
// KIỂM TRA CHUỒNG NHẬN GÀ
// ===============================


function canPutChicken(coop,type){



if(coop==="normal"){


return type==="normal";


}



if(coop==="super"){


return (

type==="normal"

||

type==="super"

);


}




if(coop==="star"){


return true;


}



return false;


}









// ===============================
// CHỌN GÀ TRONG KHO
// ===============================


function selectStorageChicken(index){



game.selectedStorageChicken=index;



showStorageChicken();



}









// ===============================
// THẢ GÀ VÀO CHUỒNG
// ===============================


function putChickenToCoop(coop){



let index=game.selectedStorageChicken;



if(index===null){


alert("Chọn gà trước");


return;


}




let chicken=game.chickenStorage[index];



if(!chicken){


return;


}



if(!canPutChicken(coop,chicken.type)){



alert(

"Gà này không phù hợp chuồng"

);



return;



}




let house=game.coops[coop];



if(!house.open){


alert("Chưa mở chuồng");


return;


}



if(house.chickens.length>=house.limit){


alert("Chuồng đầy");


return;


}




house.chickens.push(chicken);



game.chickenStorage.splice(index,1);



game.selectedStorageChicken=null;



game.selectedCoop=coop;



update();



}









// ===============================
// MỞ CHUỒNG
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


function showStorageChicken(){



let box=document.getElementById(

"chickenStorage"

);



if(!box)

return;



box.innerHTML="";





game.chickenStorage.forEach((c,index)=>{



let div=document.createElement("div");



div.className="storageChicken";



div.onclick=()=>selectStorageChicken(index);





div.innerHTML=


`

<div class="emoji">

${chickenIcon(c.type,c.level)}

</div>



${chickenName(c.type)}

<br>

Lv ${c.level}



<br>


<button onclick="putChickenToCoop('normal')">

🏠

</button>



<button onclick="putChickenToCoop('super')">

🔥

</button>



<button onclick="putChickenToCoop('star')">

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



let coop=game.coops[game.selectedCoop];



let title=document.getElementById(

"coopTitle"

);



if(title)

title.innerHTML=

coop.name+

" "

+

coop.chickens.length

+

"/"

+

coop.limit;







coop.chickens.forEach((c,index)=>{



let div=document.createElement("div");



div.className="slot";



div.onclick=()=>selectChicken(index);





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


`;



box.appendChild(div);



});



}
// ===============================
// CHỌN GÀ TRONG CHUỒNG
// ===============================


function selectChicken(index){


game.selectedChicken=index;



openChickenDetail();



}









// ===============================
// POPUP CHI TIẾT GÀ
// ===============================


function openChickenDetail(){


let chicken=getCurrentChicken();



if(!chicken)

return;



let box=document.getElementById(

"chickenDetail"

);



let content=document.getElementById(

"detailContent"

);



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







let eggRemain=Math.max(

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

${Math.floor(

(Date.now()-chicken.birthTime)

/

LIFE_TIME

)

}

</p>




<p>

📌 Trạng thái:

${status}

</p>




<p>

🥚 Đẻ trứng:

${eggRemain}s

</p>

`;







let sell=document.getElementById(

"sellChickenBtn"

);



if(sell){


if(

chicken.type==="gold"

||

chicken.type==="diamond"

){



sell.innerHTML=

"🔒 Không thể bán";



}



else if(chicken.level<25){



sell.innerHTML=

"🔒 Chưa Lv25";



}



else{


sell.innerHTML=

"💰 Bán gà";



}



}





updateFeedDetail();



}









function closeChickenDetail(){



let box=document.getElementById(

"chickenDetail"

);



if(box)

box.style.display="none";



}









// ===============================
// MENU CÁM
// ===============================


function toggleFeedMenu(){



let menu=document.getElementById(

"feedMenu"

);



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
// CHO ĂN
// ===============================


const feedExp={


normal:40,


super:120,


weight:240,


grow:500,


vip:1000


};







function feedDetailChicken(type){



let chicken=getCurrentChicken();



if(!chicken)

return;




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



openChickenDetail();



}









function feedChicken(type){


feedDetailChicken(type);


}









// ===============================
// UPDATE SỐ LƯỢNG CÁM POPUP
// ===============================


function updateFeedDetail(){



let data=[



["detailFeedNormal","normal"],



["detailFeedSuper","super"],



["detailFeedWeight","weight"],



["detailFeedGrow","grow"],



["detailFeedVip","vip"]



];






data.forEach(x=>{



let el=document.getElementById(x[0]);



if(el)


el.innerHTML=

game.feed[x[1]];



});



}









// ===============================
// GÀ NỞ - TIMER THẬT
// ===============================


setInterval(()=>{



Object.values(game.coops)

.forEach(coop=>{



coop.chickens.forEach(chicken=>{



if(chicken.hatch){



if(Date.now()>=chicken.hatchTime){



chicken.hatch=false;



chicken.birthTime=Date.now();



chicken.eggTime=

Date.now()+EGG_TIME;



alert(

"🐣 "

+

chickenName(chicken.type)

+

" đã nở"

);



}



}



});



});



update();



},1000);









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



},1500);
// ===============================
// ĐẺ TRỨNG - TIMER THẬT
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

+" đẻ trứng"

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



for(let i=coop.chickens.length-1;i>=0;i--){



let chicken=coop.chickens[i];



let age=

Date.now()-chicken.birthTime;





if(

!chicken.hatch

&&

age>=chicken.maxAge

){



alert(

chickenName(chicken.type)

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
// SHOP GÀ
// ===============================


const chickenBuyCoin={


normal:400,


super:2000


};




const chickenBuyMoney={


gold:35000,


diamond:80000


};







// Hàm này nối với phần kho gà ở trên
// mua xong sẽ vào kho, không tự vào chuồng


function buyChickenShop(type){



if(

type==="gold"

||

type==="diamond"

){



if(game.wallet.money<chickenBuyMoney[type]){



alert("Không đủ VNĐ");


return;


}



game.wallet.money-=chickenBuyMoney[type];



}

else{



if(game.wallet.coin<chickenBuyCoin[type]){



alert("Không đủ xu");


return;


}



game.wallet.coin-=chickenBuyCoin[type];



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



alert("Không đủ xu");


return;


}



game.wallet.coin-=feedPrice[type];



game.feed[type]++;



addHistory(

"Mua "

+

type

+

" +1"

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

"Cần đạt Lv25"

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


const eggSellPrice={



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



game.wallet.coin+=eggSellPrice[type];



addHistory(

"Bán trứng "

+

type

);



update();



}
// ===============================
// VÍ TIỀN
// ===============================


// 100 VNĐ = 500 xu

function moneyToCoin(){


if(game.wallet.money<100){


alert("Cần ít nhất 100 VNĐ");


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



if(game.wallet.coin<50000){


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

"🏦 Liên kết bank demo thành công"

);



}









// ===============================
// NHIỆM VỤ
// ===============================


function getQuestReward(){



game.wallet.coin+=10000;


game.wallet.money+=100000;



addHistory(

"🎯 Nhận nhiệm vụ +10000 xu +100000 VNĐ"

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



account.history.unshift(

text

);



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
// HIỂN THỊ KHO GÀ
// ===============================


function renderStorage(){



showStorageChicken();



}









// ===============================
// UPDATE GAME
// ===============================


function update(){



// tiền


let coin=document.getElementById(

"coin"

);



let money=document.getElementById(

"money"

);




if(coin)

coin.innerHTML=

game.wallet.coin;



if(money)

money.innerHTML=

game.wallet.money;








// ví


let wc=document.getElementById(

"walletCoin"

);



let wm=document.getElementById(

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



renderCoop();



renderStorage();



}









// ===============================
// MỞ TRANG
// ===============================


function openPage(id){



document.querySelectorAll(".page")

.forEach(p=>{


p.classList.remove(

"active"

);



});





let page=document.getElementById(id);



if(page)


page.classList.add(

"active"

);



}









// ===============================
// KHỞI TẠO GAME
// ===============================



// tạo quả trứng đầu tiên


let firstChicken=createChicken(

"normal"

);



firstChicken.hatch=true;



firstChicken.hatchTime=

Date.now()+HATCH_TIME;



game.chickenStorage.push(

firstChicken

);






// update lần đầu


update();
