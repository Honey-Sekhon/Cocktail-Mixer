import tkinter as tk
from tkinter import messagebox
from PIL import Image, ImageTk

# Function to handle making a drink
def make_drink(drink_name):
    messagebox.showinfo("Making Drink", f"Making your {drink_name}...")

# UI setup
root = tk.Tk()
root.title("MIXEASY")
root.geometry("800x480")
root.configure(bg="#FFFFFF")  # Set background to white

# Drink names and images
drinks = [
    {"name": "Martini", "image": "martini.png"},
    {"name": "Margarita", "image": "margarita.png"},
    {"name": "Old Fashioned", "image": "oldFashioned.png"},
    {"name": "Mojito", "image": "mojito.png"},
    {"name": "Pina Colada", "image": "pinaColada.png"},
    {"name": "Cosmopolitan", "image": "cosmopolitan.png"},
    {"name": "Mai Tai", "image": "maiTai.png"},
    {"name": "Bloody Mary", "image": "bloodyMary.png"},
    {"name": "Daiquiri", "image": "daiquiri.png"},
    {"name": "Whiskey Sour", "image": "whiskeySour.png"}
]

# Function to create drink button
def create_drink_button(parent, drink, row, col):
    frame = tk.Frame(parent, bg="#87CEEB", width=150, height=150)
    frame.grid_propagate(False)
    frame.grid(row=row, column=col, padx=10, pady=10)
    try:
        image = Image.open(drink["image"])
        image = image.resize((100, 100), Image.LANCZOS)  # Resize image if needed
        photo = ImageTk.PhotoImage(image)
        img_label = tk.Label(frame, image=photo, bg="#87CEEB")
        img_label.image = photo  # Keep a reference to avoid garbage collection
        img_label.pack(pady=5)
    except Exception as e:
        print(f"Error loading image for {drink['name']}: {e}")
        img_label = tk.Label(frame, text="No Image", bg="#87CEEB")
        img_label.pack(pady=5)
    label = tk.Label(frame, text=drink["name"], font=("Helvetica", 12), bg="#87CEEB")
    label.pack(pady=5)
    frame.bind("<Button-1>", lambda e: make_drink(drink["name"]))

# Title
title_label = tk.Label(root, text="MIXEASY", font=("Helvetica", 32, "bold"), bg="#FFFFFF")
title_label.pack(pady=20)

# Grid for drinks
drinks_frame = tk.Frame(root, bg="#FFFFFF")
drinks_frame.pack(pady=10)

# Populate grid with drink buttons
for i, drink in enumerate(drinks):
    create_drink_button(drinks_frame, drink, 0, i)  # Arrange in a single row

root.mainloop()
