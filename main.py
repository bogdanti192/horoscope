from flask import Flask, render_template, jsonify, request
import json
from datetime import datetime
import random

app = Flask(__name__, template_folder='pages', static_folder='static')

# Mock horoscope data
HOROSCOPE_DATA = {
    "light": {
        "Auns": "Šodien ir lieliska diena jaunu sākumu veidošanai!",
        "Vērsis": "Esi pacietīgs - labākais vēl priekšā!",
        "Dvīņi": "Komunikācija būs jūsu stiprā puse šodien.",
        # Add more signs...
    },
    "normal": {
        "Auns": "Planētu izlīdzinājums rāda labu laiku biznesa lietām.",
        "Vērsis": "Jūtieties brīvi izmantot savu praktisko gudrību.",
        "Dvīņi": "Mēness ietekme uzlabos jūsu radošo enerģiju.",
        # Add more signs...
    },
    "strict": {
        "Auns": "ĀTRS BRĪDINĀJUMS: Šodien jūs varat mainīt savu likteni!",
        "Vērsis": "NEAUTS PĀRSTEIGUMS: Jūsu centība atnesīs milzīgus augļus!",
        "Dvīņi": "SATRIECOŠI: Šodien jūs atklāsiet kādu lielu noslēpumu!",
        # Add more signs...
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/horoscope', methods=['GET'])
def get_horoscope():
    sign = request.args.get('sign')
    humor_level = request.args.get('humor_level', 'normal')
    
    if sign not in HOROSCOPE_DATA.get(humor_level, {}):
        return jsonify({"error": "Invalid zodiac sign"}), 400
    
    horoscope = HOROSCOPE_DATA[humor_level][sign]
    
    return jsonify({
        "sign": sign,
        "humor_level": humor_level,
        "horoscope": horoscope,
        "date": datetime.now().strftime("%Y-%m-%d")
    })

@app.route('/api/zodiac-signs')
def get_zodiac_signs():
    signs = [
        {"name": "Auns", "icon": "♈", "dates": "21.03 - 19.04"},
        {"name": "Vērsis", "icon": "♉", "dates": "20.04 - 20.05"},
        {"name": "Dvīņi", "icon": "♊", "dates": "21.05 - 20.06"},
        {"name": "Vēzis", "icon": "♋", "dates": "21.06 - 22.07"},
        {"name": "Lauva", "icon": "♌", "dates": "23.07 - 22.08"},
        {"name": "Jaunava", "icon": "♍", "dates": "23.08 - 22.09"},
        {"name": "Svari", "icon": "♎", "dates": "23.09 - 22.10"},
        {"name": "Skorpions", "icon": "♏", "dates": "23.10 - 21.11"},
        {"name": "Strēlnieks", "icon": "♐", "dates": "22.11 - 21.12"},
        {"name": "Mežāzis", "icon": "♑", "dates": "22.12 - 19.01"},
        {"name": "Ūdensvīrs", "icon": "♒", "dates": "20.01 - 18.02"},
        {"name": "Zivis", "icon": "♓", "dates": "19.02 - 20.03"}
    ]
    return jsonify(signs)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)