#!/usr/bin/env node
// Line above allows to directly execute the file (without node prefix)
import express from "express";
const app = express();

app.get("/", (req, res) => res.send("hi"));

app.listen(3005, () => console.log("Listening on 3005"));
