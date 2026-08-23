let chicken = {

    stage: "egg",

    level: 0,

    hatchTime: Date.now() + 10000

};



function updateGame(){


    let icon = "🥚";


    if(chicken.stage == "egg"){

        icon = "🥚";
        chicken.level = 0;

    }


    if(chicken.stage == "newborn"){

        icon = "🐣";
        chicken.level = 3;

    }


    if(chicken.stage == "baby"){

        icon = "🐥";
        chicken.level = 5;

    }


    if(chicken.stage == "adult"){

        icon = "🐓";
        chicken.level = 10;

    }



    document.getElementById("chicken").innerHTML = icon;


    document.getElementById("level").innerHTML =
    chicken.level;


}



// kiểm tra thời gian nở

function checkEgg(){


    if(
        chicken.stage == "egg" &&
        Date.now() >= chicken.hatchTime
    ){

        chicken.stage = "newborn";

        alert("🥚 Trứng đã nở thành 🐣");


    }


    updateGame();

}



// chạy liên tục

setInterval(checkEgg,1000);



updateGame();
