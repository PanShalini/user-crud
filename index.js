const express = require("express");
const pool = require("./db");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Get
app.get("/users", (req, res) => {
  const result = pool.query("Select * from Customers");
  res.json(result.rows);
});

//Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .delete((req, res) => {
    return res.json({ message: `column ${id} deleted successfully` });
  })
  .put((req, res) => {
    const Upbody = req.body;
    const id = Number(req.params.id);
    const user = users.map((obj) => {
      if (obj.id === id) {
        return Upbody;
      } else {
        return obj;
      }
    });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
      return res.json({ user });
    });
  });
app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});
//start Server
app.listen(PORT, () => {
  console.log(`Server running on Port no ${PORT}`);
});
