## Nerds Media

### Description

This is a web application called Nerds Media that allows users to create an account, log in, and share their thoughts with the world. Users can create posts containing code snippets, images, and text, and view and comment on posts created by other users. The application also supports real-time text communication between users. It is built using the Express.js framework and MongoDB for the database.

### Features

-   User authentication: Users can create an account and log in to the application.
-   Create posts: Users can create posts containing code snippets, images, and text.
-   View posts: Users can view posts created by other users.
-   Real-time chat: Users can communicate with each other in real-time using the chat feature.
-   Comment on posts: Users can comment on posts created by other users.
-   Payment gateway: Users can make payments to the application using the Razorpay payment gateway.
-   Search posts: Users can search for posts using keywords.
-   Pagination: Posts are paginated to improve performance.

### Technologies Used

-   Express.js
-   MongoDB
-   Socket.io
-   Razorpay

### Installation

1. Clone the repository:

```
git clone https://github.com/vinitparekh17/nerds-media.git
```

2. Install the dependencies:

```
yarn install
```

3. Create a `.env` file in the root directory of the project referencing the `.env.example` file.

4. Start the application:

```
yarn start
```

> [!NOTE]
> Make sure you have MongoDB installed and running on your machine on the default port (27017).
> Default port for the application is 8080.

## Using Docker

### Build the Docker image

```
docker build -t nerds-media .
```


### Run the Docker container

create `.env` file in root dir of project by referencing **.env.sample** and run the following cmd

```
docker run -p 8080:8080 -d -env-file .env nerds-media
```