import pygame
import sys
from chicken import Chicken

# Khởi tạo
pygame.init()

# Kích thước màn hình
WIDTH = 400
HEIGHT = 800

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Nuôi Gà")

# Màu
WHITE = (255, 255, 255)
GREEN = (120, 200, 120)
YELLOW = (255, 220, 0)
BROWN = (180, 120, 60)
BLACK = (0, 0, 0)

# Font
font = pygame.font.SysFont(None, 35)
big_font = pygame.font.SysFont(None, 50)

# Tạo gà
chicken = Chicken()

# Vị trí gà
chicken_x = WIDTH // 2
chicken_y = 350


# Nút cho ăn
feed_button = pygame.Rect(
    100,
    650,
    200,
    70
)


# Vòng lặp game
running = True

while running:

    for event in pygame.event.get():

        if event.type == pygame.QUIT:
            running = False


        # Khi bấm nút
        if event.type == pygame.MOUSEBUTTONDOWN:

            if feed_button.collidepoint(event.pos):

                chicken.feed()


    # Vẽ nền
    screen.fill(GREEN)


    # Tiêu đề
    title = big_font.render(
        "NUOI GA",
        True,
        WHITE
    )

    screen.blit(
        title,
        (120, 40)
    )


    # Vẽ gà tạm
    pygame.draw.circle(
        screen,
        YELLOW,
        (chicken_x, chicken_y),
        60
    )


    # Thông tin gà

    info = [
        f"Ten: {chicken.name}",
        f"Level: {chicken.level}",
        f"EXP: {chicken.exp}/100",
        f"No: {chicken.food}",
        f"Xu: {chicken.coin}"
    ]


    y = 150

    for text in info:

        line = font.render(
            text,
            True,
            BLACK
        )

        screen.blit(
            line,
            (50, y)
        )

        y += 40



    # Vẽ nút cho ăn

    pygame.draw.rect(
        screen,
        BROWN,
        feed_button,
        border_radius=15
    )


    button_text = font.render(
        "CHO AN",
        True,
        WHITE
    )

    screen.blit(
        button_text,
        (155, 670)
    )


    pygame.display.update()


pygame.quit()
sys.exit()
