
/*
 * GET home page.
 */

exports.index = function(req, res){
    if(req.xhr) {
        res.render('index.blade', {title: 'HOME XHR ' });
        //res.json({name:'foo'});
    }else{
        res.render('layout.blade', {title: 'HOME', page: 'index.blade' });
    }
  
};