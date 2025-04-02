export const notFoundPage = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: '/404',
    })
}

export const errorPage = (req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Internal Server Error',
        path: '/500',
    })
}