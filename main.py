import pygame
import sys

# Khởi tạo
pygame.init()

# Kích thước màn hình
WIDTH = 600
HEIGHT = 800

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Nuôi Gà")

# Màu
WHITE = (255, 255, 255)
YELLOW = (255, 220, 0)
GREEN = (100, 200, 100)

# Font
font = pygame.font.SysFont(None, 50)

# Gà
chicken_x = WIDTH // 2
chicken_y = 400

# Vòng lặp game
running = True

while running:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Vẽ nền
    screen.fill(GREEN)

    # Tiêu đề
    title = font.render("NUOI GA", True, WHITE)
    screen.blit(title, (180, 50))

    # Vẽ gà tạm thời
    pygame.draw.circle(
        screen,
        YELLOW,
        (chicken_x, chicken_y),
        50
    )

    pygame.display.update()

pygame.quit()
sys.exit()
