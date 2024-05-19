from sklearn.model_selection import train_test_split
import datetime
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
import matplotlib.pyplot as plt

def evaluate_models(dataset, p_values, d_values, q_values):
  best_score, best_cfg = float("inf"), None
  for p in p_values:
    for d in d_values:
      for q in q_values:
        order = (p,d,q)
        X_train, X_test= train_test_split(dataset[:-1], test_size=0.2, shuffle=False)
        model = ARIMA(X_train['Actual_Severity_Score'], order=order)
        results_ARIMA = model.fit()
        predictions = results_ARIMA.forecast(6)
        mse = mean_squared_error(X_test['Actual_Severity_Score'], predictions)
        if mse < best_score:
          best_score, best_cfg = mse, order
          print('ARIMA%s MSE=%.3f' % (order,mse))
  print('Best ARIMA%s MSE=%.3f' % (best_cfg, best_score))
  model = ARIMA(dataset['Actual_Severity_Score'][:-1], order=order)
  results_ARIMA = model.fit()
  predictions = results_ARIMA.forecast(6)
  plt.figure(figsize=(12, 6))
  test_date = datetime.datetime.strptime(dataset['Date'][0], "%d/%m/%Y")
  res = [test_date + datetime.timedelta(days=i) for i in range(len(dataset)+5)]
  new = []
  for j in res:
    new.append(j.strftime('%d/%m/%Y'))
  plt.plot(new[:29], dataset['Actual_Severity_Score'], label='Predicted Values for ARIMA model', marker='o')
  plt.plot(new[28:], predictions, marker='x')
  plt.xlabel('Date')
  plt.ylabel('Health Severity Score')
  plt.title('ARIMA prediction for Health Severity Score')
  plt.legend()
  plt.xticks(rotation=45)
  plt.show()