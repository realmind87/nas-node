const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const hostname = '0.0.0.0';
const port = 8080;

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

app.use(express.json()); // JSON 요청 본문을 파싱하기 위한 미들웨어

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 세션 설정
app.use(session({
    secret: 'your_secret_key', // 세션을 암호화하기 위한 비밀키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPS를 사용하는 경우 true로 설정
}));

let url = ""

// development
app.use(
  cors({
    origin: ["http://192.168.219.103:3000", 'http://112.157.157.231:3000', 'http://www.deepandeast.com:3000', 'http://deepandeast.com:3000', 'http://www.eastzero-blog.com', 'http://www.eastzero-blog.com:3000', 'http://eastzero-blog.com', 'http://eastzero-blog.com:3000'],
    credentials: true,
  })
);

// 라우트 마운트
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.json({url});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});