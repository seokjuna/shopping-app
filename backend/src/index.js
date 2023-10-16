const express = require('express')

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('안녕하세요!');
})

app.listen(4000, () => {
    console.log(`${port}번에서 실행이 되었습니다.`);
})