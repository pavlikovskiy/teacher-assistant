# Teacher Assistant Coding Challenge 

# Overview
**Teacher's Assistant** app helps teachers to grade students in 'Unit Conversion' science unit by validating students answer for Temperatures and Volumes conversions.   
The app supports all screen sizes (responsive) and keyboard accessible.

**Teacher's Assistant** is ready to use [here (https://teacher-assistant.vercel.app/)](https://teacher-assistant.vercel.app/).

Technical stack: TypeScript, Next.js, React, Material UI. CI/CD is used to deploy main branch to Vercel's cloud.

Video demo / intro and tech walk through (3 mins) is [here](https://photos.app.goo.gl/fMbEm2hMa8m12W9r5)

## How to use

[Clone the repo](https://github.com/pavlikovskiy/teacher-assistant), install it and run:

```bash
cd teacher-assistant
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

Run unit tests for core functionality
```bash
yarn test
```
Run end-to-end tests to test whole app 
```bash
yarn e2e:headless
```

## What's next?

###  short term
 - fix technical debts (better test coverage)
 - propose to add more options for conversion unit (e.g. length, mass, weight, energy, ...) 
 - propose to add log of assignment validations

###  mid term
 - propose functionality for students pass assignment on-line (so, teachers don't need to enter result's manually from paper)

###  long term
 - propose other science units automation / implementation (e.g. evolve to e-learning system)  
