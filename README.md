
<h1 align="center">Welcome to Recipe Finder 👋</h1>
<p align="center">
  <img alt="Version" src="./images/salad.png/" width = "400" />
</p>

> Our recipe finder

## Author

👤 **Daniel Corseanschi & Tom Morris **

## Description

Hello! We are Tom & Daniel, welcome to our project. This project is a web application that allows a user to store a number of recipes in a Database and a list of recipes in another database. 

The idea is that the user updates the list of ingredients they have available every time they go food shopping, keeping an up-to-date inventory of what they have available in their kitchen. Our app will then search through the database of recipes and come up with suggestions based on what they have available. 

Another function of our app is the calories slider. Our users can select the maximum number of calories that they want their recipe to be and the app will only return recipes below this number. 

* Github: [@Tommosaurus](https://github.com/Tommosaurus)
* Github: [@Corshidan](https://github.com/Corshidan)

## Technologies

This project was created using postgres SQL, NodeJS, ExpressJS, HTML, CSS, Vanilla JS. 

This project demonstrates a fully RESTful API with a full suite of CRUD operations available. We were able to learn a lot during this project including implementing CORS for the first time. This is a full-stack application wiuth both front and back end built from scratch

This project was built duirng Week 5 of our 16-week bootcamp at the School of Code (www.schoolodcode.co.uk)

## Future Goals

Stretch goals for the project would be to make a more accurate recipe finder that only returns the recipes that match the most available ingredients. 

We would like to add functionality to show the quantity of ingredients available. 

We would also like to add functionality for users to be able to add their own recipes. 

## Usage

| Method | Path           | Additional Info                                                        | Result                                 | Response                                  |
| ------ | -------------- | ---------------------------------------------------------------------- | -------------------------------------- | ----------------------------------------- |
| GET    | /recipes      |                                                                        | all recipes                               | { success: Boolean, payload: item array } |
| GET    | /recipes/<id> |                                                                        | recipes with a particular id if it exists | { success: Boolean, payload: item }       |
| GET    | /recipes      | ?query=searchString (query should match a column in the DB, e.g. name) | all data matching query                | { success: Boolean, payload: item array } |
| POST   |/recipes      | { body }                                                               | create a new ingredient or recipe                      | { success: Boolean, payload: item }       |
| PUT    | /recipes | { body }                                                               | updated list of ingredients or updated recipe                           | { success: Boolean, payload: item }       |
| PATCH  | /recipes | { body }                                                               | updated list of ingredients or updated recipe                               | { success: Boolean, payload: item }       |
| DELETE | /recipes/ <id> |                                                                        | ingredient deleted                          | { success: Boolean, payload: item }       |


## POSTMAN documentation

https://documenter.getpostman.com/view/17104380/TzzGFYbe


## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
