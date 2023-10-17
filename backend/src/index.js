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

// 일부러 에러 발생시키기
app.get('/', (req, res, next) => {
    setImmediate(() => { next(new Error('it is an error')) }); 
})

app.post('/', (req, res) => { 
    console.log(req.body);
    res.json(req.body);
})

// 에러 처리기
app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.send(error.message || '서버에서 에러가 났습니다.');
})

app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(4000, () => {
    console.log(`${port}번에서 실행이 되었습니다.`);
})