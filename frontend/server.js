const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
const API_URL = process.env.API_URL || "http://localhost:8080";

app.use(express.json());
app.use(express.static("public"));

app.get("/api/todos", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/todos`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Backend not reachable" });
  }
});

app.post("/api/todos", async (req, res) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body)
  });
  res.json(await response.json());
});

app.delete("/api/todos/:id", async (req, res) => {
  await fetch(`${API_URL}/todos/${req.params.id}`, {
    method: "DELETE"
  });
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});

