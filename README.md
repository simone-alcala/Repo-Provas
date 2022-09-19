# Getting started with REPO PROVAS

# `Settings:`


# .env SETUP

```yml 
### DATABASE_URL
 - postgres://user:password@host:port/database_name

### PORT=port number
 - Default 5000

### BCRYPT=salts
 - Number of salts, e.g. 10

### JWT_KEY=key
 - Your super secret key

### JWT_EXPIRATION=expiration time
 - Number in miliseconds
```
#
# Run
```yml 
 - *npm install*
 - *npm run prisma:deploy*
 - *npm run dev*
 ```

#
# ROUTES

```yml 
POST /sign-up
    - Route to sign-up 
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremipsum"
    }
```

```yml 
POST /sign-in
    - Route to login
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremipsum"
    }
    - response: {
    "token": "loremipsum",
    }
```

```yml 
POST /token
    - Route to validate token
    - body: { 
      "token": "loremipsum"
    }
```

```yml 
GET /categories (authenticated)
    - Route to get all categories
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
      [
        {
        "id": 0,
        "name": "loremipsum",
        }
      ]
    }
```

```yml 
GET /teachers (authenticated)
    - Route to get all teachers
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
      [
        {
        "id": 0,
        "name": "loremipsum",
        }
      ]
    }
```

```yml 
GET /disciplines (authenticated)
    - Route to get all disciplines
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
      [
        {
        "id": 0,
        "name": "loremipsum",
        }
      ]
    }
```

```yml 
GET /tests/teacher (authenticated)
    - Route to get all tests by teacher 
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
      [
        {
          "id": 0,
          "name": "loremipsum",
          "categories": [
          {
            "category": "LOREM",
            "tests": [
              {
                "id": 0,
                "name": "LOREM",
                "pdfUrl": "lorem",
                "discipline": "(LOREM)"
              }
            ]
          }
        ]
      }
    ] 
  }
```


```yml 
GET /tests/discipline (authenticated)
    - Route to get all tests by discipline 
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
    - response: {
      [
        {
          "id": 0,
          "number": 0,
          "disciplines": [
            {
              "id": 0,
              "name": "LOREM",
              "categories": [
                {
                  "category": "LOREM",
                  "tests": [
                    {
                      "id": 1,
                      "name": "LOREM",
                      "pdfUrl": "lorem",
                      "teacher": "lorem"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
```
