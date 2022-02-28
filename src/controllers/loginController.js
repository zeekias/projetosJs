const flash = require('connect-flash/lib/flash');
const loginModel = require('../models/LoginModel')
exports.index = (req,res)=>{
    res.render('login');
};

exports.register = async function(req, res){
try{
    const Login = new loginModel(req.body); 
    await Login.register();

    if(Login.errors.length > 0){
        req.flash('errors', Login.errors);
        req.session.save(function(){
            return res.redirect('/login');
        });
        return;
    }
    req.flash('success', 'Seu usuário foi criado com sucesso.');
        req.session.save(function(){
            return res.redirect('/login');
        });
}catch(e){
    return res.render('404');
}
    
};