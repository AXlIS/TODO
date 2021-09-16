import requests

response = requests.get('http://127.0.0.1:8000/api/users/', headers={
    "Content-Type": "application/json",
    "Authorization": 'Token f33080bb6ff827af82d1bd3d7088360405b05e5f'
})

data = response.json()
print(data)
