// ===============================
// GAME.JS v0.7.2.1 PART 1
// ===============================


// CONFIG

const HATCH_TIME = 10000;

const EGG_TIME = 15000;

const EXP_TIME = 1500;

const AGE_TIME = 120000;






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
// TẠO GÀ
// ===============================


function createChicken(type="normal",first=false){


return{


id:Date.now()+Math.random(),


type:type,


level:first?1:1,


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








// ===============================
// ICON + TÊN
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


if(level<=0)

return 100;


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
// CHUỒNG
// ===============================


function openCoop(type){



if(!game.coops[type].open){


if(type==="super"){


if(game.wallet.coin<25000){

alert("Cần 25000 xu để mở");

return;

}


game.wallet.coin-=25000;


}



if(type==="star"){


if(game.wallet.money<20000){


alert("Cần 20000 VNĐ để mở");


return;


}


game.wallet.money-=20000;


}



game.coops[type].open=true;


}



game.selectedCoop=type;


game.selectedChicken=null;



update();


}








// ===============================
// THÊM GÀ
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









function getCurrentChicken(){


if(game.selectedChicken===null)

return null;



return game.coops[game.selectedCoop]

.chickens[game.selectedChicken];


}








// ===============================
// CHỌN GÀ
// ===============================


function selectChicken(index){


game.selectedChicken=index;


openChickenDetail();



}
// ===============================
// POPUP CHI TIẾT GÀ
// ===============================


function openChickenDetail(){


let c=getCurrentChicken();



if(!c)return;



let box=document.getElementById("chickenDetail");

let content=document.getElementById("detailContent");



box.style.display="block";



let status="🐣 Gà mới nở";



if(c.level>=25)

status="🐔 Trưởng thành";

else if(c.level>=10)

status="🐓 Gà lớn";

else if(c.level>=5)

status="🐥 Gà con";




let egg=

Math.max(

0,

Math.ceil(

(c.eggTime-Date.now())/1000

)

);



content.innerHTML=

`

<h3>

${chickenName(c.type)}

</h3>


<p>

⭐ Lv:

${c.level}/25

</p>


<p>

🔥 EXP:

${Math.floor(c.exp)}/${needExp(c.level)}

</p>



<p>

🎂 Tuổi:

${c.age}/${c.maxAge} ngày

</p>



<p>

📌 Trạng thái:

${status}

</p>



<p>

🥚 Đẻ trứng:

${egg}s

</p>

`;



let sell=document.getElementById("sellChickenBtn");



if(

c.type==="gold"

||

c.type==="diamond"

){


sell.innerHTML="🔒 Không thể bán";


}


else if(c.level<25){


sell.innerHTML="🔒 Chưa đạt Lv25";


}


else{


sell.innerHTML="💰 Bán gà";


}



updateFeedDetail();


}







function closeChickenDetail(){


document.getElementById("chickenDetail")

.style.display="none";


}







// ===============================
// MENU CÁM
// ===============================


function toggleFeedMenu(){


let menu=document.getElementById("feedMenu");


if(menu.style.display==="block"){


menu.style.display="none";


}

else{


menu.style.display="block";


}



}






function updateFeedDetail(){



let ids=[


"detailFeedNormal",

"detailFeedSuper",

"detailFeedWeight",

"detailFeedGrow",

"detailFeedVip"


];



let values=[


game.feed.normal,

game.feed.super,

game.feed.weight,

game.feed.grow,

game.feed.vip


];



ids.forEach((id,i)=>{


let e=document.getElementById(id);


if(e)

e.innerHTML=values[i];


});



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




function feedDetailChicken(type){



let c=getCurrentChicken();



if(!c)return;



if(game.feed[type]<=0){


alert("Hết cám");


return;


}



game.feed[type]--;



c.exp+=feedExp[type];


levelUp(c);



update();


openChickenDetail();


}








// ===============================
// BÁN GÀ
// ===============================


function sellDetailChicken(){



let c=getCurrentChicken();



if(!c)return;



if(

c.type==="gold"

||

c.type==="diamond"

){


alert("Gà này không thể bán");


return;


}




if(c.level<25){


alert("Gà chưa đạt Lv25");


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



closeChickenDetail();


game.selectedChicken=null;


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



div.innerHTML=`

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



}









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
// SHOP
// ===============================


function buyChicken(type){



let coin={


normal:400,

super:2000


};



let money={


gold:35000,

diamond:80000


};



if(type==="gold"||type==="diamond"){


if(game.wallet.money<money[type]){

alert("Không đủ VNĐ");

return;

}



game.wallet.money-=money[type];



}

else{


if(game.wallet.coin<coin[type]){


alert("Không đủ xu");


return;


}



game.wallet.coin-=coin[type];



}





let coop=

type==="gold"||type==="diamond"

?

"star"

:

type==="super"

?

"super"

:

"normal";



addChicken(type,coop);



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



if(game.wallet.coin<feedPrice[type]){


alert("Không đủ xu");


return;


}



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

"Bán trứng "

+

type

);



update();



}
