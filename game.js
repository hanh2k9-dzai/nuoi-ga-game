let chicken = {
    stage: "egg",
    level: 0,
    hatchTime: Date.now() + 10000
};


function updateGame() {

    let icon = "🥚";
    let text = "Trứng";
    let level = 0;


    if (chicken.stage === "newborn") {

        icon = "🐣";
        text = "Gà mới nở";
        level = 3;

    }


    document.getElementById("chicken").innerHTML = icon;

    document.getElementById("level").innerHTML = level;

    document.getElementById("stage").innerHTML = text;

}



function checkEgg() {


    let now = Date.now();


    if (
        chicken.stage === "egg" &&
        now >= chicken.hatchTime
    ) {


        chicken.stage = "newborn";


        alert("🎉 Trứng đã nở!");


    }


    updateGame();

}



setInterval(checkEgg,1000);


updateGame();
