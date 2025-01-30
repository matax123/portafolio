import os
from tkinterdnd2 import TkinterDnD, DND_FILES
from tkinter import Tk, Label
from PIL import Image

def convert_png_to_webp(image_path):
    try:
        output_path = image_path.replace('.png', '.webp')
        with Image.open(image_path) as img:
            img.save(output_path, format="WEBP")
        return output_path
    except Exception as e:
        return f"Failed to convert {image_path}: {e}"

def on_drop(event):
    files = event.data.split()  # Handles multiple files (split by spaces or newlines)
    for file_path in files:
        file_path = file_path.strip("{").strip("}")  # Remove curly braces if present
        if file_path.lower().endswith('.png'):
            result = convert_png_to_webp(file_path)
            status_label.config(text=f"Converted: {os.path.basename(result)}" if os.path.exists(result) else result)
        else:
            status_label.config(text="Please drop a valid PNG file.")

# GUI setup
root = TkinterDnD.Tk()  # Initialize TkinterDnD
root.title("PNG to WebP Converter")
root.geometry("400x200")

instructions = Label(root, text="Drag and drop your PNG files here", font=("Arial", 14), pady=20)
instructions.pack()

status_label = Label(root, text="", font=("Arial", 10), fg="green", pady=10)
status_label.pack()

# Bind drag-and-drop events
root.drop_target_register(DND_FILES)
root.dnd_bind('<<Drop>>', on_drop)

root.mainloop()
