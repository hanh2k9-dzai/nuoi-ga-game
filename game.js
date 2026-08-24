let chicken = {

    stage: "egg",

    level: 0,

    exp: 0,

    food: 100,

    coin: 0,

    hatchTime: Date.now() + 10000

};



function updateGame(){


    let icon = "🥚";
    let stageName = "Trứng";
    let level = 0;



    if(chicken.stage == "newborn"){

        icon = "🐣";
        stageName = "Gà mới nở";
        level = 3;

    }



    if(chicken.stage == "baby"){

        icon = "🐥";
        stageName = "Gà con";
        level = 5;

    }



    if(chicken.stage == "adult"){

        icon = "🐓";
        stageName = "Gà lớn";
        level = 10;

    }



    document.getElementById("chicken").innerHTML = icon;

    document.getElementById("stage").innerHTML = stageName;

    document.getElementById("level").innerHTML = level;

    document.getElementById("exp").innerHTML = chicken.exp;

    document.getElementById("food").innerHTML = chicken.food;

    document.getElementById("coin").innerHTML = chicken.coin;



    // Nếu không còn là trứng thì xóa thời gian

    if(chicken.stage != "egg"){

        document.getElementById("time").innerHTML = "";

    }

}



function checkEgg(){


    if(chicken.stage == "egg"){


        let time = Math.ceil(
            (chicken.hatchTime - Date.now()) / 1000
        );



        if(time > 0){

            document.getElementById("time").innerHTML =
            "🥚 Còn " + time + "s";

        }



        if(time <= 0){


            chicken.stage = "newborn";


            alert("🎉 Trứng đã nở thành 🐣");


        }


    }


    updateGame();


}




function feed(){


    if(chicken.stage == "egg"){

        alert("🥚 Trứng chưa nở!");

        return;

    }



    chicken.food += 5;

    chicken.exp += 20;

    chicken.coin += 1;



    if(chicken.food > 100){

        chicken.food = 100;

    }



    if(chicken.stage == "newborn"
    && chicken.exp >= 100){


        chicken.stage = "baby";

        chicken.exp = 0;


        alert("🎉 🐣 đã thành 🐥");


    }



    else if(chicken.stage == "baby"
    && chicken.exp >= 100){


        chicken.stage = "adult";

        chicken.exp = 0;


        alert("🎉 🐥 đã thành 🐓");


    }



    updateGame();

}




setInterval(checkEgg,1000);


updateGame();
