import tkinter as tk
from tkinter import messagebox
import re
import string
from tkinter.ttk import Progressbar, Style

# Function to check password strength
def check_password_strength(password):
    strength_score = 0
    feedback = []

    # Check password length
    if len(password) >= 8:
        strength_score += 1
    else:
        feedback.append("Password should be at least 8 characters long.")

    # Check for digits
    if re.search(r"\d", password):
        strength_score += 1
    else:
        feedback.append("Password should include at least one number.")

    # Check for lowercase letters
    if re.search(r"[a-z]", password):
        strength_score += 1
    else:
        feedback.append("Password should include at least one lowercase letter.")

    # Check for uppercase letters
    if re.search(r"[A-Z]", password):
        strength_score += 1
    else:
        feedback.append("Password should include at least one uppercase letter.")

    # Check for special characters
    if any(char in string.punctuation for char in password):
        strength_score += 1
    else:
        feedback.append("Password should include at least one special character (e.g., !, @, #, etc.)")

    # Provide strength assessment
    if strength_score == 5:
        return "Strong", feedback, strength_score
    elif strength_score >= 3:
        return "Moderate", feedback, strength_score
    else:
        return "Weak", feedback, strength_score

# Function to update progress bar and label colors based on strength
def update_strength_display(strength_score, strength_text):
    progress['value'] = strength_score * 20
    color = "#FF6F61" if strength_text == "Weak" else "#F7DC6F" if strength_text == "Moderate" else "#82E0AA"
    strength_label.config(text=f"Password Strength: {strength_text}", fg=color)
    progress_style.configure("TProgressbar", foreground=color, background=color)

# Function to analyze the password when the user clicks the button
def analyze_password():
    password = password_entry.get()
    if not password:
        messagebox.showerror("Input Error", "Password cannot be empty!")
        return

    strength, feedback, strength_score = check_password_strength(password)

    # Update UI with strength details
    update_strength_display(strength_score, strength)
    feedback_message = "\n".join(feedback) if feedback else "Your password is strong!"
    messagebox.showinfo("Password Strength", f"Password Strength: {strength}\n\n{feedback_message}")

# Set up the GUI window
root = tk.Tk()
root.title("Password Strength Analyzer")
root.geometry("450x400")
root.config(bg="#2C3E50")

# Add a colorful title label
title_label = tk.Label(root, text="Password Strength Analyzer", font=("Comic Sans MS", 18, "bold"), bg="#2C3E50", fg="#1ABC9C")
title_label.pack(pady=10)

# Instruction label
instruction_label = tk.Label(root, text="Enter your password:", font=("Arial", 12, "italic"), bg="#2C3E50", fg="#3498DB")
instruction_label.pack(pady=10)

# Password entry box
password_entry = tk.Entry(root, show="*", font=("Arial", 12), width=30, fg="#E74C3C", insertbackground="#E74C3C")
password_entry.pack(pady=10)

# Progress bar to show strength visually
progress_style = Style()
progress_style.theme_use('clam')
progress_style.configure("TProgressbar", thickness=15)
progress = Progressbar(root, length=300, style="TProgressbar", maximum=100)
progress.pack(pady=15)

# Strength label that changes color
strength_label = tk.Label(root, text="Password Strength: N/A", font=("Arial", 12, "bold"), bg="#2C3E50", fg="white")
strength_label.pack(pady=5)

# Button with hover effects
def on_enter(e):
    analyze_button['background'] = "#1ABC9C"
    analyze_button['foreground'] = "#2C3E50"

def on_leave(e):
    analyze_button['background'] = "#E74C3C"
    analyze_button['foreground'] = "white"

analyze_button = tk.Button(root, text="Analyze Password", command=analyze_password, font=("Arial", 12, "bold"), bg="#E74C3C", fg="white", activebackground="#3498DB", activeforeground="black", relief="raised", bd=3)
analyze_button.pack(pady=20)
analyze_button.bind("<Enter>", on_enter)
analyze_button.bind("<Leave>", on_leave)

# Fun footer message
footer_label = tk.Label(root, text="Ensure your passwords are secure!", font=("Comic Sans MS", 10, "italic"), bg="#2C3E50", fg="#95A5A6")
footer_label.pack(pady=20)

# Start the GUI event loop
root.mainloop()
