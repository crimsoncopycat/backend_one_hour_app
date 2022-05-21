<h1 align="center">
  REST API For OneHourApp
</h1>


## Tech stack
-nodejs
-express
-mongodb

## Routes
POST: {{URL}}/api/v1/book-times : Create new book time
GET : {{URL}}/api/v1/book-times : Fetch list of book times
GET : {{URL}}/api/v1/book-times/export : Export data all book times as CSV File
GET : {{URL}}/api/v1/book-titles : Fetch book titles
POST : {{URL}}/api/v1/book-titles : Create new book title




## How to Install and Run the Project


__Create config.env file in root dir,with this content:__

NODE_ENV=development #
PORT=3000
USERNAME=myUserName
PASSWORD=myPass
DATABASE=DATABASE_URL #Remote mongodb database URL
DATABASE_NAME=one_hour
DATABASE_LOCAL=LOCAL_DB
DATABASE_PASSWORD=DB_PASSWORD

JWT_SECRET=JWT_SECRET
JWT_EXPIRE_IN=EXPIRE_IN
JWT_COOKIE_EXPIRES_IN=EXPIRE_IN

EMAIL_USERNAME=EMAIL_USERNAME
EMAIL_PASSWORD=EMAIL_PASS
EMAIL_HOST=email.host
EMAIL_PORT=email.port

EMAIL_FROM=MyEmail

__Upload to heroku:__