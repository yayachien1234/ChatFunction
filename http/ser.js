#!/usr/bin/env node

// Step 1 and step 2 code goes here
import express from 'express'
// const express = require('express')

import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// create an express, aka web server, instance
// 建立一個 express (也就是網頁伺服器)實體
const app = express()

const port = 7777

// handle `/step1` url
// 處理 `/step1` 網址
app.get('/step1', (req, res) => {
  // response browser
  // 回應瀏覽器
  res.send('<h1>hello world</h1>')
})

// start the server
// 啟動伺服器
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

// Step 3 code goes here
app.use(express.static(`${__dirname}/dist`))
// Step 4 code goes here
let nRequests = 0
app.get('/step4', (req, res) => {
  res.send(`this is request #${++nRequests}`)
})
// Step 5 code goes here
app.get('/step5', (req, res) => {
  res.send(`Hello, ${req.query.fname} ${req.query.lname}`)
})
// Step 7 code goes here
import bodyParser from 'body-parser'
// const bodyParser = require('body-parser')

// setup `body-parser`
// 設定 `body-parser`
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/step7', (req, res) => {
  // `bady-parser` stores parsed data in `req.body`
  // `bady-parser` 將解析好的資料存放在 `req.body`
  res.send(`Hello, ${req.body.fname} ${req.body.lname}`)
})