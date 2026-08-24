// ===============================
// GAME.JS v0.7.1 PART 1
// ===============================


// ===============================
// CONFIG TEST
// ===============================

const HATCH_TIME = 10000; // 10s test

const EGG_TIME = 15000; // 15s test

const EXP_TIME = 1500;

const AGE_TIME = 120000; // 2 phút test





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

limit:3,

chickens:[]

},




// Chuồng siêu cấp

super:{


name:"🔥 Chuồng siêu cấp",

open:false,

limit:5,

chickens:[]

},




// Chuồng siêu sao

star:{


name:"⭐ Chuồng siêu sao",

open:false,

limit:7,

chickens:[]

}



},



selectedCoop:"normal",


selectedChicken:0



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



level:first?0:1,



exp:0,



age:0,



hatch:first,



hatchTime:

Date.now()+HATCH_TIME,



eggTime:

Date.now()+EGG_TIME,



maxAge:

type==="diamond"?

30:

type==="gold"?

14:

7


};



}









// ===============================
// THÊM GÀ VÀO CHUỒNG
// ===============================


function addChicken(type,coop){


let house=game.coops[coop];



if(house.chickens.length>=house.limit){


alert("Chuồng đầy");


return false;


}



house.chickens.push(
createChicken(type)
);



return true;


}









// ===============================
// LẤY CHUỒNG HIỆN TẠI
// ===============================


function currentCoop(){


return game.coops[game.selectedCoop];


}









// ===============================
// LẤY GÀ ĐANG CHỌN
// ===============================


function getSelectedChicken(){


let list=currentCoop().chickens;


return list[game.selectedChicken];


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









function chickenName(type){



if(type==="super")

return "Gà siêu cấp";



if(type==="gold")

return "Gà vàng";



if(type==="diamond")

return "Gà kim cương";



return "Gà thường";


}









// ===============================
// EXP
// ===============================


function needExp(level){



if(level<=0)

return 100;



return 100+(level-1)*50;


}









function levelUp(chicken){



while(

chicken.exp >= needExp(chicken.level)

&& chicken.level < 25

){



chicken.exp -= needExp(chicken.level);



chicken.level++;



}



}









// ===============================
// CHỌN GÀ
// ===============================


function selectCoop(type){



game.selectedCoop=type;


game.selectedChicken=0;


update();



}






function selectChicken(index){



game.selectedChicken=index;


update();


}









// ===============================
// CHO ĂN
// ===============================


let feedExp={


normal:40,


super:120,


weight:240,


grow:500,


vip:1000


};






function feedChicken(type){



let chicken=getSelectedChicken();



if(!chicken){


alert("Chưa chọn gà");


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



chicken.exp += feedExp[type];



levelUp(chicken);



update();



}









// ===============================
// EXP TỰ ĐỘNG
// ===============================


setInterval(()=>{



Object.values(game.coops).forEach(coop=>{


coop.chickens.forEach(chicken=>{



if(!chicken.hatch && chicken.level<25){


chicken.exp +=2;


levelUp(chicken);


}



});



});



update();



},EXP_TIME);









// ===============================
// TRỨNG KHỞI ĐẦU NỞ
// ===============================


setInterval(()=>{



Object.values(game.coops).forEach(coop=>{


coop.chickens.forEach(chicken=>{



if(chicken.hatch){



let time =

Math.ceil(

(chicken.hatchTime-Date.now())

/1000

);



let box=document.getElementById("hatchTime");



if(time>0){


box.style.display="block";


box.innerHTML="⏳ Còn "+time+"s";


}



else{


chicken.hatch=false;


chicken.level=1;



box.style.display="none";



alert("🐣 Gà mới nở Lv1");



}



}



});



});



update();



},1000);









// ===============================
// TUỔI GÀ
// ===============================


setInterval(()=>{



Object.values(game.coops).forEach(coop=>{



coop.chickens.forEach((chicken,index)=>{



if(!chicken.hatch){


chicken.age++;



if(chicken.age>=chicken.maxAge){



coop.chickens.splice(index,1);



alert(

chickenName(chicken.type)

+" đã chết"

);



}



}



});



});



update();
  



},AGE_TIME);
// ===============================
// RENDER CHUỒNG
// ===============================


function renderCoop(){


let box=document.getElementById("coopSlots");


if(!box)return;


box.innerHTML="";



let coop=currentCoop();



document.getElementById("coopTitle").innerHTML=
coop.name;



coop.chickens.forEach((chicken,index)=>{


let div=document.createElement("div");


div.className="slot";


div.onclick=function(){

selectChicken(index);

};



div.innerHTML=`

<div class="emoji">

${chickenIcon(chicken.type,chicken.level)}

</div>


${chickenName(chicken.type)}

<br>

⭐ Lv ${chicken.level}

<br>

🔥 ${Math.floor(chicken.exp)}/${needExp(chicken.level)}

<br>

🎂 ${chicken.age}/${chicken.maxAge}


<br>


<button onclick="event.stopPropagation();sellChicken('${coopType(index)}',${index})">

💰 Bán

</button>


`;



box.appendChild(div);



});



}






function coopType(index){

return game.selectedCoop;

}









// ===============================
// UPDATE TOÀN BỘ
// ===============================


function update(){



let chicken=getSelectedChicken();



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






document.getElementById("feedNormal").innerHTML=
game.feed.normal;


document.getElementById("feedSuper").innerHTML=
game.feed.super;


document.getElementById("feedWeight").innerHTML=
game.feed.weight;


document.getElementById("feedGrow").innerHTML=
game.feed.grow;


document.getElementById("feedVip").innerHTML=
game.feed.vip;






if(chicken){


document.getElementById("mainChicken").innerHTML=
chickenIcon(chicken.type,chicken.level);



document.getElementById("mainStatus").innerHTML=

chickenName(chicken.type)
+" Lv "
+chicken.level;



document.getElementById("level").innerHTML=
chicken.level;


document.getElementById("exp").innerHTML=

Math.floor(chicken.exp)
+
"/"
+
needExp(chicken.level);



document.getElementById("age").innerHTML=
chicken.age;



document.getElementById("selectedChicken").innerHTML=

chickenName(chicken.type)
+
" Lv "
+
chicken.level;



}



renderCoop();



}









// ===============================
// ĐẺ TRỨNG
// ===============================


setInterval(()=>{


Object.values(game.coops).forEach(coop=>{


coop.chickens.forEach(chicken=>{



if(

!chicken.hatch

&&

chicken.level>=10

&&

Date.now()>=chicken.eggTime

){



if(chicken.type==="super")

game.eggs.super++;


else if(chicken.type==="gold")

game.eggs.gold++;


else if(chicken.type==="diamond")

game.eggs.diamond++;


else

game.eggs.normal++;





chicken.eggTime=
Date.now()+EGG_TIME;



}



});



});



update();



},1000);









// ===============================
// SHOP GÀ
// ===============================


function buyChicken(type){



let priceCoin={


normal:400,


super:2000


};



let priceMoney={


gold:35000,


diamond:80000


};




if(type==="gold"||type==="diamond"){



if(game.wallet.money < priceMoney[type]){

alert("Không đủ VNĐ");

return;

}



game.wallet.money -= priceMoney[type];



}



else{



if(game.wallet.coin < priceCoin[type]){


alert("Không đủ xu");


return;


}



game.wallet.coin -= priceCoin[type];



}




let target="normal";



if(type==="super")

target="super";


if(type==="gold"||type==="diamond")

target="star";



addChicken(type,target);



update();



}









// ===============================
// SHOP CÁM
// ===============================


let feedPrice={


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



game.wallet.coin -= feedPrice[type];


game.feed[type]++;


update();



}









// ===============================
// BÁN GÀ
// ===============================


function sellChicken(coopType,index){



let chicken=
game.coops[coopType].chickens[index];



if(!chicken)return;



if(

chicken.type==="gold"

||

chicken.type==="diamond"

){


alert("Gà này không thể bán");


return;


}





if(chicken.level<25){


alert("Gà chưa đạt Lv25");


return;


}




let price=


chicken.type==="super"

?

2500

:

600;




game.wallet.coin+=price;



addHistory(

"Bán "+chickenName(chicken.type)
+
" +"
+
price
+
" xu"

);



game.coops[coopType].chickens.splice(index,1);



update();



}









// ===============================
// BÁN TRỨNG
// ===============================


let eggPrice={


normal:25,

super:50,

gold:1000,

diamond:3500


};






function sellEgg(type){



if(game.eggs[type]<=0)return;



game.eggs[type]--;



game.wallet.coin+=eggPrice[type];



addHistory(

"Bán trứng "+type
+
" +"
+
eggPrice[type]
+
" xu"

);



update();



}









// ===============================
// MỞ CHUỒNG
// ===============================


function openCoop(type){


game.selectedCoop=type;


game.selectedChicken=0;


update();


}






function changeSuperCoop(){


if(game.wallet.coin<25000)return;


game.wallet.coin-=25000;


game.coops.super.open=true;


update();


}






function changeStarCoop(){


if(game.wallet.money<20000)return;


game.wallet.money-=20000;


game.coops.star.open=true;


update();


}









// ===============================
// TIỀN
// ===============================


// 100 VNĐ = 500 xu


function moneyToCoin(){


let money=100;



if(game.wallet.money<money)return;



game.wallet.money-=money;


game.wallet.coin+=500;



addHistory(

"Đổi 100 VNĐ → 500 xu"

);



update();



}





// 50000 xu = 500 VNĐ


function coinToMoney(){



let coin=50000;



if(game.wallet.coin<coin)return;



game.wallet.coin-=coin;


game.wallet.money+=500;



addHistory(

"Đổi 50000 xu → 500 VNĐ"

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
// TÀI KHOẢN
// ===============================


function withdrawMoney(){


alert(

"Rút demo: "
+
game.wallet.money
+
" VNĐ"

);


}




function linkBank(){


alert(

"🏦 Liên kết bank demo"

);


}






function addHistory(text){


account.history.unshift(text);



let box=document.getElementById("history");



if(box){

box.innerHTML=

account.history.join("<br>");

}


}









// ===============================
// MENU
// ===============================


function openPage(id){


document.querySelectorAll(".page")
.forEach(page=>{


page.classList.remove("active");


});



document.getElementById(id)
.classList.add("active");



}







// START


// tạo trứng đầu game


game.coops.normal.chickens.push(
createChicken("normal",true)
);



update();
