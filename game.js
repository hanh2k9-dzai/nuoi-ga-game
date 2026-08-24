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
