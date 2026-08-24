let chicken = {

    stage: "egg",

    level: 0,

    exp: 0,

    food: 100,

    coin: 0,

    hatchTime: Date.now() + 10000

};



// cập nhật giao diện

function updateGame(){


    let icon = "🥚";
    let name = "Trứng";



    if(chicken.stage == "baby"){

        icon = "🐣";
        name = "Gà mới nở";

    }



    if(chicken.stage == "chick"){

        icon = "🐥";
        name = "Gà con";

    }



    if(chicken.stage == "adult"){

        icon = "🐓";
        name = "Gà lớn";

    }



    if(chicken.stage == "sellable"){

        icon = "🐔";
        name = "Gà trưởng thành";

    }



    document.getElementById("chicken").innerHTML = icon;


    document.getElementById("stage").innerHTML = name;


    document.getElementById("level").innerHTML = chicken.level;


    document.getElementById("exp").innerHTML = chicken.exp;


    document.getElementById("food").innerHTML = chicken.food;


    document.getElementById("coin").innerHTML = chicken.coin;



    if(chicken.stage != "egg"){

        document.getElementById("timeBox").style.display = "none";

    }


}




// trứng nở

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


            chicken.stage = "baby";

            chicken.level = 1;


            document.getElementById("timeBox").style.display="none";


            alert("🎉 Trứng đã nở thành 🐣");


        }


    }



    updateGame();

}





// cho ăn

function feed(){



    if(chicken.stage == "egg"){

        alert("🥚 Trứng chưa nở!");

        return;

    }



    chicken.exp += 10;

    chicken.food -= 2;



    if(chicken.food < 0){

        chicken.food = 0;

    }



    checkLevel();



    updateGame();


}





// kiểm tra lên cấp

function checkLevel(){



    if(chicken.stage == "baby"
    && chicken.exp >= 100){


        chicken.stage = "chick";

        chicken.level = 5;

        chicken.exp = 0;


        alert("🎉 🐣 đã thành 🐥 Gà con");


    }



    else if(chicken.stage == "chick"
    && chicken.exp >= 200){


        chicken.stage = "adult";

        chicken.level = 10;

        chicken.exp = 0;


        alert("🎉 🐥 đã thành 🐓 Gà lớn");


    }



    else if(chicken.stage == "adult"
    && chicken.exp >= 500){


        chicken.stage = "sellable";

        chicken.level = 25;

        chicken.exp = 0;


        alert("🎉 🐔 Gà đã trưởng thành! Có thể bán");


    }


}




// chạy kiểm tra mỗi giây

setInterval(checkEgg,1000);


updateGame();
