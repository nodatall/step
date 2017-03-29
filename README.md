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
```
$ brew install terminal-notifier
```

### Setup Database

```
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
$ yarn test
$ git push -f origin HEAD
```

### Architecture
- Node
- Express
- Webpack
- Babel latest
- Postgres
- Knex
- React
- SCSS
- Mocha/Chai/Enzyme

### Standards

###### UI Mock-ups
[Step's Invision](https://invis.io/QEAU5DRH6#/225562505_Login_Desktop)

###### Testing
- All routes and queries should have 100% test coverage
- All React Components should have 100% test coverage

###### Creating Components
- Component sets (presentation and container) should have their own folder
- Components should be broken into presentation and container components
- Presentation Components should be stateless function Components whenever possible
- Container Components handle all data manipulation and should contain no JSX
- Each Component set has its own .scss file
- Each Component set has it own .test.js file
- Component file and directory names should be in UpperCamelCase
