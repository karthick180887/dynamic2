from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Sample data (could be replaced with a database)
shows = [
    {"id": 1, "name": "Movie A", "description": "An action-packed adventure.", "timings": ["10:00 AM", "1:00 PM", "4:00 PM"]},
    {"id": 2, "name": "Movie B", "description": "A heartwarming drama.", "timings": ["11:00 AM", "2:00 PM", "5:00 PM"]},
    {"id": 3, "name": "Movie C", "description": "A hilarious comedy.", "timings": ["12:00 PM", "3:00 PM", "6:00 PM"]},
]

@app.route('/')
def index():
    return render_template('index.html', shows=shows)

@app.route('/book', methods=['POST'])
def book():
    show_id = request.form.get('show_id')
    timing = request.form.get('timing')
    return jsonify({"show_id": show_id, "timing": timing})

@app.route('/confirmation')
def confirmation():
    show_id = request.args.get('show_id')
    timing = request.args.get('timing')
    selected_show = next(show for show in shows if show["id"] == int(show_id))
    return render_template('confirmation.html', show=selected_show, timing=timing)

if __name__ == '__main__':
    app.run(debug=True)
