class Chicken:

    def __init__(self):
        self.name = "Gà con"
        self.level = 1
        self.exp = 0
        self.food = 100
        self.coin = 0


    def feed(self):
        self.food += 10
        self.exp += 5


        if self.exp >= 100:
            self.level += 1
            self.exp = 0
