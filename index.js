const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Get
app.get("/users", (req, res) => {
  const html = `
    <ul> ${users.map((users) => `<li> ${users.email}</li>`).join(" ")}</ul>`;
  res.send(html);
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
    console.log(Upbody);
    console.log(req.body);
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
  console.log(body);
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success", id: users.length });
  });
});
//start Server
app.listen(PORT, () => {
  console.log(`Server running on Port no ${PORT}`);
});
