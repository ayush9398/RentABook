const Invoice = require('../models').Invoice;
const Book = require('../models').Book;
const User = require('../models').User;
const userAuthFun = require('../controller/user').main;

module.exports = {

    async getAllInvoicesOfUser(req, res) {
        try {
            const userAuth = await userAuthFun(req, res);

            if (userAuth) {
                const invoiceCollection = await Invoice.findAll({
                    where:{
                        UserId: userAuth.id
                    }
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
            const user = await userAuthFun(req, res);
            const bookCollection = await Book.find({
                id: req.params.bookId
            });

            if (bookCollection) {
                const invoiceCollection = await Invoice.find({
                    BookId: req.params.bookId
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
            const user = await userAuthFun(req, res);
            const userObj = await User.find({id: user.id})
            console.log({userObj})
            if (userObj.freezed) {

                res.status(403).send("Your account has been freezed due to passing the due date. Please clear your dues to rent a book again!");
                return
            }

            const { body: { bookId, dueDate, dueCleared, penaltyDays, dueClearedOn } } = req;
            const book = await Book.find({ id: bookId });
            if (book) {
                const invoice = await Invoice.create({
                    BookId: bookId,
                    UserId: user.id,
                    dueDate: dueDate ?? new Date(new Date().getTime() + 30 * 3600 * 1000 * 24),
                    dueCleared,
                    penaltyDays,
                    dueClearedOn: dueClearedOn ? new Date(dueClearedOn) : null
                });
                book.update({
                    isRented: true
                })
                res.status(201).send(invoice)
            }

        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },

    async update(req, res) {
        try {
            const user = await userAuthFun(req, res);
            const invoiceCollection = await Invoice.find({
                id: req.params.invoiceId
            });

            if (invoiceCollection) {
                const { body: { bookId, dueDate, dueCleared, penaltyDays, dueClearedOn } } = req;
                const updatedInvoice = await invoiceCollection.update({
                    UserId: user.id,
                    dueDate: dueDate ? new Date(dueDate) : null,
                    dueCleared,
                    penaltyDays,
                    dueClearedOn: dueClearedOn ? new Date(dueClearedOn) : null
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

    },
    async resolveDues(req, res) {
        try {
            const user = await userAuthFun(req, res);
            const invoice = await Invoice.findOne({
               where: {id: await req.params.invoiceId}
            });
            console.log({invoice, req: req.params})
            if (invoice) {
                if(invoice.dueCleared === true){
                    res.status(200).send("Due already cleared!");
                    return;
                }
                const currDate = new Date();
                const Difference_In_Time = currDate.getTime() - invoice.dueDate.getTime();

                const book = await Book.find({ BookId: invoice.BookId })
                const userObj = await User.find({ id: user.id })
                const Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));
                if (book) {
                    const bookRent = book.rent + (Difference_In_Days > 0 ? Difference_In_Days : 0) * 10
                    console.log({ Difference_In_Days, Difference_In_Time })

                    const updatedInvoice = await invoice.update({
                        dueCleared: true,
                        penaltyDays: Difference_In_Days > 0 ? Difference_In_Days : 0,
                        dueClearedOn: currDate,
                        rent: bookRent
                    })
                    await book.update({
                        isRented: false
                    });
                    await userObj.update({
                        freezed: false
                    });
                    res.status(201).send(updatedInvoice);
                }
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