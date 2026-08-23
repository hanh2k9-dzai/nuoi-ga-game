let chicken = {

    stage: "egg",

    level: 1,

    exp: 0,

    food: 100,

    coin: 0

};



function feed() {

    chicken.food += 10;
    chicken.exp += 10;
    chicken.coin += 1;


    if (chicken.exp >= 100) {

        chicken.level += 1;
        chicken.exp = 0;

    }


    checkGrowth();

    updateGame();

}



function checkGrowth() {


    if (chicken.level >= 3) {

        chicken.stage = "baby";

    }


    if (chicken.level >= 8) {

        chicken.stage = "adult";

    }

}



function updateGame() {


    document.getElementById("level").innerHTML =
        chicken.level;


    document.getElementById("exp").innerHTML =
        chicken.exp;


    document.getElementById("food").innerHTML =
        chicken.food;


    document.getElementById("coin").innerHTML =
        chicken.coin;



    let image = "🥚";


    if (chicken.stage == "baby") {

        image = "🐣";

    }


    if (chicken.stage == "adult") {

        image = "🐔";

    }


    document.getElementById("chicken").innerHTML = image;

}
