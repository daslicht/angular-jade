module.exports = function(app) {

  var config = {};
      config.watchDir = './';
  livereload(app, config)


  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'blade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);

  app.use(require('stylus').middleware(__dirname + '/public'));


  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.redirect('/')
      //res.render('404', { url: res.url });
      return;
    }


    // respond with json
    if (res.accepts('json')) {
       res.redirect('/')
      //res.send({ error: 'Not found' });
      return;
    }

    // default to plain-text. send()
     res.redirect('/')
    res.type('txt').send('Not found');
  });

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }

}