import requests

# ----------------------
# Для AcceptHeaderVersioning:
response = requests.get('http://127.0.0.1:8000/api/users/')
print(response.json())

response = requests.get('http://127.0.0.1:8000/api/users/', headers={'Accept': 'application/json; version=0.2'})
print(response.json())
# ----------------------
