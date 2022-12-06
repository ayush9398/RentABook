const Book = require('../models').Book;
const User = require('../models').User;
const userAuthFun = require('../controller/user').main;

module.exports = {
    async getBook(req, res) {
        try {
            const userAuth = await userAuthFun(req, res);
            if (userAuth) {
                const bookCollection = await Book.find({
                    id: req.params.bookId
                });

                res.status(201).send(bookCollection);
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
    async getAllBooks(req, res) {
        try {
            const userAuth = await userAuthFun(req, res);
            if (userAuth) {
                const bookCollection = await Book.findAll();

                res.status(201).send(bookCollection);
            }
            else {
                re.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },

    async getAllAvailableBooks(req, res) {
        try {
            const userAuth = await userAuthFun(req, res);
            if (userAuth) {
                const bookCollection = await Book.find({
                    isRented: false
                });

                res.status(201).send(bookCollection);
            }
            else {
                re.status(404).send("User Not Found")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }

    },

    async getBestSellingBooks(req, res) {
        try {
            const userAuth = await userAuthFun(req, res);
            if (userAuth) {
                const bookCollection = await Book.findAll({
                    attributes: {
                        include: [[Sequelize.fn("COUNT", Sequelize.col("invoice.id")), "invoiceCount"]]
                    },
                    include: [{
                        model: Invoice, attributes: []
                    }]

                });
                console.log(bookCollection);

                res.status(201).send(bookCollection);
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

    async getAllBooksOfUser(req, res) {
        try {
            const userAuth = await userAuthFun(req, res);

            if (userAuth) {
                const bookCollection = await Book.find({
                    userId: userAuth.id
                })

                res.status(201).send(bookCollection);
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

    async createBook(req, res) {

        try {
            const userAuth = await userAuthFun(req, res);
            if (userAuth) {
                const { body: { name, description, author, isRented, category, rent } } = req;
                const book = await Book.create({
                    name,
                    description,
                    author,
                    isRented,
                    category,
                    rent
                });
                res.status(201).send(book)
            }

        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },

    async update(req, res) {
        try {
            const bookCollection = await Book.find({
                id: req.params.bookId
            });

            if (bookCollection) {
                const { body: { name, description, author, isRented, category, rent } } = req;
                const updatedBook = await bookCollection.update({
                    name,
                    description,
                    author,
                    isRented,
                    category,
                    rent
                })

                res.status(201).send(updatedBook);
            }
            else {
                res.status(404).send("Book Not Found");
            }

        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }

    }
}