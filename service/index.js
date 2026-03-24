const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();
const DB = require("./database.js");

const authCookieName = "token";

// The service port may be set on the command line
// This may need to be 4000 if something breaks
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// cookie tracking auth tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static("public"));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

const getDayValue = (date) =>
  Math.floor(date.getTime() / (1000 * 60 * 60 * 24));

// CreateAuth token for a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await findUser("email", req.body.email)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(
      req.body.email,
      req.body.password,
      req.body.country,
    );

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth token for the provided credentials
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("email", req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    await DB.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware verify auth token
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// GetScores
apiRouter.get("/scores", verifyAuth, async (req, res) => {
  const leaderboard = await DB.getHighScores();
  res.send(leaderboard);
});

// SubmitScore
apiRouter.post("/score", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  const today = getDayValue(new Date());

  if (user.lastDayPlayed === today - 1) {
    user.dailyStreak += 1;
  } else if (user.lastDayPlayed !== today) {
    user.dailyStreak = 1;
  }

  user.gamesPlayed += 1;
  user.lastDayPlayed = today;

  const newScore = {
    name: user.email,
    country: user.country,
    countryURL: user.countryURL,
    dailyStreak: user.dailyStreak,
    gamesPlayed: user.gamesPlayed,
  };

  const leaderboard = await updateScores(newScore);
  res.send(newScore);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// if lost, go to main page
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

// updateScores considers a new score for inclusion in the high scores.
async function updateScores(newScore) {
  const leaderboard = await DB.getHighScores();
  // replaces old player score
  leaderboard = leaderboard.filter((s) => s.name !== newScore.name);
  leaderboard.push(newScore);
  // sorts
  leaderboard.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
  // takes first 10
  leaderboard = leaderboard.slice(0, 10);
  return leaderboard;
}

async function createUser(email, password, country) {
  const passwordHash = await bcrypt.hash(password, 10);

  /// format for getting flag image for country
  /// https://flagcdn.com/16x12/ua.png

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    lastDayPlayed: 0,
    dailyStreak: 0,
    gamesPlayed: 0,
    country: country,
    countryURL: `https://flagcdn.com/120x90/${country}.png`,
  };
  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === "token") {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
