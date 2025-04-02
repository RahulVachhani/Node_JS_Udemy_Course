import User from "../../models/user.js"

export const getLogin = (req, res, next) => {
    // console.log(req.get('Cookie'));
    // const isLoggedIn = req.get('Cookie').split('=')[1]
    // console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
}

export const postLogin = (req, res, next) => {
    // req.isLoggedIn = true;
    // res.setHeader('Set-Cookie', 'loggedIn=true')
    User.findById('67e27df442262f1d0131fb7c')
    .then(user => {
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if(!err){
                res.redirect('/')
            }
        })
    })
    
}

export const postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/login')
    })
}


export default {getLogin, postLogin, postLogout}