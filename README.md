# Alcolator - How Much Alcohol Should I Drink?


Welcome to an alcohol calculator!

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) <space>

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)<space>

![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)<space>

## Description

Love attending parties, but always overdo it with alcohol? The calculator will help you calculate how much alcohol you should/can consume! Just give answers to all the questions on the main page and enjoy a party.

To give as precise result as possible it considers a lot of factors like your alcohol tolerance or whether you smoke (described in more detail below). **Attention!** The results may vary from the real values due to special configurations of organisms.

I used React and SCSS to enhance my proficiency in these technologies. Why React *TypeScript*? Well, because it's for me it's much more comfortable to use TS with its types, interfaces, and other features instead of JS.

Fortunately, no problems were faced, though I had to conduct research to find formulas and the effect of different factors on alcohol absorption. 


## Navigation
1. [Description](#description)
2. [Installation and Running](#installation-and-running)
3. [Formulas and Factors](#formulas-and-factors)
    - [Formulas](#formulas)
    - [Factors](#factors)
4. [Usage](#usage)
5. [Sources](#sources)



## Installation and Running

1. Clone the repository.

```bash
git clone https://github.com/Abviol/alcolator-app.git
```

2. Download the last version of **Node.js and npm** (Node Package Manager) for your OS [here](https://nodejs.org/en). Skip if you have.

3. Navigate to the root folder and install dependencies.

```bash
npm install
```

4. Run the project
```bash
npm start
```
## Formulas and Factors

### Formulas

#### Blood alcohol content - Forward Widmark calculation:

_C = 100vzadr / M − βt_

Where:
- **C** is the BAC at the relevant time
- **v** is the volume of drink consumed in millilitres
- **a** is the proportion of the alcohol absorbed
- **z** is the strength of the drink as percentage ABV ÷ 100
- **d** is the density of alcohol (= 0.789 grams per millilitre, constant)
- **r** is the subject’s proportion of body water in litres/kilogram, divided by the proportion - of water in blood in litres/litre (Widmark Factor)
- **M** is the mass of the subject, in kilograms
- **β** is the subject’s elimination rate, in mg% per hour
- **t** is the duration from the start of the session to the relevant time, in hours

#### Widmark Factor

For men r = 1.0181-0.01213 × BMI

For women r = 0.9367-0.01240 × BMI

#### Body mass index (BMI):

_Weight (kg) / Height^2 (m^2)_


### Factors

- gender
- weight
- height
- strength of the drink(s)
- snacks
- where to drink
- with who to drink
- level of tolerance
- frequency of having a hangover
- any physical activity
- do you smoke
- the goal of the bender

## Usage

See the video with a showcase [here](https://youtu.be/HfU_CilNmUg).


## Sources

The original app, which idea I aimed to implement by myself: [How much alcohol to drink?](https://play.google.com/store/apps/details?id=com.xzcompany.alcometr&pli=1)

The documentation with the main formula: [Alcohol calculations and their uncertainty](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4361698/).
