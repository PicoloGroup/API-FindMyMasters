<h1 align="center"> 
  Find My Master's API
</h1>

<!-- badges -->
<p align="center">

<!-- language -->
<img src="https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label" alt="TS">
<img src="https://img.shields.io/badge/Nest-v8.1.4-red" alt="Nest: 8.1.4">
<img src="https://img.shields.io/badge/Node-v14.17.3-green" alt="Node: 14.17.3">
<img src="https://img.shields.io/badge/AWS-orange" alt="Node: 14.17.3">
<img src="https://img.shields.io/badge/Docker-blue" alt="Docker: 20.10.8">
<img src="https://img.shields.io/badge/PostgreSQL-yellow" alt="">
<img src="https://github.com/PicoloGroup/API-FindMyMasters/actions/workflows/main.yml/badge.svg" alt="Node: 14.17.3">
	
</p>

<!-- ![](https://github.com/PicoloGroup/API-FindMyMasters/blob/develop/assets/architecture.jpeg) -->

## RoadMap

|     Done      |          Task          |   Weeks    |
| :-----------: | :--------------------: | :--------: |
| <li>[X] </li> |    Postgres on AWS     |    1-2     |
| <li>[X] </li> |       Auth & DB        | 3-4 :fire: |
| <li>[X] </li> | Feature Find & Explore |    5-6     |
| <li>[X] </li> |     Feature Decide     |    7-8     |
| <li>[X] </li> |     Feature Apply      |    9-10    |

## Installation Guide:

## Requirements:

- Docker.
  - Follow [Docker](https://docs.docker.com/get-started/overview/) guide to install docker.
- [**config.ts**](https://drive.google.com/drive/folders/1vqNAX2NUkSUeqAat0CJQMIX4_2uEchFO) 
  - Get from Google Drive

## Installation:

### Step 1: Clone Repository

    git clone https://github.com/PicoloGroup/API-FindMyMasters.git

### Step 2: Put Required Configuration File

- Put **config.ts** file into **API-FindMyMasters/src/**.

### Step 3: Build and Run Docker Container

    docker-compose -f docker-compose-dev.yml up

### Step 4: Check API Endpoints and Documentation

- To see API Documentation and test endpoints with [Swagger](https://swagger.io/)

  http://localhost:3000/api/
 
### EndPoints Guide: 

### Students:

- Register a new Student:
	
Request:
```
	POST http://localhost:3000/auth/student/signup
	
	content-type:  application/json

	Body: {

	"email": "ftamur@ku.edu.tr",

	"password": "backenddeveloper"

	}
```
	
Response:
		
```
	HTTP/1.1 201 Created
```

- Login a Student:
	
Request:
```
	POST http://localhost:3000/auth/student/login

	content-type:  application/json

	Body: {

	"email": "ftamur@ku.edu.tr",

	"password": "backenddeveloper"

	}
```
	
Response:
		
```

	{  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDM2MCwiZW1haWwiOiJmdGFtdXJAa3UuZWR1LnRyIiwidXNlcm5hbWUiOm51bGwsImlhdCI6MTY0MDIxNDcxNCwiZXhwIjoxNjQwMzAxMTE0fQ.kYKVffJy0uwjDUEvIDq16iGrncMUXvooNEjDWHQ8bYU"  }
	
```

- Get Authenticated Student:

Request:
```
	GET http://localhost:3000/auth

	Header: Authorization:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDM2MCwiZW1haWwiOiJmdGFtdXJAa3UuZWR1LnRyIiwidXNlcm5hbWUiOm51bGwsImlhdCI6MTY0MDIxNDcxNCwiZXhwIjoxNjQwMzAxMTE0fQ.kYKVffJy0uwjDUEvIDq16iGrncMUXvooNEjDWHQ8bYU
```
	
Response:
		
```

	{  
	"id": 4360,  
	"email": "ftamur@ku.edu.tr",  
	"username": null,  
	"emailVerified": false,  
	"registrationDate": "2021-12-22T23:03:07.524Z"  
	}
	
```

### Master Programs:

- Get Master Program with id 0:

Request:
```
	GET http://localhost:3000/program/0

	Header: Authorization:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjExNCwiZW1haWwiOm51bGwsInVzZXJuYW1lIjoiS2FpdHNldnVlZUFrYWRlZW1pYTE3MiIsImlhdCI6MTY0MDIxMDc1NiwiZXhwIjoxNjQwMjk3MTU2fQ.Z0QiJHLtHmRYuENtyLt9p88LKjVZPQPFV_SVHx4ElLc
```
	
Response:
		
```

	{
	  "masterProgram": {
	    "id": 0,
	    "name": "Ms In Aviation Management And Logistics",
	    "duration": 24,
	    "language": "English",
	    "mode": "ONLINE",
	    "schedule": "FULLTIME",
	    "deadline": null,
	    "field": "ADMINISTRATION",
	    "url": null,
	    "tution_amount": 42025,
	    "tution_currency": "USD",
	    "universityId": 0
	  },
	  "comments": [],
	  "likes": 0
	}
	
```

- Get Multiple Master Programs with Page and Limit Parameters:

Request:
```
	GET http://localhost:3000/program?page=0&limit=10

	Header: Authorization:  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjExNCwiZW1haWwiOm51bGwsInVzZXJuYW1lIjoiS2FpdHNldnVlZUFrYWRlZW1pYTE3MiIsImlhdCI6MTY0MDIxMDc1NiwiZXhwIjoxNjQwMjk3MTU2fQ.Z0QiJHLtHmRYuENtyLt9p88LKjVZPQPFV_SVHx4ElLc
```
	
Response:
		
```

[
  {
    "masterProgram": {
      "id": 0,
      "name": "Ms In Aviation Management And Logistics",
      "duration": 24,
      "language": "English",
      "mode": "ONLINE",
      "schedule": "FULLTIME",
      "deadline": null,
      "field": "ADMINISTRATION",
      "url": null,
      "tution_amount": 42025,
      "tution_currency": "USD",
      "universityId": 0
    },
    "comments": [],
    "likes": 0
  },
  {
    "masterProgram": {
      "id": 1,
      "name": "Ms In Aviation Management And Logistics",
      "duration": 24,
      "language": "English",
      "mode": "ONLINE",
      "schedule": "PARTTIME",
      "deadline": null,
      "field": "ADMINISTRATION",
      "url": null,
      "tution_amount": 42025,
      "tution_currency": "USD",
      "universityId": 0
    },
    "comments": [],
    "likes": 0
  }
]
	
```

- Create comment for a Master Program:

Request:
```

```
	
Response:
		
```

	
```
