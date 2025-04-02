import User from "../../models/user.js"
import bcrypt from "bcryptjs"

export const getLogin = (req, res, next) => {

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: req.flash('error'),
        successMessage: req.flash('success')        
    })
}

export const getSignUp = (req, res, next) => {

    res.render('auth/signup', {
        path: '/sign-up',
        pageTitle: 'Sign Up',
        errorMessage: req.flash('error')
    })
}


export const postLogin = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            req.flash('error', 'Invalid email or password')
            return res.redirect('/login')
        }
        const doMatch = await bcrypt.compare(password, user.password)
        if(!doMatch){
           req.flash('error', 'Invalid email or password')
           return res.redirect('/login')
        }
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if (!err) {
                req.flash('success', 'Login successful! Welcome back.');
                res.redirect('/')
            }
        })

    }
    catch (err) {
        console.log('Error in post login', err);
    }
}

export const postSignUp = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            req.flash('error', 'Email is already exists')
            return res.redirect('/signup')
        }
        if (password !== confirmPassword){
            req.flash('error', 'Password and confirm password not matched')
            return res.redirect('/signup')
        }
        const newUser = new User({
            email: email,
            password: await bcrypt.hash(password, 12),
            cart: { items: [] }
        })
        await newUser.save()
        req.flash('success', 'Registration successful! Please log in.');
        res.redirect('/login')

    } catch (error) {
        console.log('error in post sign up', error)
    }
}

export const postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/login')
    })
}


export default { getLogin, postLogin, postLogout, getSignUp, postSignUp }