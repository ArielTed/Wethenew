# Wethenew

## Introduction

This is a simple app developed in React. The app is an Admin support dashboard where you can access messages received from clients.

## Features

There is a dropdown in the navbar to choose which admin account you want to use.
You then have a list of messages on the left, and you can click on any message to access the details.
The list have an infinite scroll feature to load more messages when scrolling.
You can access any message directly via its ID in the url (/?messageId=xxx).
The is also an unread messages counter in the header always up to date even after refreshing the page.

## Stack

This app is developped using NextJS, TypeScript, Styled-Components.
<br/>
To run tests, I am using Jest and Testing-Library.
<br/>
For code styling and readability, I am using ESLint and Prettier.
<br/>
_The API in the server folder was provided to me, I did not wrote it._

## Run

To run the app, simply use the following command at the root of the project :
`docker-compose up --build `
_(You just need Docker installed and running on your computer.)_

## Author

**Ariel Tedgui** : https://github.com/ArielTed
