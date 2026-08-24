// ======================================
// CHICKEN FARM
// GAME.JS v0.7.6 FULL UPDATE
// ======================================



// ===============================
// CONFIG
// ===============================


const HATCH_TIME = 10000;


// thời gian test
// khi test thật đổi sang ngày


const LIFE_TIME = 86400000;





// ===============================
// DATA GÀ
// ===============================


const chickenData = {


normal:{


name:"🐔 Gà thường",


life:7,


egg:"🥚 Trứng thường",


eggPrice:25,


sellPrice:600,


expStart:100,


expAdd:50,


eggStart:250,


eggReduce:5



},




super:{


name:"🔥 Gà siêu cấp",


life:10,


egg:"✨ Trứng siêu cấp",


eggPrice:50,


sellPrice:2500,


expStart:250,


expAdd:75,


eggStart:300,


eggReduce:10



},





gold:{


name:"🟡 Gà vàng",


life:20,


egg:"🟡 Trứng vàng",


eggPrice:1000,


sellPrice:null,


expStart:1000,


expAdd:99,


eggStart:500,


eggReduce:12



},





diamond:{


name:"💎 Gà kim cương",


life:30,


egg:"💎 Trứng kim cương",


eggPrice:3500,


sellPrice:null,


expStart:2000,


expAdd:120,


eggStart:800,


eggReduce:15



}



};









// ===============================
// CÁM
// ===============================


const feedData={


normal:{


price:80,


exp:40


},



super:{


price:160,


exp:120


},



weight:{


price:300,


exp:240


},



grow:{


price:600,


exp:500


},



vip:{


price:3600,


exp:3636


}



};









// ===============================
// GAME DATA
// ===============================


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


selectedStorageChicken:null,


mainChicken:null



};





let account={


history:[]


};
// ===============================
// TẠO GÀ
// ===============================


function createChicken(type="normal"){


let data=chickenData[type];



return {


id:

Date.now()+Math.random(),



type:type,



level:1,



exp:0,



birthTime:Date.now(),



hatch:true,



hatchTime:

Date.now()+10000,



eggTime:null,



maxAge:

data.life*LIFE_TIME



};



}









// ===============================
// TÊN GÀ
// ===============================


function chickenName(type){



return chickenData[type].name;



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



return "🐔";



}









// ===============================
// EXP TỪNG LOẠI GÀ
// ===============================


function needExp(chicken){



let data=

chickenData[chicken.type];



return (

data.expStart

+

((chicken.level-1)

*

data.expAdd)

);



}









function levelUp(chicken){



while(

chicken.exp>=needExp(chicken)

&&

chicken.level<25

){



chicken.exp-=needExp(chicken);



chicken.level++;



}



}









// ===============================
// THỜI GIAN ĐẺ TRỨNG
// CHỈ TÍNH TỪ LV10
// ===============================


function getEggTime(chicken){



if(chicken.level<10)

return null;



let data=

chickenData[chicken.type];



let time=


data.eggStart

-

((chicken.level-10)

*

data.eggReduce);



if(time<30)

time=30;



return time*1000;



}









// ===============================
// GIÁ MUA GÀ
// ===============================


const buyPrice={



normal:{coin:400},



super:{coin:2000},



gold:{money:35000},



diamond:{money:80000}



};









// ===============================
// MUA GÀ
// ===============================


function buyChicken(type){



let price=

buyPrice[type];





if(price.coin){



if(game.wallet.coin<price.coin){



alert("Không đủ xu");


return;


}



game.wallet.coin-=price.coin;



}



if(price.money){



if(game.wallet.money<price.money){



alert("Không đủ VNĐ");


return;


}



game.wallet.money-=price.money;



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
// CHỌN GÀ TRONG KHO
// ===============================


function selectStorageChicken(index){



game.selectedStorageChicken=index;



renderStorage();



}









// ===============================
// KIỂM TRA CHUỒNG
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



if(

!canPutChicken(

type,

chicken.type

)

){



alert(

"Gà không phù hợp chuồng"

);



return;


}







let coop=

game.coops[type];



if(!coop.open){



alert(

"Chưa mở chuồng"

);



return;


}







if(

coop.chickens.length>=coop.limit

){



alert(

"Chuồng đầy"

);



return;


}







coop.chickens.push(chicken);



game.chickenStorage.splice(

index,

1

);



game.selectedStorageChicken=null;



game.selectedCoop=type;



game.selectedChicken=

coop.chickens.length-1;



game.mainChicken=

chicken;



update();



}
// ===============================
// LẤY GÀ HIỆN TẠI
// ===============================


function getCurrentChicken(){



if(game.selectedChicken===null)

return null;



return game.coops[game.selectedCoop]

.chickens[game.selectedChicken];



}









function getMainChicken(){



if(game.mainChicken)

return game.mainChicken;



if(game.chickenStorage.length>0)

return game.chickenStorage[0];



return null;



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



}









// ===============================
// TRANG CHỦ HIỆN GÀ
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







let status=

document.getElementById(

"mainStatus"

);



if(status){



status.innerHTML=

chickenName(chicken.type)

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

needExp(chicken);



if(age)



age.innerHTML=

Math.floor(

(Date.now()-chicken.birthTime)

/

LIFE_TIME

);



}









// ===============================
// THÔNG TIN GÀ SHOP
// ===============================


function showChickenInfo(type){



let box=

document.getElementById(

"chickenInfoBox"

);



let content=

document.getElementById(

"chickenInfoContent"

);



if(!box || !content)

return;



let data=

chickenData[type];





let sell=

data.sellPrice

?

data.sellPrice+" xu"

:

"Không thể bán";







content.innerHTML=

`

<h3>

${data.name}

</h3>



<p>

🎂 Tuổi thọ:

${data.life} ngày

</p>



<p>

🥚 Trứng:

${data.egg}

</p>



<p>

💰 Giá trứng:

${data.eggPrice} xu

</p>



<p>

💵 Giá bán gà:

${sell}

</p>



<p>

🥚 Bắt đầu đẻ:

Lv10

</p>



`;





box.style.display="block";



}









function closeChickenInfo(){



let box=

document.getElementById(

"chickenInfoBox"

);



if(box)

box.style.display="none";



}









// ===============================
// BẢNG LV
// ===============================


function toggleLevelInfo(){



let box=

document.getElementById(

"levelInfoTable"

);



if(!box)

return;



if(box.innerHTML===""){



let html="";



for(let i=10;i<=25;i++){



html+=


"Lv "

+i

+

": "

+

getEggTime({

type:"normal",

level:i

})/1000

+

"s"

+

"<br>";



}



box.innerHTML=html;



}



box.style.display=

box.style.display==="block"

?

"none"

:

"block";



}
// ===============================
// POPUP CHI TIẾT GÀ NUÔI
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



let data=

chickenData[chicken.type];




let eggTime=

getEggTime(chicken);



let eggText=

eggTime

?

Math.floor(eggTime/1000)+" giây"

:

"Chưa đẻ (Lv<10)";






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

${needExp(chicken)}

</p>



<p>

🎂 Tuổi:

${Math.floor(

(Date.now()-chicken.birthTime)

/

LIFE_TIME

)}

ngày

</p>



<p>

🥚 Trứng:

${data.egg}

</p>



<p>

⏱ Thời gian đẻ:

${eggText}

</p>

`;



box.style.display="block";



}









function closeChickenDetail(){



let box=document.getElementById(

"chickenDetail"

);



if(box)

box.style.display="none";



}









// ===============================
// CÁM
// ===============================


function toggleFeedMenu(){



let menu=document.getElementById(

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



let chicken=getCurrentChicken();



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



chicken.exp+=

feedData[type].exp;



levelUp(chicken);



update();



}









function feedDetailChicken(type){



feedChicken(type);



openChickenDetail();



}









// ===============================
// SHOP CÁM
// ===============================


function buyFeed(type){



let data=

feedData[type];



if(game.wallet.coin<data.price){



alert(

"Không đủ xu"

);



return;


}




game.wallet.coin-=data.price;



game.feed[type]++;



addHistory(

"Mua cám "

+

type

);



update();



}









// ===============================
// TIMER NỞ TRỨNG
// ===============================


function updateHatch(){



let list=[];



if(game.mainChicken)

list.push(game.mainChicken);



Object.values(game.coops)

.forEach(coop=>{



coop.chickens.forEach(c=>{


if(!list.includes(c))

list.push(c);



});



});





list.forEach(c=>{



if(

c.hatch

&&

Date.now()>=c.hatchTime

){



c.hatch=false;



c.birthTime=Date.now();



c.eggTime=

Date.now()+getEggTime(c);



}



});



updateMainChicken();



}









setInterval(()=>{


updateHatch();


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

){



if(

!c.eggTime

)

c.eggTime=

Date.now()+getEggTime(c);






if(

Date.now()>=c.eggTime

){



let data=

chickenData[c.type];



if(c.type==="normal")

game.eggs.normal++;



if(c.type==="super")

game.eggs.super++;



if(c.type==="gold")

game.eggs.gold++;



if(c.type==="diamond")

game.eggs.diamond++;






c.eggTime=

Date.now()+getEggTime(c);



addHistory(

c.type+" đẻ trứng"

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



},2000);
// ===============================
// BÁN GÀ
// ===============================


function sellDetailChicken(){


let chicken=getCurrentChicken();



if(!chicken)

return;




let data=

chickenData[chicken.type];





if(!data.sellPrice){



alert(

"Gà này không thể bán"

);



return;


}





if(chicken.level<25){



alert(

"Cần gà Lv25 mới bán được"

);



return;


}





game.wallet.coin+=data.sellPrice;



game.coops[game.selectedCoop]

.chickens.splice(

game.selectedChicken,

1

);



game.selectedChicken=null;



game.mainChicken=null;



addHistory(

"Bán "

+

data.name

);



closeChickenDetail();



update();



}









// ===============================
// BÁN TRỨNG
// ===============================


function sellEgg(type){



let price=

chickenData[type]

?

chickenData[type].eggPrice

:

0;



if(game.eggs[type]<=0){



alert(

"Không có trứng"

);



return;


}





game.eggs[type]--;



game.wallet.coin+=price;



addHistory(

"Bán trứng "

+

type

+

" +"

+

price

+

" xu"

);



update();



}









// ===============================
// MỞ CHUỒNG
// ===============================


function openCoop(type){



let coop=

game.coops[type];



if(coop.open){



game.selectedCoop=type;



update();



return;


}






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



game.selectedCoop=type;



addHistory(

"Mở "

+

coop.name

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

"Đổi 100 VNĐ thành 4000 xu"

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

"Đổi 50000 xu thành 500 VNĐ"

);



update();



}









// ===============================
// NHIỆM VỤ
// ===============================


function getQuestReward(){



game.wallet.coin+=10000;



game.wallet.money+=100000;



addHistory(

"Nhận nhiệm vụ +10000 xu +100000 VNĐ"

);



alert(

"🎉 Nhận thưởng thành công"

);



update();



}









// ===============================
// ADMIN NOTICE TEST
// ===============================


let adminNotice={



active:true,



message:

"🎉 Chào mừng người chơi đến với Chicken Farm"



};









function updateAdminNotice(){



let box=

document.getElementById(

"adminNotice"

);



if(box)



box.innerHTML=

adminNotice.message;



}









// ===============================
// LỊCH SỬ
// ===============================


function addHistory(text){



account.history.unshift(

new Date().toLocaleString()

+

" - "

+

text

);





let box=

document.getElementById(

"history"

);



if(box)



box.innerHTML=

account.history.join(

"<br>"

);



}
// ===============================
// UPDATE VÍ
// ===============================


function updateWallet(){



let coin=

document.getElementById(

"coin"

);



let money=

document.getElementById(

"money"

);



let walletCoin=

document.getElementById(

"walletCoin"

);



let walletMoney=

document.getElementById(

"walletMoney"

);






if(coin)

coin.innerHTML=

game.wallet.coin;



if(money)

money.innerHTML=

game.wallet.money;



if(walletCoin)

walletCoin.innerHTML=

game.wallet.coin;



if(walletMoney)

walletMoney.innerHTML=

game.wallet.money;



}









// ===============================
// UPDATE TRỨNG
// ===============================


function updateEgg(){



let list=[



["eggNormal","normal"],



["eggSuper","super"],



["eggGold","gold"],



["eggDiamond","diamond"]



];




list.forEach(e=>{



let el=

document.getElementById(e[0]);



if(el)



el.innerHTML=

game.eggs[e[1]];



});



}









// ===============================
// UPDATE CÁM
// ===============================


function updateFeed(){



let list=[



["feedNormal","normal"],



["feedSuper","super"],



["feedWeight","weight"],



["feedGrow","grow"],



["feedVip","vip"]



];





list.forEach(f=>{



let el=

document.getElementById(f[0]);



if(el)



el.innerHTML=

game.feed[f[1]];



});



}









// ===============================
// UPDATE NÚT CHUỒNG
// ===============================


function updateCoopButton(){



let buttons=

document.querySelectorAll(

"#coopPage button"

);



let list=[

"normal",

"super",

"star"

];





buttons.forEach((btn,i)=>{



let type=list[i];



let coop=

game.coops[type];



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

coop.limit;



}

else{



if(type==="super"){



btn.innerHTML=

"🔥 Chuồng siêu cấp"

+

"<br>25000 xu";



}



if(type==="star"){



btn.innerHTML=

"⭐ Chuồng siêu sao"

+

"<br>20000 VNĐ";



}



}



});



}









// ===============================
// UPDATE TỔNG
// ===============================


function update(){



updateWallet();



updateEgg();



updateFeed();



updateMainChicken();



updateCoopButton();



renderStorage();



renderCoop();



updateAdminNotice();



}









// ===============================
// HIỂN THỊ GÀ CHỌN
// ===============================


function updateSelectedChicken(){



let chicken=

getCurrentChicken();



if(!chicken)

return;



game.mainChicken=chicken;



updateMainChicken();



}









// ===============================
// ĐÓNG/MỞ TRANG
// ===============================


function openPage(id){



document.querySelectorAll(".page")

.forEach(p=>{



p.classList.remove(

"active"

);



});






let page=

document.getElementById(id);



if(page)



page.classList.add(

"active"

);



}









// ===============================
// RÚT TIỀN / BANK TEST
// ===============================


function withdrawMoney(){



alert(

"💵 Rút tiền test: "

+

game.wallet.money

+

" VNĐ"

);



}









function linkBank(){



alert(

"🏦 Liên kết ngân hàng test"

);



}
// ===============================
// KIỂM TRA TUỔI GÀ
// ===============================


setInterval(()=>{



Object.values(game.coops)

.forEach(coop=>{



for(

let i=coop.chickens.length-1;

i>=0;

i--

){



let chicken=

coop.chickens[i];



if(

!chicken.hatch

&&

Date.now()-chicken.birthTime

>=

chicken.maxAge

){



addHistory(

chickenName(chicken.type)

+

" đã hết tuổi"

);



coop.chickens.splice(i,1);



}



}



});



update();



},5000);









// ===============================
// TIMER UPDATE LIÊN TỤC
// ===============================


setInterval(()=>{



updateMainChicken();



},1000);









// ===============================
// KHỞI TẠO GAME
// ===============================


function initGame(){



// tạo gà đầu tiên



let chicken=

createChicken(

"normal"

);





game.chickenStorage.push(

chicken

);



game.mainChicken=

chicken;



update();



}









// ===============================
// CHẠY GAME
// ===============================


initGame();









// ===============================
// DEBUG TEST
// ===============================


window.game=game;

window.account=account;
