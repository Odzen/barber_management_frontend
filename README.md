# Barber Management Frontend

## Description

Frontend for Barber Managment using:

- JavaScript
- React / Vite
- Ant Design
- CSS / SCSS
- Jest

## Installation of dependencies

First, you have to enter to the root folder project

```bash
$ npm install
```

## Running the app
After the project dependencies, you need to run the following script:

```bash
$ npm run dev
```

To stop the development server execution
```bash
$ Ctrl + C
```

## Environment variables

Be sure to create a .env file in the root of the project with the variables shown in the .env.example file. There are some variables already set in the .env.example file to match the variables used in requests.

## Recommended VSCode extensions

We have a [.prettierrc](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [.eslintrc](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) file in the root of the project. So we strongly recommend you to install Prettier and ESLint extensions in VSCode to format your code automatically on save and to avoid any linting errors.

ES7 React/Redux: Adds snippets to quickly develop React and Redux code. [Download](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

Simple React Snippets: Optimized snippets for React application development. [Download](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)

Auto Close Tag: Automatically close HTML tags in text editor. [Download](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)

## CI/CD

We are using Github Actions for CI/CD. You can find the workflow file in the .github/workflows folder. We are using the following actions:
https://github.com/Odzen/barber_management_frontend/tree/main/.github/workflows
1. [sonar.yml](https://github.com/Odzen/barber_management_frontend/tree/main/.github/workflows/sonar.yml) - It runs SonarCloud analysis on every push to the main branch and development branch. This uses SonarCloud to analyze the code and find bugs, vulnerabilities, code smells, etc. SonarCloud is also configured to interact with a Lambda function in a AWS that works as a webhook to process the results of the analysis and send them to a Slack channel.

2. [notifications.yml](https://github.com/Odzen/barber_management_frontend/tree/main/.github/workflows/notifications.yml) - This action runs on every push to the main branch. It sends a notification to a Slack channel with the purpose of notifying that the main branch has been updated.

3. [deploy.yml](https://github.com/Odzen/barber_management_frontend/tree/main/.github/workflows/deploy.yml) - This action runs on every push to the main branch. First it runs all the same checks from the push workflow, prettier, lint, test and build. If all the checks pass, it deploys the app to [Vercel](https://vercel.com) that deploys the app using the [vercel.json](https://github.com/Odzen/barber_management_frontend/blob/main/vercel.json) file. sets the file version, defines that the project directory is not public, and disables Vercel's integration with GitHub.

4. [pr_notification.yml](https://github.com/Odzen/barber_management_frontend/tree/main/.github/workflows/pr_notification.yml) - This action will be executed when certain types of pull request events occur. Event types include: opened, reopened, review_requested, closed, and synchronize on the main and dev branches. And its purpose is to send notifications to Slack when some of the pull requests mentioned above occur.

5. [cached_install/action.yml](https://github.com/Odzen/barber_management_frontend/tree/main/.github/cached_install/action.yml) - This action configures Node.js, caches the node_modules modules, and then installs dependencies only if no previous cache was found. This allows for a faster installation process by using the cache where possible.

