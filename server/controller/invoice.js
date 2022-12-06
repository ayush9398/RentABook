const Invoice = require('../models').Invoice;
const Book = require('../models').Book;
const User = require('../models').User;
const userAuthFun = require('../controller/user').main;

module.exports = {

    async getAllInvoicesOfUser(req, res) {
        try {
            const userAuth = await userAuthFun(req,res);

            if (userAuth) {
                const invoiceCollection = await Invoice.find({
                    userId: userAuth.id
                })

                res.status(201).send(invoiceCollection);
            }
            else {
                res.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },
    async getAllInvoicesOfBook(req, res) {
        try {
            const user = await userAuthFun(req,res);
            const bookCollection = await Book.find({
                id: req.params.bookId
            });

            if (bookCollection) {
                const invoiceCollection = await Invoice.find({
                    bookId: req.params.bookId
                })

                res.status(201).send(invoiceCollection);
            }
            else {
                re.status(404).send("Book Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },

    async createInvoice(req, res) {

        try {
            const user = await userAuthFun(req,res);
            const invoices = await Invoice.find({
                userId: user.id,
                dueCleared: false
            })

            if(invoices.length){
                
                res.status(403).send("Please clear the remaining due in order to rent other books!")
            }

            const { body: { bookId, dueDate, dueCleared, penaltyDays, dueClearedOn } } = req;
            const invoice = await Invoice.create({
                bookId,
                userId: user.id,
                dueDate: dueDate? new Date(dueDate): null,
                dueCleared,
                penaltyDays,
                dueClearedOn: dueClearedOn? new Date(dueClearedOn): null
            });
            res.status(201).send(invoice)
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },

    async update(req, res) {
        try {
            const user = await userAuthFun(req,res);
            const invoiceCollection = await Invoice.find({
                id: req.params.invoiceId
            });

            if (invoiceCollection) {
                const { body: { bookId, userId, dueDate, dueCleared, penaltyDays, dueClearedOn } } = req;
                const updatedInvoice = await invoiceCollection.update({
                    bookId,
                    userId,
                    dueDate: new Date(dueDate),
                    dueCleared,
                    penaltyDays,
                    dueClearedOn: new Date(dueClearedOn)
                })

                res.status(201).send(updatedInvoice);
            }
            else {
                res.status(404).send("Invoice Not Found");
            }

        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    }
}