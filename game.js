let chicken = {

    level:0,

    exp:0,

    food:100,

    coin:0,

    hatchTime:Date.now()+10000

};



// cập nhật

function updateGame(){


    let icon="🥚";
    let name="Trứng";



    if(chicken.level>=1 && chicken.level<5){

        icon="🐣";
        name="Gà mới nở";

    }


    if(chicken.level>=5 && chicken.level<10){

        icon="🐥";
        name="Gà con";

    }


    if(chicken.level>=10 && chicken.level<25){

        icon="🐓";
        name="Gà lớn";

    }


    if(chicken.level>=25){

        icon="🐔";
        name="Gà trưởng thành";

    }



    document.getElementById("chicken").innerHTML=icon;

    document.getElementById("stage").innerHTML=name;

    document.getElementById("level").innerHTML=chicken.level;

    document.getElementById("exp").innerHTML=chicken.exp;

    document.getElementById("food").innerHTML=chicken.food;

    document.getElementById("coin").innerHTML=chicken.coin;



    // ẩn thời gian khi đã nở

    if(chicken.level>0){

        document.getElementById("timeBox").style.display="none";

    }



    // hiện bán khi lv25

    if(chicken.level>=25){

        document.getElementById("sellButton").style.display="block";

    }
    else{

        document.getElementById("sellButton").style.display="none";

    }


}




// trứng nở

function checkEgg(){


    if(chicken.level==0){


        let time=Math.ceil(
            (chicken.hatchTime-Date.now())/1000
        );



        if(time>0){

            document.getElementById("time").innerHTML=
            "🥚 Còn "+time+"s";

        }



        if(time<=0){


            chicken.level=1;


            document.getElementById("timeBox").style.display="none";


            alert("🎉 Trứng nở thành 🐣");


        }


    }



    updateGame();

}





// cho ăn

function feed(){


    if(chicken.level==0){

        alert("🥚 Trứng chưa nở!");

        return;

    }



    if(chicken.level>=25){

        alert("🐔 Gà đã trưởng thành, hãy bán!");

        return;

    }



    chicken.food+=10;

    chicken.exp+=100;



    if(chicken.food>100){

        chicken.food=100;

    }



    if(chicken.exp>=100){


        chicken.level++;

        chicken.exp=0;


        alert(
            "🎉 Gà lên Lv "+chicken.level
        );


    }



    updateGame();


}





// bán gà

function sellChicken(){


    if(chicken.level<25){

        return;

    }



    chicken.coin+=500;



    alert("💰 Bán gà nhận 500 xu!");



    // tạo gà mới

    chicken.level=0;

    chicken.exp=0;

    chicken.food=100;



    chicken.hatchTime=Date.now()+10000;



    document.getElementById("timeBox").style.display="block";



    updateGame();


}




// đói theo thời gian

setInterval(function(){


    if(chicken.level>0 && chicken.food>0){

        chicken.food--;

    }


    updateGame();


},60000);



setInterval(checkEgg,1000);



updateGame();
