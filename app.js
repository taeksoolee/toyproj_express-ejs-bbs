const { contentsStore } = require('./modules');

require('./utils').init();

const path = require('path');
const express = require('express');
const app = express();

const session = require('express-session');
// const FileStore = require("session-file-store")(session);
const sessionOpt = {
  secret: 'taeksoolee',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000,
  },
  // store: new FileStore(),
}

if(process.env.NODE_ENV === 'production') {
  // app.set('trust proxy', 1) // trust first proxy, production mode
  sessionOpt.cookie.secure = true;
}

app.use(session(sessionOpt));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  const {error, destination} = req.query;
  
  res.render('index', {
    error, destination,
  });
});

app.post('/author', function(req, res) {
  const { author, destination } = req.body;
  req.session.author = author;
  res.redirect(destination ? destination : '/bbs');
});

app.get('/bbs', function(req, res) {
  res.render('bbs', {
    author: req.session.author,
    contensts: contentsStore.getAll(),
  });
});

app.get('/bbs/:idx', function(req, res) {
  res.render('detail', {
    content: contentsStore.getOne(req.params.idx),
  });
});

app.get('/write', function(req, res) {
  const author = req.session.author;
  
  if(!author) {
    res.redirect('/?error=YouNeedToSignAuthorToWrite&destination=/bbs');
    return;
  }
  
  res.render('write', {
    formNames: ['title', 'text'],
  });
});

app.post('/write', function(req, res) {
  const author = req.session.author;
  
  if(!author) {
    res.redirect('/?error=YouNeedToSignAuthorToWrite&destination=/bbs');
  }

  const {title, text} = req.body;
  contentsStore.add(title, text, author);

  res.redirect('/bbs');
});

app.post('/write/comments', function(req, res){
  const author = req.session.author || 'annonimous';

  const {text, contentIdx} = req.body; 
  contentsStore.addComment(contentIdx, text, author);
  res.redirect(`/bbs/${contentIdx}`);
})

app.listen(5555, () => {
  console.log(`${process.env.NODE_ENV} :: listen port :: ${5555}`)
  console.log('sessionOpt :: ', sessionOpt)
});