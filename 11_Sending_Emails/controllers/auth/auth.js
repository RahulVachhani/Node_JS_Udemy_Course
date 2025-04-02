import User from "../../models/user.js"
import bcrypt from "bcryptjs"
import crypto from 'crypto'
import {transporter, mailOptions, mailOptionsForReserPassword} from "../../utils/mail.js"

// const mailOptions = {
//     from: "django.learning.testing@gmail.com",
//     to: "rahul.vachhani@openxcell.com",
//     subject: "Hello from Node.js",
//     text: "This is a test email sent from a Node.js app!",
// };

// Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log("Error:", error);
//     } else {
//         console.log("Email sent: " + info.response);
//     }
// });

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
        if (!doMatch) {
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
        if (password !== confirmPassword) {
            req.flash('error', 'Password and confirm password not matched')
            return res.redirect('/signup')
        }
        const newUser = new User({
            email: email,
            password: await bcrypt.hash(password, 12),
            cart: { items: [] }
        })
        await newUser.save()

        // await transporter.sendMail(mailOptions(email));

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

export const getReset = (req, res, next) => {
    res.render('auth/reset',{
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: req.flash('error'),
        successMessage: req.flash('success')
    })
}

export const postReset = async(req, res, next) => {
    const {email} = req.body
    console.log(email);
    
    try {
        const buffer = await crypto.randomBytes(32)
               
        const token = buffer.toString('hex') 
       
        const user = await User.findOne({email: email})
        if(!user){
            req.flash('error', 'Email is not registered')
            return res.redirect('/reset')
        }
        user.resetToken = token
        user.resetTokenExp = Date.now() + 3600000;
        await user.save()
        await transporter.sendMail(mailOptionsForReserPassword(email, token))
        req.flash('success', 'Reset link is sent to email')
        return res.redirect('/reset')        
               
    } catch (err) {
        console.log(`Error in post reset mail`, err)
        req.flash('error', 'Internal error')
        return res.redirect('/reset')
    }
}


export const getNewPassword = async(req, res, next) => {
    const token = req.params.token
    const user = await User.findOne({resetToken: token, resetTokenExp: {$gt :Date.now()}})
    if(!user){
        req.flash('error', 'Token in invalid or expired')
        return res.redirect('/reset')
    }
    res.render('auth/new-password',{
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: req.flash('error'),
        successMessage: req.flash('success'),
        userId: user._id,
        passowordToken: token
    })
}


export const postNewPassword = async(req, res, next) => {
    const newPassword = req.body.password
    const userId = req.body.user
    const passowordToken = req.body.passowordToken
   try{
    const user = await User.findOne({
        _id: userId, 
        resetToken: passowordToken,
        resetTokenExp: {
            $gt: Date.now()
        } 
    })
    if(!user){
        req.flash('error', 'user does not exists')
        return res.redirect(`/reset`)
    }
    user.password = await bcrypt.hash(newPassword, 12)
    user.resetToken = undefined
    user.resetTokenExp = undefined
    await user.save()

    req.flash('success', 'Successfully Password Reset.Please Login')
    return res.redirect('/login')
}catch(err){
    console.log('Error in post new password', err);
    return res.redirect(`/reset`)
}
}


export default { getLogin, postLogin, postLogout, getSignUp, postSignUp, getReset, postReset, getNewPassword, postNewPassword }