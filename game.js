// ======================================
// CHICKEN FARM
// GAME.JS v0.7.4 FULL
// ======================================


// ===============================
// CONFIG
// ===============================


const HATCH_TIME = 10000;     // test nở trứng 10s

const EGG_TIME = 15000;       // test đẻ trứng 15s

const LIFE_TIME = 120000;     // test tuổi 2 phút



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



return{


id:

Date.now()+Math.random(),



type:type,



level:1,



exp:0,



birthTime:Date.now(),



hatch:true,



hatchTime:

Date.now()+HATCH_TIME,



eggTime:

Date.now()+EGG_TIME,



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
// LẤY GÀ ĐANG CHỌN
// ===============================


function getCurrentChicken(){



if(game.selectedChicken===null)

return null;



return game.coops[game.selectedCoop]

.chickens[game.selectedChicken];



}
// ===============================
// GIÁ MUA GÀ
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

"Mua "+chickenName(type)

);



update();



}









// ===============================
// KIỂM TRA CHUỒNG
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
// CHỌN GÀ TRONG KHO
// ===============================


function selectStorageChicken(index){



game.selectedStorageChicken=index;



renderStorage();



}









// ===============================
// THẢ GÀ VÀO CHUỒNG
// ===============================


function putChickenToCoop(type){



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





if(!canPutChicken(type,chicken.type)){



alert(

"Gà này không vào được chuồng này"

);



return;


}





let coop=

game.coops[type];



if(!coop.open){



alert("Chưa mở chuồng");


return;


}




if(coop.chickens.length>=coop.limit){



alert("Chuồng đầy");


return;


}





coop.chickens.push(chicken);



game.chickenStorage.splice(index,1);



game.selectedStorageChicken=null;



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

"Mở "+coop.name

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


Lv ${c.level}



<br>



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





let age=Math.floor(

(Date.now()-chicken.birthTime)

/

LIFE_TIME

);






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

(chicken.eggTime-Date.now())

/1000

)

);







content.innerHTML=

`

<h3>

${chickenIcon(chicken.type,chicken.level)}

${chickenName(chicken.type)}

</h3>



<p>

⭐ Lv:

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

"🔒 Chưa đạt Lv25";



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
// UPDATE SỐ CÁM POPUP
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



let el=document.getElementById(

item[0]

);



if(el)



el.innerHTML=

game.feed[item[1]];



});



}









// ===============================
// TIMER NỞ TRỨNG + TRANG CHỦ
// ===============================


function updateMainTimer(){



let box=document.getElementById(

"hatchTime"

);



if(!box)

return;





let chicken=game.chickenStorage[0];



if(!chicken)

return;





if(chicken.hatch){



let time=Math.max(

0,

Math.ceil(

(chicken.hatchTime-Date.now())

/1000

)

);



box.innerHTML=

"🥚 Còn "+time+"s";





if(time<=0){



chicken.hatch=false;



chicken.birthTime=Date.now();



chicken.eggTime=

Date.now()+EGG_TIME;



document.getElementById(

"mainStatus"

).innerHTML=

"🐣 Gà con mới nở";



}



}

else{



box.innerHTML=

"🐔 Đã nở";



}



}









setInterval(()=>{


updateMainTimer();


},1000);









// ===============================
// TIMER NỞ GÀ TRONG CHUỒNG
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
// EXP TỰ ĐỘNG
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



switch(c.type){



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




c.eggTime=

Date.now()+EGG_TIME;



addHistory(

chickenName(c.type)

+" đã đẻ trứng"

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



let c=coop.chickens[i];



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

game.wallet.money < chickenShopMoney[type]

){



alert("Không đủ VNĐ");


return;


}



game.wallet.money-=chickenShopMoney[type];



}

else{



if(

game.wallet.coin < chickenShopCoin[type]

){



alert("Không đủ xu");


return;


}



game.wallet.coin-=chickenShopCoin[type];



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

"Gà vàng và kim cương không bán được"

);



return;


}





if(c.level<25){



alert(

"Gà cần Lv25 mới bán"

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



addHistory(

"Bán "

+

chickenName(c.type)

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



if(

game.eggs[type]<=0

){



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
// QUY ĐỔI TIỀN
// ===============================


// 100 VNĐ = 4000 xu

function moneyToCoin(){



if(game.wallet.money < 100){



alert("Cần ít nhất 100 VNĐ");


return;


}



game.wallet.money -= 100;



game.wallet.coin += 4000;



addHistory(

"Đổi 100 VNĐ → 4000 xu"

);



update();



}









// 50000 xu = 500 VNĐ


function coinToMoney(){



if(game.wallet.coin < 50000){



alert("Cần 50000 xu");


return;


}



game.wallet.coin -= 50000;



game.wallet.money += 500;



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

"🏦 Liên kết Bank demo thành công"

);



}









// ===============================
// NHIỆM VỤ
// ===============================


function getQuestReward(){



game.wallet.coin += 10000;



game.wallet.money += 100000;



addHistory(

"🎯 Nhận nhiệm vụ +10000 xu +100000 VNĐ"

);



alert(

"🎉 Đã nhận thưởng"

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
// UPDATE CHUỒNG BUTTON
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



buttons.forEach((btn,i)=>{



let type=list[i];



let coop=game.coops[type];



if(!coop)

return;





if(coop.open){



btn.innerHTML=

coop.name

+

"<br>Đã mở"

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

"<br>25000 xu"

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









// cám


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



renderStorage();



updateCoopButton();



}









// ===============================
// CHUYỂN TRANG
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



let firstEgg=createChicken(

"normal"

);



firstEgg.hatch=true;



firstEgg.hatchTime=

Date.now()+HATCH_TIME;



game.chickenStorage.push(

firstEgg

);






update();
