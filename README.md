# TrenerGo Application

TrenerGO NextJS app configured with:

- Styling Framework [Ant Design](https://ant.design/)
- Strong Typing [Typescript](https://www.typescriptlang.org/)
- State management [Redux Tool Kit](https://redux-toolkit.js.org/)
- Custom style components [Styled Components](https://styled-components.com/docs/basics)
- Nested Drag and Drop feature [React DnD Drag and Drop](https://www.npmjs.com/package/react-dnd)
- For Logging [Redux logger](https://www.npmjs.com/package/redux-logger)
- State persistancy [Redux Persist](https://www.npmjs.com/package/redux-persist)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)

## How to use

Using [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the App:

```bash
git clone [project-url]
# and
cd trenergo_panel
# installing all dependancies
yarn install
# For staring app
yarn run dev
# For Bulding app
yarn run build
-----------------------
## Linting
yarn run lint
## lint fixing
yarn run lint-fix
## Formatting
yarn run format
```


## Description

## TrainerGo
TrainerGo is a web-based application that facilitates remote communication and training between fitness trainers and their clients. This platform leverages React, Redux, Firebase Realtime Database, and Firebase Cloud Firestore to create a seamless experience for trainers and clients alike.

## Table of Contents
- Features
- Getting Started
- Prerequisites
- Installation
- Usage
- Contributing
- License
- Features
- TrainerGo offers a wide range of features for both trainers and clients, including:

## Trainer Features:

Secure login for trainers.
Creating and customizing training plans for clients.
Designing diet routines.
Monitoring client progress.
Real-time video calls to watch clients perform exercises.
Creating various exercise sets, including drop sets, tri sets, and giant sets.
Communication through built-in chat functionality.

## Client Features:

Selection of customized training plans.
Access to diet routines designed by trainers.
Progress tracking.
Video sessions with trainers.
Chat functionality for direct communication with trainers.

## Getting Started
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js and npm installed.
Firebase project set up with Firebase Realtime Database and Firebase Cloud Firestore.
Installation
Clone the repository:

## bash
Copy code
git clone https://github.com/yourusername/TrainerGo.git
Navigate to the project directory:

## bash
Copy code
cd TrainerGo
Install the project dependencies:

## bash
Copy code
npm install
Configure Firebase:

## Create a Firebase project on the Firebase Console.
Add Firebase configuration details to your project (usually found in Firebase settings).
Set up Firebase Realtime Database and Firebase Cloud Firestore.
Start the development server:

## bash
Copy code
npm start
Access the application at http://localhost:3000.

## Usage
As a trainer, log in to create training plans, monitor client progress, and interact with clients via video calls and chat.
As a client, log in to select training plans, access diet routines, track your progress, and communicate with your trainer.
Contributing
To contribute to TrainerGo, follow these steps:

## Fork the project.
Create a new branch for your feature or bug fix.
Make your changes and commit them with clear, concise commit messages.
Push your changes to your fork.
Submit a pull request to the main repository.
