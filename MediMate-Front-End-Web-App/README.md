# MediMate — Front-End Web Application ⚕️

A medical appointment management system designed to streamline patient bookings, staff management, and doctor-patient interactions. Built with React, and back-end built with Node.js, Express, and MongoDB.

## Contents

- [Hardware Requirements](#hardware-requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Production Environment](#production-environment)
  - [Development Environment](#development-environment)
  - [Running Tests](#running-tests)
- [Dependencies](#dependencies)
  - [Deployment Dependencies](#deployment-dependencies)
  - [Development Dependencies](#development-dependencies)
- [Alternative Technologies](#alternative-technologies)
  - [Deployment Dependencies](#deployment-dependencies-1)
  - [Development Dependencies](#development-dependencies-1)
- [Style Guide](#style-guide)
  - [Custom Rules](#custom-rules)

---

## Hardware Requirements

- ✅ Processor: 1 GHz or faster 64‑bit CPU
- ✅ RAM: 1 GB minimum
- ✅ Storage: 1 GB free HDD/SSD
- ✅ Network: Internet access
- ✅ OS: Windows 10 / Server 2016, macOS 13.5, Linux Kernel 4.18+

---

## Installation

Prerequisites

- Node.js
- Git

1. Clone repository

   ```bash
   git clone git@github.com:lillieharlow/MediMate-Front-End-Web-App.git
   cd MediMate-Front-End-Web-App
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure Environment

   ```bash
   cp .env.example .env
   # open .env and set values as required
   ```

---

## Usage

### Production Environment

1. Build Application

```bash
npm run build
```

2. Deploy Application

```bash
# Copy contents of 'dist' folder to web server
```

### Development Environment

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

---

## Dependencies

### Deployment Dependencies

| Package           | Version | License | Purpose                                                |
| ----------------- | ------: | ------- | ------------------------------------------------------ |
| react             |  19.2.0 | MIT     | Primary front-end library for building user interfaces |
| react-dom         |  19.2.0 | MIT     | Provides DOM-specific methods for React                |
| react-icons       |   5.5.0 | MIT     | Icon library for React applications                    |
| react-router      |   6.2.0 | MIT     | Provides routing capabilities for React applications   |
| styled-components |   6.2.0 | MIT     | Library for styling React components with reusable CSS |

### Development Dependencies

| Package                     | Version | License | Purpose                                                         |
| --------------------------- | ------: | ------- | --------------------------------------------------------------- |
| @biomejs/biome              |  2.3.11 | MIT     | Linting / formatting tool for enforcing code style guide        |
| @testing-library/jest-dom   |   6.9.1 | MIT     | Custom jest matchers for testing DOM nodes                      |
| @testing-library/react      |  16.3.1 | MIT     | Utilities for testing React components                          |
| @testing-library/user-event |  14.6.1 | MIT     | Simulates user interactions for testing                         |
| @types/react                |  19.2.5 | MIT     | Type definitions for React                                      |
| @types/react-dom            |  19.2.3 | MIT     | Type definitions for React                                      |
| @vitejs/plugin-react        |   5.1.1 | MIT     | Vite plugin for React support                                   |
| globals                     |  16.5.0 | MIT     | Provides global type definitions for testing                    |
| jsdom                       |  27.4.0 | MIT     | JavaScript implementation of the DOM for testing                |
| jsonwebtoken                |   9.0.3 | MIT     | Library for working with JSON Web Tokens, used for testing only |
| msw                         |  2.12.7 | MIT     | Mock Service Worker for API mocking in tests                    |
| vite                        |   7.2.5 | MIT     | Build tool for JavaScript projects                              |
| vitest                      |  4.0.16 | MIT     | Testing framework for Vite projects                             |

---

## Alternative Technologies

### Hardware Requirements

| Hardware Selection              | Alternatives                         | Reason For Selecting                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bare-metal / self hosted server | Cloud Hosting (AWS, Azure, etc), VPS | Bare-metal hosting provides dedicated resources and is a logical choice while undergoing development, and rapidly spinning up both front end and back end services for the app. For production deployment, an alternative choice would be selected, such as cloud hosting with separate front & back-end deployments, or a virtual private server (VPS), which could accomodate both services at one network location. |

### Deployment Dependencies

| Package           | Alternatives                          | Reason For Selecting                                                                                                                                                                                                                                                                                                              |
| ----------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| react/react-dom   | vuejs, Angular, Svelte                | React is positioned as the industry standard for building web UIs, and due to its wide industry adoption and solid plugin support it was the best choice for this project.                                                                                                                                                        |
| react-icons       | Image based icons/unicode             | React-icons provides a comprehensive library of icons with simple integration into React components. With 5+ million weekly downloads it is recognised and trusted by the community.                                                                                                                                              |
| react-router      | TanStack Router                       | React-router is the most recognised and widely adopted routing plugin for React. While other options such as the TanStact Router exist, react-router was selected for its simple integration and recognisable syntax.                                                                                                             |
| styled-components | CSS imports, direct component styling | styled-components provides a flexible framework for styling reusable components, with the ability to implement more complex styles than direct component styling, while also integrating closely into components without management of external CSS files. With 6+ million weekly downloads, it is recognised and well supported. |

### Development Dependencies

| Package                                                    | Alternatives                         | Reason For Selecting                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| @biomejs/biome                                             | ESLint/Prettier                      | Biome was chosen for its integrated linting and formatting capabilities, and up to date features with the latest ES9 JavaScript standard. ESLint/Prettier is still the more popular choice, however with the intention to base the style guide off the AirBnB guide, and use of ES9 features, Biome was chosen for it's integration into ES9 where the AirBnB style guide directly through ESLint requires substantial additional configuration. |
| React Testing Library (@testing-library/react, user-event) | ReactTestUtils, Browser mode testing | RTL provides a user-centric way to test React components, by focusing on how a user would interact with the UI, allowing an easy method to follow best testing practices for React applications. RTL is well recognised and widely adopted in the JS community.                                                                                                                                                                                  |
| jsonwebtoken                                               | express-jwt, jose                    | jsonwebtoken is used to create & verify JWTs in the app. Express-jwt provides specific middleware for express, and is itself dependent on jsonwebtoken, so jsonwebtoken is used for flexibility of implementation into the app. Jose provides a more comprehensive solution with additional features, however these features are not required in this use case.                                                                                  |
| msw                                                        | Nock, JSON Server, Mirage            | Mock Service Worker is a newer mocking tool than the alternatives, and less widely adopted, but offers a modern approach to API mocking that requires minimal configuration. Due to its modern usage and network level interception of API calls, it was selected for this project despite lower community adoption.                                                                                                                             |
| vite, vitejs/plugin-react, globals                         | Parcel, Rsbuild                      | Vite is popular in the community and includes bundled testing tools, a wide range of plugins, and a smooth development experience. It's wide adoption made it the first choice for development of this app.                                                                                                                                                                                                                                      |
| vitest, jsdom, jest-dom                                    | jest, Playwright                     | Vitest is integrated into the selected build tool, Vite, and provides an almost identical testing experience to jest. Vitest is well regarded by the community and widely used for React apps in particular.                                                                                                                                                                                                                                     |

---

## Style Guide

This project uses Biome recommended linting & formatting rules for Javascript/JSX and CSS as its style guide, with custom rules based off the AirBnB style guide as described below.

- [Biome Default Ruleset](https://biomejs.dev/reference/configuration/)

### Custom Rules

Some custom rules have been included to suit project requirements and emulate elements of the AirBnB style guide for Javascript/JSX.

- Maximum line length is set to 100 characters
- JSX code is allowed only in files with .jsx extension
- Single quotes are enforced for .js files, and double quotes for .jsx files
- CSS formatting/linting is enabled
- Multiline binary expressions & ternary operators include the operator at the beginning of the new line
