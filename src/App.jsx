import React, { useState } from "react";
import "./App.css";


const App = () => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [user, setUser] = useState({
    name: "",
    gender: "",
    age: "",
    email: "",
  });
  const [isSignedUp, setIsSignedUp] = useState(false);

  const goodKeywords = [
    "reading",
    "exercise",
    "study",
    "meditate",
    "pray",
    "walk",
    "journal",
    "run",
    "sleeping early",
    "healthy eating",
    "drink water",
    "Fogive",
    "kindness",
    "help",
    "positive",
    "grateful",
    "patient",
    "honest",
    "helping others",
    "save money",
  ];
  const badKeywords = [
    "smoking",
    "procrastinate",
    "overeat",
    "bite nails",
    "drink",
    "waste time",
    "skip",
    "waking up late",
    "over speed",
    "gossip",
    "complain",
    "argue",
    "overthink",
    "hate",
    "overreact",
    "fight",
    "stress",
    "scream",
    "yell",
    "bully",
  ];

  const classifyHabit = (name) => {
    const lower = name.toLowerCase();
    if (goodKeywords.some((kw) => lower.includes(kw))) return "good";
    if (badKeywords.some((kw) => lower.includes(kw))) return "bad";
    return "unknown";
  };

  const addHabit = () => {
    if (habitName.trim() === "") return;

    const habitList = habitName.split(",").map((name) => name.trim());
    const newHabits = habitList.map((name) => ({
      name,
      type: classifyHabit(name),
    }));

    setHabits([...habits, ...newHabits]);
    setHabitName("");
  };

  const resetHabits = () => {
    setHabits([]);
  };

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    if (user.name && user.gender && user.age && user.email) {
      setIsSignedUp(true);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const goodHabitsCount = habits.filter(
    (habit) => habit.type === "good"
  ).length;
  const badHabitsCount = habits.filter((habit) => habit.type === "bad").length;

  return (
    <div className="container">
      {!isSignedUp ? (
        <div className="signUpSection">
          <h1 className="title">Sign Up to Track Habits</h1>
          <div className="userSection">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={handleUserChange}
              className="input"
            />
            <select
              name="gender"
              value={user.gender}
              onChange={handleUserChange}
              className="input"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={user.age}
              onChange={handleUserChange}
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              className="input"
            />
          </div>
          <button onClick={handleSignUp} className="button">
            Sign Up
          </button>
          <p className="info">
            By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      ) : (
        <div>
          <h1 className="title">Habit Tracker</h1>
          <div className="habitInput">
            <input
              type="text"
              value={habitName}
              placeholder="Enter habits (e.g. Reading, Smoking)"
              onChange={(e) => setHabitName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addHabit()}
              className="input"
            />
            <button onClick={addHabit} className="button">
              Add Habit
            </button>
          </div>

          <div className="habitCounts">
            <h3>Habit Counts</h3>
            <p>Good Habits: {goodHabitsCount}</p>
            <p>Bad Habits: {badHabitsCount}</p>
          </div>

          <ul className="habitList">
            {habits.map((habit, index) => (
              <li
                key={index}
                className="habitItem"
                style={{
                  color:
                    habit.type === "good"
                      ? "green"
                      : habit.type === "bad"
                      ? "red"
                      : "gray",
                }}
              >
                [{habit.type.toUpperCase()}] {habit.name}
              </li>
            ))}
          </ul>

          {habits.length > 0 && (
            <button onClick={resetHabits} className="resetButton">
              Reset Habits
            </button>
          )}

          <div className="info">
            <h2>
              A habit tracker helps you understand yourself better and leads to
              better life, health, and career success.
            </h2>
            <ul>
              <li>✔️ Self-awareness: Understand your patterns.</li>
              <li>✔️ Personal growth: Improve daily behaviors.</li>
              <li>✔️ Goal achievement: Build strong positive habits.</li>
            </ul>
              <p className="footer">© 2025 Habit Tracker. All rights reserved.</p>
            </div>
          </div>
        )}
      </div>
    );
};

export default App;
