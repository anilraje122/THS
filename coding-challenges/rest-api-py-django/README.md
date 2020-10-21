# REST API with Python Django

A Simple REST API build with Python Django library for managing User Database

## Install required py libraries (in Ubuntu) and Start the web server

```
bash install.sh
```

## Usage

You can access the API on this URL - http://localhost:3000 

- Add new user (POST)

```
curl --location --request POST 'http://localhost:8000/users/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstname": "Anil",
    "lastname": "Raj",
    "email": "anil@gmail.com",
    "password": "123456",
    "phone": "7899179779"
}'
```
- Fecth specific user details (GET)

```
curl --location --request GET 'http://localhost:8000/users/?phone=7899179778'
```

- Update specific user details (PUT)

```
curl --location --request PUT 'http://localhost:8000/users/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phone": "7899179779",
    "firstname": "Anil",
    "lastname": "Raj Erayil",
    "email": "anil@gmail.com",
    "password": "12345"
}'
```

- Delete specific user (DELETE)

```
curl --location --request DELETE 'http://localhost:8000/users/?phone=7899179779'
```