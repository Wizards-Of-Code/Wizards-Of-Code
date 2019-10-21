## Wizards of Code

Have you ever needed to sharpen your JavaScript skills for an upcoming technical interview or to get ready for a challenging 17-week bootcamp? Solving coding challenges alone can be boring. Before long you lose motivation, give up, and miss your chance to get your dream job. Introducing Wizards of Code, a realtime, seamless, multiplayer, animated battle arena.

In Wizards of Code you compete alongside other coders and improve your ability to work under pressure, your typing speed, and your knowledge of JavaScript in an exciting and fun way! Solve problems. Defeat your enemies. Gain experience. Unlock medals. And climb the leaderboard to become the greatest wizard.

### Gameplay

After logging in, players can join an open battle, or create a new battle for other coders to join. When an opponent joins, the battle begins and you can select a coding challenge from one of three difficulty levels. The more challenging your problem the more damage your spell with do to your opponent. Be careful! If your code contains errors or your solution is incomplete, your spell may backfire and damage you instead, all Javascript rules apply! But if your code runs successfully, enjoy watching your opponent melt under a barrage of lightning or fire. The battle continues until one player’s health points are completely depleted! If you are victorious you will be rewarded with experience to unlock up to 5 total achievement medals. After completing the battle, players can choose to change their avatar for the next battle or see how they match up against fellow wizards on the leaderboard.

### Technologies

For our backend architecture, we decided to leverage the Google Firebase platform for a few reasons. First, Cloud Firestore’s realtime listeners help our application synchronize game state between battling users in realtime. Second, Firebase integration with OAuth made it easy to implement user authentication. Third, our user actions generate significantly more reads than writes, making Cloud Firestore a good fit because it is a flexible, scalable NoSQL database.

To build a seamless single-page experience we used React. React’s virtual DOM limits unnecessary and expensive DOM manipulations. This is useful for highly dynamic apps like Wizards of Code, which have frequently re-rendered views.

On the client side, to let users write code we used the CodeMirror open source project. CodeMirror makes writing code user-friendly with features such as automatic indentation and formatting.

We execute the user’s code on the client using Web Workers. A worker creates its own global scope in the client, which eliminates the risk of faulty or insecure code running on our server and doesn’t block the main JavaScript thread.

For our game animations, we used the powerful built-in functionality of CSS3 Animation. We used open source libraries to build our sprite sheets, which are collections of still images that create an animation effect when viewed in succession, similar to film strips.

### Challenges

One of our greatest challenges was finding an animation library that integrated well with React. We attempted to use a number of WebGL-based frameworks including pixi.js and two.js before realizing that CSS Animations were a lighter-weight and more reliable alternative that could meet all of our needs. Evaluating user-written code also posed risks. We had to take into account that malicious or poorly-written code could crash our servers or the user’s machine if handled improperly. WebWorkers proved to be a flexible solution that provided us security without the complexity of implementing a virtual execution environment using Docker.

Finally, we had to figure out where to manage our game state. Both users need to reference a single source of truth, so we scrapped our initial plan to use Redux in favor of using Firebase’s realtime listeners and Firestore for our state management. However, we did encounter some unforeseen consequences as a result of running our game on Firestore. As Wizards of Code gained popularity with our friends and classmates we exceeded the free database reads offered by Firebase, but don’t worry. We’ve upgraded our plan and Wizards of Code is now accessible to every aspiring Code Mage in the world. We hope you’ll become one of them by joining us at wizards-of-code.web.app! Thank you for reading!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

