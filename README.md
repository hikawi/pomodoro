# Frontend Mentor - Pomodoro app solution

<div align="center">

![Coverage](https://img.shields.io/codecov/c/github/hikawi/pomodoro)
![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fpomodoro.frilly.dev)

</div>

This is a solution to the [Pomodoro app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/pomodoro-app-KBFnycJ6G). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Pomodoro app solution](#frontend-mentor---pomodoro-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Keyboard Navigation](#keyboard-navigation)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)

## Overview

### The challenge

Users should be able to:

- Set a pomodoro timer and short & long break timers
- Customize how long each timer runs for
- See a circular progress bar that updates every minute and represents how far through their timer they are
- Customize the appearance of the app with the ability to set preferences for colors and fonts

### Keyboard Navigation

|                   Key                    | Action                       |
| :--------------------------------------: | ---------------------------- |
| <kbd>1</kbd>, <kbd>2</kbd>, <kbd>3</kbd> | Select clock type            |
|               <kbd>P</kbd>               | Start/resume/pause the clock |

### Screenshot

<details>
<summary>Home Mobile</summary>

![Home mobile](./screenshots/home-mobile.jpeg)

</details>

<details>
<summary>Settings Mobile</summary>

![Settings mobile](./screenshots/settings-mobile.jpeg)

</details>

<details>
<summary>Home Tablet</summary>

![Home tablet](./screenshots/home-tablet.jpeg)

</details>

<details>
<summary>Settings Tablet</summary>

![Settings tablet](./screenshots/settings-tablet.jpeg)

</details>

<details>
<summary>Home desktop</summary>

![Home desktop](./screenshots/home-desktop.jpeg)

</details>

<details>
<summary>Settings desktop</summary>

![Settings desktop](./screenshots/settings-desktop.jpeg)

</details>

### Links

- [Live Site URL](https://pomodoro.frilly.dev/)

## My process

### Built with

- [Astro](https://astro.build/)
- [Vue](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com/)
- [Nanostores](https://github.com/nanostores/)

### What I learned

I learned how to work with the circular progress bar using `stroke-dasharray` and `<svg>` element. That's kinda weird, but okay to work with for an animatable.
