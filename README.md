# Healthcare-AI-ChatBot

## Project Structure
<img width="800" alt="healthcare chatbot diag (2)" src="https://github.com/Elijah5399/healthcare-ai-chatbot/assets/22656175/f17ca614-ef8a-4616-8275-9d5c56a63cf0">

## Project Description

Using the MERN stack, We have created a generic website for hospitals, supporting the functions of booking and cancelling appointments and paying for bookings, as well as user logins and registrations. We also have a chatbot available for all users to interact with in the homepage, which guides users on how to use the app's features.

## How to use

If you're assessing our project and reading this, chances are that we've already deployed our container onto an online server and made it publicly accessible. You can simply view the web app from there!

If you're trying to run our web app locally, this will be challenging since the .env files are not included on github. You will need to do the following:

1. Create a .env file in the root folder. To it, add STRIPE_KEY with the value of your stripe project's private key.

2. Create a .env file in the backend folder. To it, add:
    - PROJECT_ID
    - MONGO_URI
    - SECRET (for your MongoDB Atlas)
    - STRIPE_KEY
    - ENDPOINT_SECRET for stripe

3. Ensure you have docker and docker compose.

4. Access the project root folder using the terminal. Use the command `docker-compose build` followed by `docker-compose up` to get the stripe, backend and frontend services up all at once.

5. Go to localhost:3000 to see the web app. You're all set! :+1:

## Checklist

- [x] Containerise application

- [x] Deploy container onto an online server

- [ ] Ensure our chatbot has more than 3 brain cells

- [ ] Improve UI


