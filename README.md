# Crud Clubs API

This repository is the Crud Crubls API that servers the [crud-clubs-front](https://github.com/Horacaz/crud-clubs-front) repository.

## Getting Started

To get start with this repository you may run `git clone https://github.com/Horacaz/hacker-news-reader`. After copying the files you will run `npm install` to install the project dependencies. When the dependecies are installed you may run `npm run dev` to start a development server and start previewing and editing the project locally.

## Endpoints

### Retrieve a club

`GET https://crub-clubs-api.onrender.com/api/club/:id`

```
{
    "data":
        {
            "id": 61,
            "country": England,
            "name": "Chelsea FC",
            "shortName": "Chelsea",
            "tla": "CHE",
            "crestUrl": "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
            "address": "Fulham Road London SW6 1HS",
            "phone": "+44 (0871) 9841955",
            "website": "http://www.chelseafc.com",
            "email": null,
            "founded": 1905,
            "clubColors": "Royal Blue / White",
            "venue": "Stamford Bridge",
            "lastUpdated": "2020-05-14T02:41:41Z"
        },
}
```

### Retrieve a list of clubs

`GET https://crub-clubs-api.onrender.com/api`

```
{
    "data":[
    ...list of Clubs
    ]
}
```

### Add a new Club

`POST https://crub-clubs-api.onrender.com/api/club`

### Delete a Club

`DELETE https://crub-clubs-api.onrender.com/api/club/:id`

### Edit a Club's information

` PATCH https://crub-clubs-api.onrender.com/api/club/:id`

## Techstack

This project is built with Typescript on top of React, using the latest build provided by Vite. It is also unit-tested with Jest and React Testing Library.Husky is also implemented to lint every stagged files before every commit to ensure a consistent code style and that each test passes before pushing. For styling, this App uses the components provided by Chakra Ui.
