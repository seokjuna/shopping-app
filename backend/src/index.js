const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('연결 완료');
    })
    .catch(err => {
        console.log(err);
    })

app.get('/', (req, res) => {
    res.send('안녕하세요!');
})

app.post('/', (req, res) => { 
    console.log(req.body);
    res.json(req.body);
})

app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(4000, () => {
    console.log(`${port}번에서 실행이 되었습니다.`);
})