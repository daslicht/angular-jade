
/*
 * GET users listing.
 */

exports.list = function(req, res){
    console.log('XHR?: ',req.xhr)
    if(req.xhr) {
        res.render('user.blade', {title: 'USER XHR' });
    }else{
        res.render('layout.blade', {title: 'USER', page: 'user.blade' });
    }
};

exports.template = function(req, res){
    console.log('XHR?: ',req.xhr)
    if(req.xhr) {
        //res.json({name:'foo'});
        res.render('template.blade', {title: 'TEMPLATE XHR' });
    }else{
        res.render('layout.blade', {title: 'TEMPLATE', page: 'template.blade' });
    }

};