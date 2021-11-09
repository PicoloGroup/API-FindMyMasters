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
<!-- <img src="https://github.com/<OWNER>/<REPOSITORY>/actions/workflows/<WORKFLOW_FILE>/badge.svg" alt="Node: 14.17.3"> -->
	
</p>

![](https://github.com/PicoloGroup/API-FindMyMasters/blob/develop/assets/architecture.jpeg)

## RoadMap

|     Done      |          Task          |   Weeks    |
| :-----------: | :--------------------: | :--------: |
| <li>[X] </li> |    Postgres on AWS     |    1-2     |
| <li>[ ] </li> |       Auth & DB        | 3-4 :fire: |
| <li>[ ] </li> | Feature Find & Explore |    5-6     |
| <li>[ ] </li> |     Feature Decide     |    7-8     |
| <li>[ ] </li> |     Feature Apply      |    9-10    |

## Git Commit Message StyleGuide

|    Emoji     | Raw Emoji Code |   Name    | Description                                                        |
| :----------: | :------------: | :-------: | ------------------------------------------------------------------ |
|  :sparkles:  |  `:sparkles:`  |   feat:   | new feature for the user                                           |
| :ambulance:  | `:ambulance:`  |   fix:    | bug fix for the user                                               |
|   :books:    |   `:books:`    |   docs:   | changes to the documentation                                       |
|    :art:     |    `:art:`     |  style:   | formatting, missing semi colons, etc; no production code change    |
|  :tractor:   |  `:tractor:`   | refactor: | refactoring production code, eg. renaming a variable               |
| :microscope: | `:microscope:` |   test:   | adding missing tests, refactoring tests; no production code change |
|   :hammer:   |   `:hammer:`   |  chore:   | updating grunt tasks etc; no production code change                |

## Installation Guide:

## Requirements:

- Docker.
  - Follow [Docker](https://docs.docker.com/get-started/overview/) guide to install docker.
- [**config.ts**](https://drive.google.com/drive/folders/1vqNAX2NUkSUeqAat0CJQMIX4_2uEchFO) 
  - Get from Google Drive

## Installation:

### Step 1: Clone Repository

    git clone https://github.com/PicoloGroup/API-FindMyMasters.git

### Step2: Put Required Configuration File

- Put **config.ts** file into **API-FindMyMasters/src/**.

### Step 3: Build and Run Docker Container

    docker-compose -f docker-compose-dev.yml up

### Step4: Check API Endpoints and Documentation

- To see API Documentation and test endpoints with [Swagger](https://swagger.io/)

  http://localhost:3000/api/

### Usage:

- **Student Sign Up:**

**_- Request:_**

```
http://localhost:3000/auth/student/signup
```

- Raw JSON data in Body.

```json
{
  "email": "tamurfirat@gmail.com",
  "password": "hashthepass"
}
```

**_- Response:_**

- Status Code 201.
