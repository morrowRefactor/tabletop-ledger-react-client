# Tabletop Ledger
An app for board game enthusiasts to log their game sessions to improve their stats and climb leaderboards.

Live App: https://tabletop-ledger.vercel.app/

The back-end API can be viewed here: https://github.com/morrowRefactor/tabletop-ledger-express-api

## Summary
Tabletop Ledger allows board game hobbyists to log their sessions, track their progress, and climb leaderboards against other TTL members.  User can create an account to start logging their sessions.  TTL will track their scores and their wins and losses.  Users can share tips and tricks specific to a particular game and add games to the TTL database to ensure all manner of sessions can be tracked.  As user progress their stats will update and they can earn badges based on games' mechanics and categories.  TTL gamifies board games and expands gaming sessions beyond the table.

## Tecnology:

* React
  * Create React App
  * React Router
* HTML5
* CSS3 (scratch - no frameworks)
* BoardGameGeek API
* JWT Authentication

#### Testing

* Jest (smoke tests)

#### Production

* Deployed via Zeit

## Screenshots

Homepage:

![screenshotDescription](https://user-images.githubusercontent.com/58446465/101947814-e99daf00-3ba5-11eb-929d-30f7ec8db1b2.png)

Browsing Games: Users can browse games as well as add them to the TTL database.

![screenshotDescription](https://user-images.githubusercontent.com/58446465/101947812-e9051880-3ba5-11eb-8301-7ac38fccd35f.png)

Climb Leaderboards: As users log more games they can improve their standings in the community leaderboards.

![screenshotDescription](https://user-images.githubusercontent.com/58446465/101947816-e99daf00-3ba5-11eb-9601-717a9534fb47.png)

Creating Profiles: Users can create accounts to log their sessions and monitor their progress.

![screenshotDescription](https://user-images.githubusercontent.com/58446465/101947818-e99daf00-3ba5-11eb-88e5-f001c6fa876b.png)

Logging Sessions: A key aspect of TTL is logging game sessions so users can track their progress and earn badges.

![screenshotDescription](https://user-images.githubusercontent.com/58446465/101947820-ea364580-3ba5-11eb-972a-1a3a28f6ce73.png)



## Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
