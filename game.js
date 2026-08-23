let chicken = {

    level: 1,

    exp: 0,

    food: 100,

    coin: 0

};



function feed(){


    chicken.food += 10;

    chicken.exp += 10;

    chicken.coin += 1;



    if(chicken.food > 100){

        chicken.food = 100;

    }



    if(chicken.exp >= 100){


        chicken.level += 1;

        chicken.exp = 0;


        alert(
            "🎉 Gà lên level " 
            + chicken.level
        );

    }



    updateChicken();

}




function updateChicken(){


    document.getElementById("level").innerHTML =
        chicken.level;


    document.getElementById("exp").innerHTML =
        chicken.exp;


    document.getElementById("food").innerHTML =
        chicken.food;


    document.getElementById("coin").innerHTML =
        chicken.coin;



    let pet = "🥚";



    if(chicken.level >= 3){

        pet = "🐣";

    }



    if(chicken.level >= 8){

        pet = "🐔";

    }



    document.getElementById("chicken").innerHTML =
        pet;


}
