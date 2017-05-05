## Contributing

1. Fork this repository
2. Claim an issue on our [Asana project](https://app.asana.com/0/298435091634227/board)
3. Cut a topic branch
4. Finish issue
6. Run the linter
7. Run tests
5. Submit a pull request

## Development Setup

### Install dependencies
```sh
$ yarn
```

###### Allow terminal notifications
```sh
$ brew install terminal-notifier
```

### Set up authentication with Google OAuth
1. Go to [Google API Manager](https://console.cloud.google.com/apis/library)
2. Select the dropdown next to the Google Cloud Platform title
3. Create new (or use existing) project
4. Click API Manager
5. Navigate to Library from menu on left side column
6. Under Social APIs, choose Google+ API
7. At the top of the page, click enable to enable the API for your selected project
8. Navigate to 'Credentials' from left side menu
9. Select OAuth client ID from 'create credentials' dropdown
10. Ensure Email address is correct and click Save button
11. On the create Credentials dropdown menu select OAuth client ID
12. Create consent screen
13. Select web application and supply the redirect URI with: http://localhost:1337/google/auth/callback
14. Click Create button twice
15. Copy client ID and client secret
16. Create .env file:

```sh
$ touch .env
```
14. Store client ID, client secret, and session secret in .env:

```
GOOGLE_CLIENT_ID=[user's client ID]
CLIENT_SECRET=[user's client secret]
SESSION_SECRET=[random string you make up]
CALLBACK_URL=[redirect URI from above]
```

### Setup Database

```sh
$ yarn db:setup
```

### Scripts

###### Run tests
```sh
$ yarn test
```

###### Run the linter
```sh
$ yarn lint
```

###### Rollback migration
```sh
$ yarn migrate:rollback
```

###### To rollback test DB
```sh
$ NODE_ENV=test yarn migrate:rollback
```

###### To open coverage report in browser
```sh
$ yarn report:web
```

### Cutting a new branch
```sh
$ git remote add upstream https://github.com/nodatall/step
$ git fetch upstream
$ git checkout -b my-topic-branch upstream/master
$ git push -fu origin HEAD
```

### Submitting a pull request
```sh
$ git fetch upstream
$ git rebase upstream/master
$ yarn
$ yarn cows # previously known as yarn test
$ git push -f origin HEAD
```
###### Updating packages
$ rm -rf node_modules
$ rm yarn.lock
$ yarn install
When the prompt comes up, type "A"

### Architecture
- Node
- Express
- Webpack
- Babel latest
- Postgres
- Knex
- React
- SCSS
- Mocha/Chai/Enzyme/Sinon

### Standards

###### UI Mock-ups
[Step's Invision](https://invis.io/QEAU5DRH6#/225562505_Login_Desktop)

###### Testing
- Find love for TDD in your heart and write tests before writing code
- Aim for 100% test coverage of everything

###### Creating Components
- Component sets (presentation and container) should have their own folder
- Components should be broken into presentation and container components
- Presentation Components should be stateless function Components whenever possible
- Container Components handle all data manipulation and should contain no JSX
- Each Component set has its own .scss file
- Each Component set has it own \_tests file
- Component file and directory names should be in UpperCamelCase
