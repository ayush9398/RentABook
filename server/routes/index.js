const userController = require('../controller').user;
const bookController = require('../controller').book;
const invoiceController = require('../controller').invoice;

module.exports = (app) => {

    app.get('/api',(req,res) => {
        res.status(200).send({
            data : "Welcome Node Sequlize API v1"
        })
    })

    app.get('/api/users',userController.getAllUsers);

    app.get('/api/books',bookController.getAllBooks);

    app.get('/api/bestseller', bookController.getBestSellingBooks);

    app.get('/api/user/invoices',invoiceController.getAllInvoicesOfUser);

    app.get('/api/book/:bookId/invoices',invoiceController.getAllInvoicesOfBook);

    app.post('/api/invoice/create',invoiceController.createInvoice);

    app.post('/api/invoice/update',invoiceController.update);

    app.post('/api/user/signup',userController.signup);

    app.post('/api/user/login',userController.login);

    app.get('/api/user', userController.getUser);

    app.put('/api/user/',userController.update);

    app.post('/api/book/create',bookController.createBook);

    app.get('/api/book/:bookId',bookController.getBook);

    app.put('/api/book/:bookId',bookController.update);

}