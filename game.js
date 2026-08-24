let chickens = [

    {
        id: 1,

        level: 0,

        exp: 0,

        food: 100,

        hatchTime: Date.now() + 10000
    }

];


// con gà đang chọn
let currentChicken = 0;



function getChicken(){

    return chickens[currentChicken];

}




function updateGame(){


    let chicken = getChicken();


    let icon = "🥚";
    let name = "Trứng";



    if(chicken.level >= 1 && chicken.level < 5){

        icon = "🐣";
        name = "Gà mới nở";

    }


    if(chicken.level >= 5 && chicken.level < 10){

        icon = "🐥";
        name = "Gà con";

    }


    if(chicken.level >= 10 && chicken.level < 25){

        icon = "🐓";
        name = "Gà lớn";

    }


    if(chicken.level >= 25){

        icon = "🐔";
        name = "Gà trưởng thành";

    }



    document.getElementById("chicken").innerHTML = icon;


    document.getElementById("stage").innerHTML = name;


    document.getElementById("level").innerHTML = chicken.level;


    document.getElementById("exp").innerHTML = chicken.exp;


    document.getElementById("food").innerHTML = chicken.food;


}



// trứng nở

function checkEgg(){


    chickens.forEach(function(chicken){


        if(chicken.level == 0){


            if(Date.now() >= chicken.hatchTime){


                chicken.level = 1;


                alert("🎉 Một quả trứng đã nở 🐣");


            }


        }


    });



    updateGame();


}





// cho ăn

function feed(){


    let chicken = getChicken();



    if(chicken.level == 0){

        alert("🥚 Chưa nở!");

        return;

    }



    chicken.food += 10;


    chicken.exp += 100; // test nhanh



    if(chicken.food > 100){

        chicken.food = 100;

    }



    if(chicken.exp >= 100){


        chicken.level++;

        chicken.exp = 0;


        alert(
            "🎉 Gà lên Lv " + chicken.level
        );


    }


    updateGame();

}




setInterval(checkEgg,1000);


updateGame();
