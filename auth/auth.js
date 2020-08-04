
let auth = ((req, res, next) => {

    //if the session exists, then got the next function in chain
    if(req.session.email) {

        next();
    }
    else {
        res.redirect('/login');
    }
})

module.exports = auth;