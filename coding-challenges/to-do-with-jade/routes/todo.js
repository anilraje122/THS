var express = require("express");
const Todo = require("../models/Todo");
const { body, validationResult } = require("express-validator");

var router = express.Router();

/* Add todo : done*/
router.post(
  "/add",
  [body("task", "Task is required").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      const todo = new Todo(req.body);
      await todo.save();
      res.redirect("/todo");
    } catch (err) {
      res.status(500).json({ Error: "Server Error" });
    }
  }
);

/* Fetch all todos : done*/
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.render("todo-list", { todos });
  } catch (err) {
    res.status(400).json({ Error: "Server Error" });
  }
});

/* Update todo */
router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isEdit: true,
        },
      }
    );
    const todos = await Todo.find({});
    res.render("todo-edit", { todos });
  } catch (err) {
    res.status(400).json({ Error: "Server Error" });
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { task } = req.body;
    const id = req.params.id;
    await Todo.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isEdit: false,
          task,
        },
      }
    );
    res.redirect("/todo");
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }
});

/* Delete todo */
router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.deleteOne({
      _id: id,
    });
    res.redirect("/todo");
  } catch (err) {
    res.status(500).json({ Error: "Server Error" });
  }
});

module.exports = router;
