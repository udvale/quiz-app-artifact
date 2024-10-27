#Author: Pranav Mishra
#Minor edits by Udval Enkhtaivan
#Last-modified: 10/25/2024

# from flask import Flask, jsonify
# from flask_cors import CORS
# from mathgenerator import genById
# from random import choice

# app = Flask(__name__)
# CORS(app)

# def add_description(problem, generator_id):
#     """Add a simple description based on the problem type."""
#     descriptions = {
#         0: "Solve the addition problem: ",
#         1: "Solve the subtraction problem: ",
#         2: "Solve the multiplication problem: ",
#         3: "Solve the division problem: ",
#     }
#     return f"{descriptions.get(generator_id, '')}{problem}"

# @app.route('/generate', methods=['GET'])
# def generate_math_problem():
#     # List of generator IDs for basic arithmetic problems (no exponentiation)
#     easy_generator_ids = [0, 1, 2, 3]  # IDs for addition, subtraction, multiplication, division

#     # Randomly select a generator ID
#     generator_id = choice(easy_generator_ids)

#     # Generate the problem and solution by ID
#     problem, solution = genById(generator_id)

#     # Add a description to make the problem clear
#     problem_with_description = add_description(problem, generator_id)

#     # Clean up LaTeX symbols
#     problem_clean = problem_with_description.replace(r'\cdot', '*').replace(r'\div', '/').replace(r'$', '')
#     solution_clean = str(solution).replace(r'\cdot', '*').replace(r'\div', '/').replace(r'$', '')

#     return jsonify({
#         'problem': problem_clean,
#         'correct_answer': solution_clean
#     })

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, jsonify, request
from flask_cors import CORS
from mathgenerator import genById
from random import choice
import requests

app = Flask(__name__)
CORS(app)

def add_description(problem, generator_id):
    """Add a simple description based on the problem type."""
    descriptions = {
        0: "Solve the addition problem: ",
        1: "Solve the subtraction problem: ",
        2: "Solve the multiplication problem: ",
        3: "Solve the division problem: ",
    }
    return f"{descriptions.get(generator_id, '')}{problem}"

@app.route('/generate', methods=['GET'])
def generate_math_problem():
    """Generate math problem using mathgenerator library"""
    easy_generator_ids = [0, 1, 2, 3]
    generator_id = choice(easy_generator_ids)
    problem, solution = genById(generator_id)

    problem_with_description = add_description(problem, generator_id)
    problem_clean = problem_with_description.replace(r'\cdot', '*').replace(r'\div', '/').replace(r'$', '')
    solution_clean = str(solution).replace(r'\cdot', '*').replace(r'\div', '/').replace(r'$', '')

    return jsonify({
        'problem': problem_clean,
        'correct_answer': solution_clean
    })

@app.route('/opentdb', methods=['GET'])
def get_opentdb_question():
    """Fetch a random question from OpenTDB"""
    difficulty = request.args.get('difficulty', 'easy')
    amount = request.args.get('amount', 1)

    opentdb_url = f"https://opentdb.com/api.php?amount={amount}&difficulty={difficulty}&type=multiple"
    response = requests.get(opentdb_url)

    if response.status_code == 200:
        data = response.json()
        if data.get('response_code') == 0:
            return jsonify(data['results'])
        else:
            return jsonify({'error': 'No questions found.'}), 404
    else:
        return jsonify({'error': 'Failed to fetch questions from OpenTDB.'}), 500

# Export the Flask app for Vercel
app = app
