# import tkinter as tk
# from tkinter import messagebox, ttk
# from PIL import Image, ImageTk
# import os
# from datetime import datetime
# import time

# class CocktailMixer:
#     def __init__(self, root):
#         self.root = root
#         self.root.title("Automatic Cocktail Mixer")
#         self.root.geometry("800x600")
#         self.root.configure(bg="#ffffff")

#         self.cocktails = [
#             {"name": "Mojito", "image": "drink.png"},
#             {"name": "Margarita", "image": "drink.png"},
#             {"name": "Pina Colada", "image": "drink.png"},
#             {"name": "Old Fashioned", "image": "drink.png"},
#             {"name": "Martini", "image": "drink.png"},
#             {"name": "Cosmopolitan", "image": "drink.png"}
#         ]

#         self.selected_cocktail = None
#         self.animation_video = "making.mp4"  # Placeholder for video file

#         self.home_page()

#     def home_page(self):
#         self.clear_frame()

#         # Welcome message
#         welcome_label = tk.Label(self.root, text="Welcome to the Automatic Cocktail Mixer!", font=("Arial", 18, "bold"), bg="#ffffff", fg="#333")
#         welcome_label.pack(pady=10)

#         # Create a frame for cocktail options with a scrollbar
#         canvas = tk.Canvas(self.root, bg="#ffffff")
#         scrollbar = ttk.Scrollbar(self.root, orient="vertical", command=canvas.yview)
#         scrollable_frame = ttk.Frame(canvas, padding=(0, 0, 0, 0))
        
#         scrollable_frame.bind(
#             "<Configure>",
#             lambda e: canvas.configure(
#                 scrollregion=canvas.bbox("all")
#             )
#         )

#         canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
#         canvas.configure(yscrollcommand=scrollbar.set)

#         canvas.pack(side="left", fill="both", expand=True)
#         scrollbar.pack(side="right", fill="y")

#         # Cocktail options
#         self.cocktail_frames = []
#         for i, cocktail in enumerate(self.cocktails):
#             frame = tk.Frame(scrollable_frame, bg="#ffffff", bd=2, relief=tk.RIDGE)
#             frame.grid(row=i//2, column=i%2, padx=10, pady=10)

#             # Load image using PIL
#             image = Image.open(cocktail["image"])
#             image = image.resize((150, 150), Image.LANCZOS)  # Resize image to fit in the grid
#             photo = ImageTk.PhotoImage(image)
            
#             image_label = tk.Label(frame, image=photo, bg="#ffffff")
#             image_label.image = photo  # Keep a reference to avoid garbage collection
#             image_label.pack(pady=5)

#             name_label = tk.Label(frame, text=cocktail["name"], font=("Arial", 12, "bold"), bg="#ffffff", fg="#333")
#             name_label.pack(pady=5)

#             frame.bind("<Button-1>", lambda e, c=cocktail: self.select_cocktail(c))
#             image_label.bind("<Button-1>", lambda e, c=cocktail: self.select_cocktail(c))
#             name_label.bind("<Button-1>", lambda e, c=cocktail: self.select_cocktail(c))
#             self.cocktail_frames.append((frame, name_label))

#         # Select button (initially hidden)
#         self.select_button = tk.Button(self.root, text="Make this Drink", command=self.making_drink_page, font=("Arial", 14), bg="#28a745", fg="#fff")
#         self.select_button.pack(side=tk.BOTTOM, pady=20)
#         self.select_button.pack_forget()

#     def select_cocktail(self, cocktail):
#         self.selected_cocktail = cocktail
#         for frame, label in self.cocktail_frames:
#             frame.config(bg="#ffffff")

#         selected_frame = next((frame for frame, label in self.cocktail_frames if label.cget("text") == cocktail["name"]), None)
#         if selected_frame:
#             selected_frame.config(bg="#d1ffd1")
        
#         self.select_button.pack(side=tk.BOTTOM, pady=20)

#     def making_drink_page(self):
#         if not self.selected_cocktail:
#             messagebox.showwarning("No Selection", "Please select a cocktail first!")
#             return

#         self.clear_frame()

#         making_label = tk.Label(self.root, text=f"Making your {self.selected_cocktail['name']}...", font=("Arial", 18, "bold"), bg="#ffffff", fg="#333")
#         making_label.pack(pady=20)

#         # Placeholder for video (implement video playback with a suitable library, e.g., Tkinter Video)
#         video_label = tk.Label(self.root, text="[Animation Video Here]", font=("Arial", 14), bg="#ffffff", fg="#333")
#         video_label.pack(pady=20)

#         self.progress_label = tk.Label(self.root, text="", font=("Arial", 16), bg="#ffffff", fg="#333")
#         self.progress_label.pack(pady=10)

#         self.steps = [
#             "Starting to make your drink...",
#             "Adding ingredients...",
#             "Shaking...",
#             "Pouring into the glass...",
#             "Your cocktail is ready! Enjoy!"
#         ]
        
#         self.current_step = 0
#         self.update_progress()

#     def update_progress(self):
#         if self.current_step < len(self.steps):
#             self.progress_label.config(text=self.steps[self.current_step])
#             self.current_step += 1
#             self.root.after(1500, self.update_progress)
#         else:
#             self.completion_page()

#     def completion_page(self):
#         self.clear_frame()

#         completion_label = tk.Label(self.root, text="Your drink is ready!", font=("Arial", 18, "bold"), bg="#ffffff", fg="#333")
#         completion_label.pack(pady=20)

#         drink_image_label = tk.Label(self.root, text="[Image of Drink]", font=("Arial", 14), bg="#ffffff", fg="#333")
#         drink_image_label.pack(pady=20)

#         warm_message_label = tk.Label(self.root, text="Enjoy your drink!", font=("Arial", 16), bg="#ffffff", fg="#333")
#         warm_message_label.pack(pady=10)

#         self.root.after(5000, self.home_page)

#     def clear_frame(self):
#         for widget in self.root.winfo_children():
#             widget.destroy()

# if __name__ == "__main__":
#     root = tk.Tk()
#     app = CocktailMixer(root)
#     root.mainloop()

# import tkinter as tk
# from tkinter import ttk, messagebox
# from random import choice, randint
# import time

# class CocktailMixer:
#     def __init__(self, root):
#         self.root = root
#         self.root.title("Automatic Cocktail Mixer")
#         self.root.geometry("800x600")
#         self.root.configure(bg="#ffffff")

#         self.drinks_options = ["Rum", "Vodka", "Tequila", "Whiskey", "Gin", "Brandy"]
#         self.selected_drinks = []

#         self.available_drinks = []
#         self.selected_drink = None

#         self.home_page()

#     def home_page(self):
#         self.clear_frame()

#         # Welcome message
#         welcome_label = tk.Label(self.root, text="Welcome to the Automatic Cocktail Mixer!", font=("Arial", 18, "bold"), bg="#ffffff", fg="#333")
#         welcome_label.pack(pady=20)

#         # Drop-down menus for selecting drinks
#         self.drink_vars = [tk.StringVar() for _ in range(4)]
#         for drink_var in self.drink_vars:
#             drink_menu = ttk.Combobox(self.root, textvariable=drink_var)
#             drink_menu['values'] = self.drinks_options
#             drink_menu['state'] = 'readonly'
#             drink_menu.pack(pady=10)

#         # Button to proceed to the next page
#         next_button = tk.Button(self.root, text="Next", command=self.selection_page, font=("Arial", 14), bg="#28a745", fg="#fff")
#         next_button.pack(side=tk.BOTTOM, pady=20)

#     def selection_page(self):
#         self.selected_drinks = [var.get() for var in self.drink_vars]
#         if any(drink == '' for drink in self.selected_drinks):
#             messagebox.showwarning("Selection Error", "Please select all drink options.")
#             return

#         self.clear_frame()

#         # Generate random fake data for available drinks
#         self.available_drinks = self.generate_fake_drinks(self.selected_drinks)

#         selection_label = tk.Label(self.root, text="Available Drinks:", font=("Arial", 18, "bold"), bg="#ffffff", fg="#333")
#         selection_label.pack(pady=20)

#         self.drink_var = tk.StringVar(value=self.available_drinks[0])
#         for drink in self.available_drinks:
#             drink_radio = tk.Radiobutton(self.root, text=drink, variable=self.drink_var, value=drink, font=("Arial", 14), bg="#ffffff", fg="#333")
#             drink_radio.pack(pady=5)

#         # Button to start making the drink
#         make_button = tk.Button(self.root, text="Make this Drink", command=self.making_drink_page, font=("Arial", 14), bg="#28a745", fg="#fff")
#         make_button.pack(side=tk.BOTTOM, pady=20)

#     def generate_fake_drinks(self, selected_drinks):
#         combinations = []
#         for _ in range(10):
#             combination = " + ".join(choice(selected_drinks) for _ in range(randint(2, 4)))
#             combinations.append(combination)
#         return combinations

#     def making_drink_page(self):
#         self.selected_drink = self.drink_var.get()
#         self.clear_frame()

#         making_label = tk.Label(self.root, text=f"Making your {self.selected_drink}...", font=("Arial", 18, "bold"), bg="#ffffff", fg="#333")
#         making_label.pack(pady=20)

#         self.progress_label = tk.Label(self.root, text="", font=("Arial", 16), bg="#ffffff", fg="#333")
#         self.progress_label.pack(pady=10)

#         self.steps = [
#             "Starting to make your drink...",
#             "Adding ingredients...",
#             "Shaking...",
#             "Pouring into the glass...",
#             "Your cocktail is ready! Enjoy!"
#         ]

#         self.current_step = 0
#         self.update_progress()

#     def update_progress(self):
#         if self.current_step < len(self.steps):
#             self.progress_label.config(text=self.steps[self.current_step])
#             self.current_step += 1
#             self.root.after(1500, self.update_progress)
#         else:
#             self.completion_page()

#     def completion_page(self):
#         self.clear_frame()

#         completion_label = tk.Label(self.root, text="Your drink is ready!", font=("Arial", 18, "bold"), bg="#ffffff", fg="#333")
#         completion_label.pack(pady=20)

#         drink_image_label = tk.Label(self.root, text="[Image of Drink]", font=("Arial", 14), bg="#ffffff", fg="#333")
#         drink_image_label.pack(pady=20)

#         warm_message_label = tk.Label(self.root, text="Enjoy your drink!", font=("Arial", 16), bg="#ffffff", fg="#333")
#         warm_message_label.pack(pady=10)

#         self.root.after(5000, self.home_page)

#     def clear_frame(self):
#         for widget in self.root.winfo_children():
#             widget.destroy()

# if __name__ == "__main__":
#     root = tk.Tk()
#     app = CocktailMixer(root)
#     root.mainloop()
# ***********************************************************************************
import tkinter as tk
from tkinter import ttk, messagebox
from PIL import Image, ImageTk, ImageOps
from random import choice, randint
import time

class CocktailMixer:
    def __init__(self, root):
        self.root = root
        self.root.title("Automatic Cocktail Mixer")
        self.root.geometry("800x600")
        self.root.configure(bg="#f2f2f2")

        self.drinks_options = ["Rum", "Vodka", "Tequila", "Whiskey", "Gin", "Brandy"]
        self.selected_drinks = []

        self.available_drinks = []
        self.selected_drink = None

        self.home_page()

    def home_page(self):
        self.clear_frame()

        # Welcome message
        welcome_label = tk.Label(self.root, text="Welcome to the Automatic Cocktail Mixer!", font=("Arial", 18, "bold"), bg="#f2f2f2", fg="#333")
        welcome_label.pack(pady=20)

        # Frame for drink cards
        drinks_frame = tk.Frame(self.root, bg="#f2f2f2")
        drinks_frame.pack(pady=10)

        # Drink cards
        self.drink_vars = []
        self.card_frames = []
        for i in range(4):
            card_frame = tk.Frame(drinks_frame, bg="#ffffff", bd=2, relief=tk.RIDGE)
            card_frame.grid(row=i//2, column=i%2, padx=20, pady=20)
            self.card_frames.append(card_frame)

            card_label = tk.Label(card_frame, text=f"Drink {i+1}", font=("Arial", 14, "bold"), bg="#ffffff", fg="#333")
            card_label.pack(pady=5)

            image = Image.open("drink.jpg")  # Replace with path to a default image
            image = ImageOps.fit(image, (120, 120), Image.LANCZOS)
            photo = ImageTk.PhotoImage(image)

            image_label = tk.Label(card_frame, image=photo, bg="#ffffff")
            image_label.image = photo  # Keep a reference to avoid garbage collection
            image_label.pack(pady=5)

            drink_var = tk.StringVar()
            drink_menu = ttk.Combobox(card_frame, textvariable=drink_var, font=("Arial", 12))
            drink_menu['values'] = self.drinks_options
            drink_menu['state'] = 'readonly'
            drink_menu.pack(pady=5)

            drink_menu.bind("<<ComboboxSelected>>", lambda event, index=i: self.highlight_card(index))

            self.drink_vars.append(drink_var)

        # Center the drinks_frame
        drinks_frame.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

        # Button to proceed to the next page
        next_button = tk.Button(self.root, text="Next", command=self.selection_page, font=("Arial", 14), bg="#28a745", fg="#fff")
        next_button.pack(side=tk.BOTTOM, pady=20)

    def highlight_card(self, index):
        for i, frame in enumerate(self.card_frames):
            if i == index:
                frame.config(bg="#d1ffd1", relief=tk.SUNKEN)
            else:
                frame.config(bg="#ffffff", relief=tk.RIDGE)

    def selection_page(self):
        self.selected_drinks = [var.get() for var in self.drink_vars]
        if any(drink == '' for drink in self.selected_drinks):
            messagebox.showwarning("Selection Error", "Please select all drink options.")
            return

        self.clear_frame()

        # Generate random fake data for available drinks
        self.available_drinks = self.generate_fake_drinks(self.selected_drinks)

        selection_label = tk.Label(self.root, text="Select the Drink", font=("Arial", 18, "bold"), bg="#f2f2f2", fg="#333")
        selection_label.pack(pady=20)

        # Create a canvas and a scrollbar for the drink cards
        canvas = tk.Canvas(self.root, bg="#f2f2f2")
        scrollbar = tk.Scrollbar(self.root, orient="vertical", command=canvas.yview)
        scrollable_frame = tk.Frame(canvas, bg="#f2f2f2")
        
        scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(
                scrollregion=canvas.bbox("all")
            )
        )

        canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)

        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        self.drink_var = tk.StringVar(value=self.available_drinks[0])
        self.card_frames = []
        for i, drink in enumerate(self.available_drinks):
            card_frame = tk.Frame(scrollable_frame, bg="#ffffff", bd=2, relief=tk.RIDGE)
            card_frame.grid(row=i//3, column=i%3, padx=20, pady=20)
            self.card_frames.append(card_frame)

            image = Image.open("drink.jpg")  # Replace with path to drink images
            image = ImageOps.fit(image, (120, 120), Image.LANCZOS)
            photo = ImageTk.PhotoImage(image)

            image_label = tk.Label(card_frame, image=photo, bg="#ffffff")
            image_label.image = photo  # Keep a reference to avoid garbage collection
            image_label.pack(pady=5)

            ingredients_label = tk.Label(card_frame, text=f"Ingredients: {drink}", font=("Arial", 12), bg="#ffffff", fg="#333")
            ingredients_label.pack(pady=5)

            drink_radio = tk.Radiobutton(card_frame, text=drink, variable=self.drink_var, value=drink, font=("Arial", 12), bg="#ffffff", fg="#333")
            drink_radio.pack(pady=5)

        # Button to start making the drink
        make_button = tk.Button(self.root, text="Make this Drink", command=self.making_drink_page, font=("Arial", 14), bg="#28a745", fg="#fff")
        make_button.pack(side=tk.BOTTOM, pady=20)

    def generate_fake_drinks(self, selected_drinks):
        combinations = []
        for _ in range(10):
            combination = " + ".join(choice(selected_drinks) for _ in range(randint(2, 4)))
            combinations.append(combination)
        return combinations

    def making_drink_page(self):
        self.selected_drink = self.drink_var.get()
        self.clear_frame()

        making_label = tk.Label(self.root, text=f"Making your {self.selected_drink}...", font=("Arial", 18, "bold"), bg="#f2f2f2", fg="#333")
        making_label.pack(pady=20)

        self.progress_label = tk.Label(self.root, text="", font=("Arial", 16), bg="#f2f2f2", fg="#333")
        self.progress_label.pack(pady=10)

        self.steps = [
            "Starting to make your drink...",
            "Adding ingredients...",
            "Shaking...",
            "Pouring into the glass...",
            "Your cocktail is ready! Enjoy!"
        ]

        self.current_step = 0
        self.update_progress()

    def update_progress(self):
        if self.current_step < len(self.steps):
            self.progress_label.config(text=self.steps[self.current_step])
            self.current_step += 1
            self.root.after(1500, self.update_progress)
        else:
            self.completion_page()

    def completion_page(self):
        self.clear_frame()

        completion_label = tk.Label(self.root, text="Your drink is ready!", font=("Arial", 18, "bold"), bg="#f2f2f2", fg="#333")
        completion_label.pack(pady=20)

        drink_image_label = tk.Label(self.root, text="[Image of Drink]", font=("Arial", 14), bg="#f2f2f2", fg="#333")
        drink_image_label.pack(pady=20)

        warm_message_label = tk.Label(self.root, text="Enjoy your drink!", font=("Arial", 16), bg="#f2f2f2", fg="#333")
        warm_message_label.pack(pady=10)

        self.root.after(5000, self.home_page)

    def clear_frame(self):
        for widget in self.root.winfo_children():
            widget.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = CocktailMixer(root)
    root.mainloop()
