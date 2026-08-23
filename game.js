// Dữ liệu con gà
let chicken = {
    level: 1,
    exp: 0,
    food: 100,
    coin: 0
};


// Hàm cho ăn
function feed() {

    // tăng chỉ số
    chicken.food += 10;
    chicken.exp += 10;
    chicken.coin += 1;


    // giới hạn độ no
    if (chicken.food > 100) {
        chicken.food = 100;
    }


    // lên level
    if (chicken.exp >= 100) {

        chicken.level += 1;
        chicken.exp = 0;

        alert("🎉 Gà đã lên level " + chicken.level);

    }


    // cập nhật màn hình
    updateGame();

}



// cập nhật chữ trên game
function updateGame() {

    document.getElementById("level").innerHTML =
        chicken.level;


    document.getElementById("exp").innerHTML =
        chicken.exp;


    document.getElementById("food").innerHTML =
        chicken.food;


    document.getElementById("coin").innerHTML =
        chicken.coin;

}
