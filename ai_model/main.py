from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from langchain_cohere import ChatCohere
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from sklearn.ensemble import ExtraTreesClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder, OrdinalEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.ensemble import ExtraTreesClassifier, AdaBoostClassifier, BaggingClassifier, GradientBoostingClassifier, RandomForestClassifier, VotingClassifier
import numpy as np
import pandas as pd
from evaluate_models import evaluate_models
import io
import seaborn as sns
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app, resources={r"/*": {'origins': "*"}})

llm = ChatCohere(cohere_api_key="tnYRqlRnR5rvUjg3J4UyAMiFPHhkwIcyj4UhRKkk")
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an AI health assistant who answers in less than 100 words based on the food and symptoms data presi ent in the prompt."),
    ("user", "{input}")
])
output_parser = StrOutputParser()
chain = prompt | llm | output_parser
#allowed_prompts = ["stool consistency", "pain while passing stool", "stool colour", "stool frequency", "mucous in stool", "blood in stool", "pain location", "food triggers", "dietary advice"]
allowed_prompts = ["eat", "symptoms", "president","stool consistency", "pain while passing stool", "stool colour", "stool frequency", "mucous in stool", "blood in stool", "pain location", "food triggers", "dietary advice"]
@app.route('/process_data', methods=['POST'])
def ask_gpt():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request must be JSON'}), 400

    food_data = data.get('food_data')
    print(food_data)
    symptom_data = data.get('symptom_data')
    prompt_text = data.get('prompt')

    if not all([food_data, symptom_data, prompt_text]):
        return jsonify({'error': 'Missing data in request'}), 400

    if any(keyword in prompt_text.lower() for keyword in allowed_prompts):
        food_data_str = str(food_data)
        symptom_data_str = str(symptom_data)
        data_and_prompt = food_data_str + "\n" + symptom_data_str + "\n" + prompt_text
        response = chain.invoke({"input": data_and_prompt})
        return jsonify({'processedData': response})
    else:
        return jsonify({'processedData': "This chatbot is designed to assist with health-related inquiries only. Please ask a health-related question."})

@app.route('/trees_classifier', methods=['POST'])
def classify():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request must be JSON'}), 400

    symptoms = pd.DataFrame(data.get('symptom_data'))
    items = pd.DataFrame(data.get('food_data'))
    symptoms= symptoms.drop(['id', 'username'], axis=1)
    items= items.drop(['id', 'username'], axis=1)
    print('main symptoms:',symptoms)
    print('main items:',items)
    # Making severity score
    cat_featf = ['stoolColor', 'painLocation']
    num_featf = ['stoolConsistency', 'painPassingStool', 'stoolFrequency', 'mucousInStool', 'bloodInStool', 'fever', 'nausea', 'flatulence']
    pipef1 = Pipeline(steps=[('ord_enc', OrdinalEncoder(categories=[['brown', 'yellow', 'red'], ['Upper Abdomen', 'Lower Abdomen', 'Both',np.nan]])),
                             ('minmax_sc', MinMaxScaler())])
    pipef2 = Pipeline(steps=[('minmax_sc', MinMaxScaler())])
    ct = ColumnTransformer([('cat_featf', pipef1, cat_featf), ('num_featf', pipef2, num_featf)], remainder='passthrough')
    symptoms_ct = ct.fit_transform(symptoms)
    symptoms_ct_df = pd.DataFrame(symptoms_ct)
    print('symptoms transformed:',symptoms_ct_df)
    symptoms_final = pd.DataFrame()
    symptoms_final['date'] = symptoms_ct_df.iloc[:, -1]
    print('symptoms_final:',symptoms_final)
    
    # Convert symptom features to numeric column by column
    for col in symptoms_ct_df.columns[:-1]:
        symptoms_ct_df[col] = pd.to_numeric(symptoms_ct_df[col], errors='coerce')
    
    # Sum up numeric values, handling non-numeric values gracefully
    symptoms_final['Severity_score'] = symptoms_ct_df.iloc[:, :-1].sum(axis=1, skipna=True)
    print(symptoms_final['Severity_score'])
    print('symptoms_final2:',symptoms_final)
    # Making the food table
    items.fillna(np.nan, inplace=True)
    sii = SimpleImputer(missing_values=np.nan, strategy='most_frequent')
    items = pd.DataFrame(sii.fit_transform(items), columns=items.columns)
    items['AllCombined'] = items[['breakfast', 'lunch', 'dinner', 'snacks']].agg(','.join, axis=1)
    items = items.applymap(lambda x: str(x).replace(';', ','))
    items = items.drop(['breakfast', 'lunch', 'dinner', 'snacks'], axis=1)
    print('items tranformed:', items)

    # Making the merged table
    merged_df = pd.merge(items, symptoms_final, left_on='date', right_on='date', how='inner')
    merged_df['Actual_Severity_Score'] = merged_df['Severity_score'].shift(-1)
    print('merged_df:', merged_df)
    merged_df = merged_df.drop(['water', 'stressLevel', 'Severity_score', 'date'], axis=1)

    # Determine trigger based on severity score
    threshold = 4
    merged_df['IsTrigger'] = (merged_df['Actual_Severity_Score'] > threshold).astype(int)

    # Prepare features and target for model
    features = merged_df[['AllCombined']]
    target = merged_df['IsTrigger']
    features_encoded = pd.concat([features, features['AllCombined'].str.get_dummies(sep=',')], axis=1).drop(columns=['AllCombined'])
    
    # Train the model
    model = ExtraTreesClassifier()
    model.fit(features_encoded, target)
    
    # Extract feature importances
    feature_importances = model.feature_importances_
    importance_df = pd.DataFrame({'Feature': features_encoded.columns, 'Importance': feature_importances})
    importance_df = importance_df.sort_values(by='Importance', ascending=False)
    print(importance_df)

    # Return the JSON food importance
    return jsonify({'Food_trigger_score': importance_df.to_dict(orient='records')})


'''@app.route('/trees_classifier', methods=['POST'])
def trend():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request must be JSON'}), 400

    symptoms = pd.DataFrame(data.get('symptom_data'))
    items = pd.DataFrame(data.get('food_data'))
    print('main symptoms:',symptoms)
    print('main items:',items)
    # Making severity score
    cat_featf = ['stoolColor', 'painLocation']
    num_featf = ['stoolConsistency', 'painPassingStool', 'stoolFrequency', 'mucousInStool', 'bloodInStool', 'fever', 'nausea', 'flatulence']
    pipef1 = Pipeline(steps=[('ord_enc', OrdinalEncoder(categories=[['brown', 'yellow', 'red'], ['Upper Abdomen', 'Lower Abdomen', 'Both',np.nan]])),
                             ('minmax_sc', MinMaxScaler())])
    pipef2 = Pipeline(steps=[('minmax_sc', MinMaxScaler())])
    ct = ColumnTransformer([('cat_featf', pipef1, cat_featf), ('num_featf', pipef2, num_featf)], remainder='passthrough')
    symptoms_ct = ct.fit_transform(symptoms)
    symptoms_ct_df = pd.DataFrame(symptoms_ct)
    print('symptoms transformed:',symptoms_ct_df)
    symptoms_final = pd.DataFrame()
    symptoms_final['date'] = symptoms_ct_df.iloc[:, -1]
    print('symptoms_final:',symptoms_final)
    
    # Convert symptom features to numeric column by column
    for col in symptoms_ct_df.columns[:-1]:
        symptoms_ct_df[col] = pd.to_numeric(symptoms_ct_df[col], errors='coerce')
    
    # Sum up numeric values, handling non-numeric values gracefully
    symptoms_final['Severity_score'] = symptoms_ct_df.iloc[:, :-1].sum(axis=1, skipna=True)
    print(symptoms_final['Severity_score'])
    print('symptoms_final2:',symptoms_final)
    # Making the food table
    items.fillna(np.nan, inplace=True)
    sii = SimpleImputer(missing_values=np.nan, strategy='most_frequent')
    items = pd.DataFrame(sii.fit_transform(items), columns=items.columns)
    items['AllCombined'] = items[['breakfast', 'lunch', 'dinner', 'snacks']].agg(','.join, axis=1)
    items = items.applymap(lambda x: str(x).replace(';', ','))
    items = items.drop(['breakfast', 'lunch', 'dinner', 'snacks'], axis=1)
    print('items tranformed:', items)

    # Making the merged table
    merged_df = pd.merge(items, symptoms_final, left_on='date', right_on='date', how='inner')
    merged_df['Actual_Severity_Score'] = merged_df['Severity_score'].shift(-1)
    print('merged_df:', merged_df)
    arima_data = merged_df[['Actual_Severity_Score', 'date']]
    arima_data = arima_data.fillna(value=0)
    print(arima_data)
    # Create arima graph
    p=[1,2,3,4,5]
    d=[0,1,2]
    q=[1,2,3,4,5]
    evaluate_models(arima_data, p, d, q)'''


def preprocess_symptom_data(symptom_data):
    cat_featf = ['Stool Colour', 'Pain location']
    num_featf = ['Stool consistency', 'Pain while passing stool', 'Stool frequency', 'Mucous in stool',
                 'Blood in stool', 'Fever', 'Nausea', 'Flatulence']
    pipef1 = Pipeline(steps=[('ord_enc', OrdinalEncoder(categories=[['brown', 'yellow', 'red'], ['Upper Abdomen', 'Lower Abdomen', 'Both',np.nan]])),
                             ('minmax_sc', MinMaxScaler())])
    pipef2 = Pipeline(steps=[('minmax_sc', MinMaxScaler())])
    ct = ColumnTransformer([('cat_featf', pipef1, cat_featf), ('num_featf', pipef2, num_featf)], remainder='passthrough')
    symptoms_ct = ct.fit_transform(symptom_data)
    symptoms_ct_df = pd.DataFrame(symptoms_ct)
 
    symptoms_final['date'] = symptoms_ct_df.iloc[:, -1]
    symptoms_final['Severity_score'] = symptoms_ct_df.iloc[:, :-1].sum(axis=1)
    return symptoms_final

@app.route('/trees_class', methods=['POST'])
def bar_chart_stool_color():
    data = request.get_json()
    symptom_data = pd.DataFrame(data.get('symptom_data'))
    meal_data = pd.DataFrame(data.get('food_data'))
    userId=symptom_data['username'][0]
    plt.figure(figsize=(10, 6))
    sns.countplot(x='stoolColor', data=symptom_data)
    plt.title("Distribution of Stool Colors")
    plt.xlabel("Stool Color")
    plt.ylabel("Count")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/stoolbar/'+userId+'.png')
    plt.close()
    # Return the image URI along with the response
    #return send_file(buf, mimetype='image/png'), {'image_uri': 'path/to/image.png'}
    plt.figure(figsize=(10, 6))
    plt.plot(symptom_data['date'], symptom_data['stoolConsistency'], marker='o')
    plt.xticks(rotation=45)
    plt.title("Stool Consistency Over Time")
    plt.xlabel("date")
    plt.ylabel("Stool Consistency")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/stoolline/'+userId+'.png')
    plt.close()

    # Meal pie chart
    all_foods = meal_data[['breakfast', 'lunch', 'dinner', 'snacks']].apply(lambda x: ';'.join(x.dropna().astype(str)), axis=1)
    all_foods = ';'.join(all_foods).split(';')
    food_counts = pd.Series(all_foods).value_counts()
    plt.figure(figsize=(10, 6))
    food_counts.plot.pie(autopct='%1.1f%%')
    plt.title("Proportion of Different Food Items")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/mealpie/'+userId+'.png')
    plt.close()

    # scatter stress
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x='stressLevel', y='water', data=meal_data)
    plt.title("Scatter Plot: Stress vs. Water")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/stressscater/'+userId+'.png')
    plt.close()

    # blood bar
    plt.figure(figsize=(10, 6))
    sns.countplot(x='bloodInStool', data=symptom_data)
    plt.title("Distribution of Blood in Stool")
    plt.xlabel("Presence of Blood")
    plt.ylabel("Count")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/bloodbar/'+userId+'.png')
    plt.close()

    #correlation
    numeric_cols = symptom_data.select_dtypes(include='number')
    correlation_matrix = numeric_cols.corr()
    plt.figure(figsize=(10, 8))
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt='.2f', square=True)
    plt.title("Correlation Matrix for Symptom Data")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/corr/'+userId+'.png')
    plt.close()

    #stool freq bar
    plt.figure(figsize=(10, 6))
    plt.plot(symptom_data['date'], symptom_data['stoolFrequency'], marker='o')
    plt.xticks(rotation=45)
    plt.title("Stool Frequency Over Time")
    plt.xlabel("date")
    plt.ylabel("Stool Frequency")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/freqbar/'+userId+'.png')
    plt.close()
    plt.close()

    # stress line
    plt.figure(figsize=(10, 6))
    plt.plot(meal_data['date'], meal_data['stressLevel'], marker='o')
    plt.xticks(rotation=45)
    plt.title("Stress Over Time")
    plt.xlabel("date")
    plt.ylabel("Stress Level")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/stressline/'+userId+'.png')
    plt.close()

    return None

@app.route('/treesline', methods=['POST'])
def line_chart_stool_consistency():
    data = request.get_json()
    symptom_data = pd.DataFrame(data.get('symptom_data'))
    userId=symptom_data['username'][0]
    plt.figure(figsize=(10, 6))
    plt.plot(symptom_data['date'], symptom_data['stoolConsistency'], marker='o')
    plt.xticks(rotation=45)
    plt.title("Stool Consistency Over Time")
    plt.xlabel("date")
    plt.ylabel("Stool Consistency")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/stoolline/'+userId+'.png')
    plt.close()
    #return send_file(buf, mimetype='image/png')
    return None

@app.route('/treespie', methods=['POST'])
def pie_chart_meals():
    data = request.get_json()
    meal_data = pd.DataFrame(data.get('food_data'))
    all_foods = meal_data[['Breakfast', 'Lunch', 'Dinner', 'Snacks']].apply(lambda x: ';'.join(x.dropna().astype(str)), axis=1)
    all_foods = ';'.join(all_foods).split(';')
    food_counts = pd.Series(all_foods).value_counts()
    plt.figure(figsize=(10, 6))
    food_counts.plot.pie(autopct='%1.1f%%')
    plt.title("Proportion of Different Food Items")
    plt.savefig('/home/suraj/Desktop/ibd/IbdFrontend/components/mealpie/'+userId+'.png')
    plt.close()
    return send_file(buf, mimetype='image/png')

@app.route('/scatter_stress_vs_water', methods=['POST'])
def scatter_stress_vs_water():
    data = request.get_json()
    meal_data = pd.DataFrame(data.get('food_data'))
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x='Stress', y='Water', data=meal_data)
    plt.title("Scatter Plot: Stress vs. Water")
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return send_file(buf, mimetype='image/png')

@app.route('/bar_chart_blood_in_stool', methods=['POST'])
def bar_chart_blood_in_stool():
    data = request.get_json()
    symptom_data = pd.DataFrame(data.get('symptom_data'))
    plt.figure(figsize=(10, 6))
    sns.countplot(x='Blood in stool', data=symptom_data)
    plt.title("Distribution of Blood in Stool")
    plt.xlabel("Presence of Blood")
    plt.ylabel("Count")
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return send_file(buf, mimetype='image/png')

@app.route('/heatmap_correlation', methods=['POST'])
def heatmap_correlation():
    data = request.get_json()
    symptom_data = pd.DataFrame(data.get('symptom_data'))
    numeric_cols = symptom_data.select_dtypes(include='number')
    correlation_matrix = numeric_cols.corr()
    plt.figure(figsize=(10, 8))
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt='.2f', square=True)
    plt.title("Correlation Matrix for Symptom Data")
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return send_file(buf, mimetype='image/png')

@app.route('/line_chart_stool_frequency', methods=['POST'])
def line_chart_stool_frequency():
    data = request.get_json()
    symptom_data = pd.DataFrame(data.get('symptom_data'))
    plt.figure(figsize=(10, 6))
    plt.plot(symptom_data['date'], symptom_data['Stool frequency'], marker='o')
    plt.xticks(rotation=45)
    plt.title("Stool Frequency Over Time")
    plt.xlabel("date")
    plt.ylabel("Stool Frequency")
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return send_file(buf, mimetype='image/png')

@app.route('/line_chart_stress_over_time', methods=['POST'])
def line_chart_stress_over_time():
    data = request.get_json()
    meal_data = pd.DataFrame(data.get('food_data'))
    plt.figure(figsize=(10, 6))
    plt.plot(meal_data['date'], meal_data['Stress'], marker='o')
    plt.xticks(rotation=45)
    plt.title("Stress Over Time")
    plt.xlabel("date")
    plt.ylabel("Stress Level")
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()
    return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
