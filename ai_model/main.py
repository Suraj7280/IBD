from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_cohere import ChatCohere
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

app = Flask(__name__)
CORS(app, resources={r"/": {'origins': ""}})

llm = ChatCohere(cohere_api_key="tnYRqlRnR5rvUjg3J4UyAMiFPHhkwIcyj4UhRKkk")
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI health assistant who answers in less than 10 words."),
    ("user", "{input}")
])
output_parser = StrOutputParser()
chain = prompt | llm | output_parser
#allowed_prompts = ["stool consistency", "pain while passing stool", "stool colour", "stool frequency", "mucous in stool", "blood in stool", "pain location", "food triggers", "dietary advice"]
allowed_prompts = ["eat", "symptoms", "president"]
@app.route('/process_data', methods=['POST'])
def ask_gpt():
    data = request.get_json()
    print("Received data:", data)
    if not data:
        return jsonify({'error': 'Request must be JSON'}), 400

    food_data = data.get('food_data')
    symptom_data = data.get('symptom_data')
    prompt_text = data.get('prompt')

    if not all([food_data, symptom_data, prompt_text]):
        return jsonify({'error': 'Missing data in request'}), 400

    if any(keyword in prompt_text.lower() for keyword in allowed_prompts):
        food_data_str = str(food_data)
        symptom_data_str = str(symptom_data)
        data_and_prompt = food_data_str + "\n" + symptom_data_str + "\n" + prompt_text
        
        response = chain.invoke({"input": data_and_prompt})
        print(response)
        return jsonify({'processedData': response})

    else:
        return jsonify({'processedData': "This chatbot is designed to assist with health-related inquiries only. Please ask a health-related question."})

if __name__ == '__main__':
    app.run(debug=True)
