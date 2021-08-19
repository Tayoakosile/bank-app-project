# Bank App Project (kweeqFundz)

This repo contains A Bank Webapp in which users can :

- Create a account.
- Sign up.
- Sign in.
- Get A free account number for transactions
- Fund your account
- Receive funds
- Send fund to other users
- Send fund users outside the app but with a fee
- View Latest transactions
- Also Logout

#### Technologies used..

```js
- React JS
- Zustand(State management)
- Chakra ui(Styling)
- Node JS
- Express js
- Mongoose
- MailJet (Service used send email address to user)
- PayStack (Payment Gateway )
- Hosted on Heroku
```

- USE CASES

1. User Signs up

   - Create users entity on the db
   - Send user a verification email

2. User verified

- Generate a random account number say 10 digits and some Alphabets -
  EK1093912123 and create the account - must not clash with an existing account.
