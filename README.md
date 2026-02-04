# Flaggle Game

This game is just like wordle, but with flags. You guess a flag and see how close you are. The game will display the colors of the flag that you got correct. You keep guessing until you get the daily flag.

### Elevator pitch

Do you love flags? Do you love wordle and other fun newyorktimes games? This website combines your love of flags with a simple game. Your goal is to guess the daily flag in as few guesses as possible. After each guess the matching parts of your flag and the daily flag are revealed to you, giving you more information. Keep guessing until you get the daily flag!

### Design

![Login_image](readme_images/login.png)

When the user gets to the website they will see this login page. This will be the first page they see. They can click create account for first time visit.

![Create_Account_image](readme_images/create_account.png)

After creating an account the website will direct you to the main page.

![Game_Seq_image_1](readme_images/game_1.png)

After the user logs in to their account they will be brought to this page. The user can enter in a flag type to the text box. Then they will click the guess button which will submit their guess.

![Game_Seq_image_2](readme_images/game_2.png)

The website will display all locations where the color matches between the guess and the flag of the day. For example the red and white are displayed, while the rest is blacked out.

![Game_Seq_image_3](readme_images/game_3.png)

After a second guess the user still retains the red revealed from the previous guess. The user also reveals the white column in the flag with their guess.

![Game_Seq_image_4](readme_images/game_4.png)

The flag on the right will match the flag on the left when the user gets their guess correct

![Leaderboard_image](readme_images/leaderboard.png)

The user can navigate to the leaderboard from the main page through a button labeled leaderboard. The back button navigates back to the main page.

```mermaid
sequenceDiagram
    actor User
    actor Website
    User->>Website: Send flag guess (string)
    Website->>User: Return Image & Result False
    User->>Website: Send flag guess (string)
    Website->>User: Return Image & Result True
```

### Key features

- Secure login over HTTPS
- Daily streak
- Player statistics are recorded
- Competitive online leaderboards
- Interactive game design

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - HTML will be used to route players between pages. There will be a login page, create account page, game page and leaderboard page. 
- **CSS** - CSS is essential in the styling of the page and also visual adaptation for mobile. This website should look presentable on mobile as that is going to be the most common platform.
- **React** - React will update the user's end to display the updated flag. It will also create the session and allow the user to rejoin that session.
- **Service** - Services that I will use are logging in, creating an account, update profile statistics, update leaderboard. I will also use an API call to get a map of the country that matches the flag of the day with this link: https://github.com/lennertVanSever/graphcountries
- **DB/Login** - DB will store the user's login information and statistics. It will be used to authenticate their login as well.
- **WebSocket** - Times and guess count will notify to all players to update the leaderboard. It will also notify the user of each individual that completes the flaggle while they are on the main page or leaderboard page.

## 🚀 Specification Deliverable

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

## 🚀 AWS deliverable

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://flagle.click/).

## 🚀 HTML deliverable

# Notes
- I will want to remember how my API request works for flagsAPI
- Here is an example: https://flagsapi.com/AU/flat/32.png This gets the Australian flag
- Structure my Leaderboard as a table when styling it in CSS
- Daily and Unlimited Flagle will be duplicates but should add to different numbers in the DB

- [x] **HTML pages** - I have Five HTML pages. 
- [x] **Proper HTML element usage** - I used BODY, TABLE, NAV, MAIN, HEADER and FOOTER. I kept my FOOTER simple with a link to my github on each page. The HEADER is the same on each page with links to all necessary pages. I used BODY for all content between the HEADER and FOOTER. I used NAV with a MENU in the same style as the Simon demo inside the HEADER. I was able to use TABLE for both the leaderboard and the placeholder for my flags in daily.html and unlimited.html
- [x] **Links** - Links are found at the top of the page to navigate between Leaderboard, Home, Daily and Unlimited
- [x] **Text** - Flag guesses are displayed as text on the daily.html and unlimited.html screen
- [x] **3rd party API placeholder** - I was able to do a 3rd party API call to flagsapi.com on my leaderboard page for each player's country flag
- [x] **Images** - I added a flag banner image seen at the top of every page. I also use svg for my drawing of my flags on the daily.html and unlimited.html screen
- [x] **Login placeholder** - I have a login placeholder on the index.html page and a create account placeholder on the create_account.html
- [x] **DB data placeholder** - The DB data placeholder is the leaderboard information, player rank, country, name, daily streak and starting date are all stored in the database
- [x] **WebSocket placeholder** - The community total will update from WebSocket game completions. In addition to that my daily.html and unlimited.html screens will show players starting and completing games from WebSockets

## 🚀 CSS deliverable

Notes
- I need to remember the styling colors that I've used:
Footer/menu bar: background-color: #212121
Menu hover/curr_page: background-color: #111111

- This is my codepen link from practice: https://codepen.io/Searlejk/pen/wBWXqBB

- This is my link to the other codepen practice: https://codepen.io/Searlejk/pen/pvbKawO?editors=0100



Prerequisites:
[x] - I added the simon CSS to my website


- [x] **Visually appealing colors and layout. No overflowing elements.** - I use calm darker colors. Everything is contained to the screen. The layout is simple and easy to navigate.
- [x] **Use of a CSS framework** - I used the CSS framework for basic bootstrap to make fonts and other details more standardized. This helped with buttons and input boxes.
- [x] **All visual elements styled using CSS** - I styled every part of this website either in CSS or by using a boostrap style.
- [x] **Responsive to window resizing using flexbox and/or grid display** - By adding flex to my css I was able to make sure it adapted to window resizing.
- [x] **Use of a imported font** - I added a semi-bold Montserrat font from google. I applied it to everything.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I used each of these in my css code. My pseduo selector was hover, my ID was

## 🚀 React part 1: Routing deliverable

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.

## 🚀 DB deliverable

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
