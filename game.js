// ===============================
// GAME.JS v0.7.2 PART 1
// ===============================


// CONFIG

const HATCH_TIME = 10000;

const EGG_TIME = 15000;

const AGE_TIME = 120000;

const EXP_TIME = 1500;




// ===============================
// DATA
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


selectedChicken:null


};






let account={


id:10001,

name:"Player",


history:[]


};









// ===============================
// GÀ
// ===============================


function createChicken(type="normal",first=false){


return{


id:Date.now()+Math.random(),


type:type,


level:first?0:1,


exp:0,


age:0,


hatch:first,


hatchTime:Date.now()+HATCH_TIME,


eggTime:Date.now()+EGG_TIME,


maxAge:

type==="diamond"?

30:

type==="gold"?

14:

7



};


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







function needExp(level){


if(level<=0)
return 100;


return 100+(level-1)*50;


}








// ===============================
// CHỌN CHUỒNG
// ===============================


function openCoop(type){


game.selectedCoop=type;


game.selectedChicken=null;


update();


}









// ===============================
// THÊM GÀ
// ===============================


function addChicken(type,coop){


let house=game.coops[coop];



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
// LẤY GÀ ĐANG XEM
// ===============================


function getCurrentChicken(){



if(game.selectedChicken===null)

return null;



return game.coops[

game.selectedCoop

]

.chickens[

game.selectedChicken

];


}









// ===============================
// LEVEL
// ===============================


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
// EXP TỰ ĐỘNG
// ===============================


setInterval(()=>{


Object.values(game.coops).forEach(coop=>{


coop.chickens.forEach(c=>{


if(!c.hatch && c.level<25){


c.exp+=2;


levelUp(c);


}



});


});



update();



},EXP_TIME);








// ===============================
// TRỨNG ĐẦU GAME
// ===============================


setInterval(()=>{


Object.values(game.coops).forEach(coop=>{


coop.chickens.forEach(c=>{


if(c.hatch){



let t=Math.ceil(

(c.hatchTime-Date.now())/1000

);



let box=document.getElementById("hatchTime");



if(t>0){


box.style.display="block";


box.innerHTML="⏳ Còn "+t+"s";


}



else{


c.hatch=false;


c.level=1;



box.style.display="none";


alert("🐣 Gà mới nở");


}



}



});


});



update();



},1000);
// ===============================
// CHỌN GÀ + POPUP CHI TIẾT
// ===============================


function selectChicken(index){


game.selectedChicken=index;


openChickenDetail();


}



function openChickenDetail(){


let c=getCurrentChicken();



if(!c)return;



let box=document.getElementById("chickenDetail");


let content=document.getElementById("detailContent");



box.style.display="block";



let status="Đang lớn";



if(c.hatch)

status="🥚 Đang nở";

else if(c.level>=25)

status="🐔 Trưởng thành";

else if(c.level>=10)

status="🐓 Gà lớn";

else if(c.level>=5)

status="🐥 Gà con";

else

status="🐣 Gà mới nở";





let eggTime=

Math.max(

0,

Math.ceil((c.eggTime-Date.now())/1000)

);




content.innerHTML=

`

<h3>${chickenName(c.type)}</h3>

<p>

⭐ Level:

${c.level}/25

</p>


<p>

🔥 EXP:

${Math.floor(c.exp)}/${needExp(c.level)}

</p>


<p>

🎂 Tuổi:

${c.age}/${c.maxAge}

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



}





function closeChickenDetail(){


document.getElementById("chickenDetail")
.style.display="none";


}









// ===============================
// CHO ĂN TỪ POPUP
// ===============================


function feedDetailChicken(type){


game.feed[type]--;



if(game.feed[type]<0){


game.feed[type]=0;


alert("Hết cám");


return;


}




let c=getCurrentChicken();



if(!c)return;



c.exp+=({

normal:40,

super:120,

weight:240,

grow:500,

vip:1000


})[type];



levelUp(c);


update();



}









// ===============================
// BÁN GÀ
// ===============================


function sellDetailChicken(){


let c=getCurrentChicken();



if(!c)return;



if(c.type==="gold"||c.type==="diamond"){


alert("Gà này không bán được");


return;


}



if(c.level<25){


alert("Cần Lv25");


return;


}



let money=

c.type==="super"

?

2500

:

600;




game.wallet.coin+=money;



game.coops[game.selectedCoop]
.chickens
.splice(game.selectedChicken,1);



closeChickenDetail();


addHistory(
"Bán "+chickenName(c.type)
+" +"+money+" xu"
);



update();



}









// ===============================
// RENDER CHUỒNG
// ===============================


function renderCoop(){


let box=document.getElementById("coopSlots");


if(!box)return;



box.innerHTML="";



let coop=game.coops[game.selectedCoop];



document.getElementById("coopTitle").innerHTML=
coop.name;



coop.chickens.forEach((c,i)=>{



let div=document.createElement("div");


div.className="slot";


div.onclick=()=>selectChicken(i);




div.innerHTML=

`

<div class="emoji">

${chickenIcon(c.type,c.level)}

</div>


${chickenName(c.type)}

<br>

Lv ${c.level}

<br>

EXP ${Math.floor(c.exp)}

<br>

🎂 ${c.age}/${c.maxAge}

`;



box.appendChild(div);



});



}









// ===============================
// ĐẺ TRỨNG
// ===============================


setInterval(()=>{


Object.values(game.coops)
.forEach(coop=>{


coop.chickens.forEach(c=>{


if(

!c.hatch &&

c.level>=10 &&

Date.now()>=c.eggTime

){


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



});


});



update();



},1000);









// ===============================
// SHOP GÀ
// ===============================


function buyChicken(type){


let coinPrice={


normal:400,

super:2000


};



let moneyPrice={


gold:35000,

diamond:80000


};




if(type==="gold"||type==="diamond"){



if(game.wallet.money<moneyPrice[type])

return;



game.wallet.money-=moneyPrice[type];



}



else{


if(game.wallet.coin<coinPrice[type])

return;



game.wallet.coin-=coinPrice[type];


}




let target=

type==="gold"||type==="diamond"

?

"star"

:

type==="super"

?

"super"

:

"normal";




addChicken(type,target);



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


if(game.wallet.coin<feedPrice[type])

return;



game.wallet.coin-=feedPrice[type];


game.feed[type]++;



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


if(game.eggs[type]<=0)

return;



game.eggs[type]--;


game.wallet.coin+=eggPrice[type];


addHistory(
"Bán trứng "+type
);



update();



}









// ===============================
// TIỀN
// ===============================


function moneyToCoin(){



if(game.wallet.money<100)

return;



game.wallet.money-=100;


game.wallet.coin+=500;


addHistory(
"Đổi 100 VNĐ → 500 xu"
);



update();


}





function coinToMoney(){



if(game.wallet.coin<50000)

return;



game.wallet.coin-=50000;


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



update();


}









// ===============================
// LỊCH SỬ
// ===============================


function addHistory(text){


account.history.unshift(text);



let h=document.getElementById("history");



if(h)

h.innerHTML=
account.history.join("<br>");



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








// ===============================
// MENU
// ===============================


function openPage(id){


document.querySelectorAll(".page")
.forEach(p=>p.classList.remove("active"));



document.getElementById(id)
.classList.add("active");



}









// ===============================
// UPDATE
// ===============================


function update(){



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





renderCoop();



}









// ===============================
// KHỞI TẠO
// ===============================


game.coops.normal.chickens.push(
createChicken("normal",true)
);



update();
