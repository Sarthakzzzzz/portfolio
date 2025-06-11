import os
import csv
from flask import Flask, render_template, request, redirect, flash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for flash messages

# --- ROUTES ---


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/submit_form', methods=['POST'])
def submit_form():
    try:
        data = request.form.to_dict()
        print("Received form data:", data)  # Debug
        write_to_file(data)
        write_to_csv(data)
        flash("Your message has been sent successfully!", "success")
        return render_template('thankyou.html')
    except Exception as e:
        error_msg = f"An error occurred: {e}"
        print(error_msg)
        flash(error_msg, "error")
        return redirect('/contact')

# --- HELPER FUNCTIONS ---


def write_to_file(data):
    file_path = os.path.join(os.path.dirname(__file__), 'database.txt')
    with open(file_path, mode='a') as database:
        line = f"\n{data['name']}, {data['email']}, {data['message']}"
        database.write(line)


def write_to_csv(data):
    file_path = os.path.join(os.path.dirname(__file__), 'database.csv')
    with open(file_path, mode='a', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',',
                            quotechar='"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow([data['name'], data['email'], data['message']])

# --- MAIN ENTRY POINT ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
