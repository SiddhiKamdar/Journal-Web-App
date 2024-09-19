const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Entry = require("../models/entry");

router.get("/", (req, res, next) => {
    Entry.find()
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                entries: docs.map(doc => {
                    return {
                        title: doc.title,
                        entry: doc.entry,
                        date: doc.date,
                        _id: doc._id,
                        userId: doc.userId,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/entries/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

router.post("/", (req, res, next) => {
    const entry = new Entry({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        title: req.body.title,
        entry: req.body.entry,
        date: req.body.date, 
    });
    entry
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Entry created successfully",
                createdEntry: {
                    title: result.title,
                    entry: result.entry,
                    date: result.date,
                    _id: result._id,
                    userId: result.userId,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/entries/' + result._id
                    }
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});


router.get("/:userId", (req, res, next) => {
    const { userId } = req.params;
    Entry.find({ userId })
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                entries: docs.map(doc => ({
                    title: doc.title,
                    entry: doc.entry,
                    date: doc.date,
                    _id: doc._id,
                    userId: doc.userId,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/entries/${doc._id}`
                    }
                }))
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


router.get("/:userId/:entryId", (req, res, next) => {
    const { userId, entryId } = req.params;
    Entry.findOne({ _id: entryId, userId })
        .exec()
        .then((doc) => {
            if (doc) {
                res.status(200).json({
                    entry: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ENTRY',
                        url: `http://localhost:3000/entries/${userId}`
                    }
                });
            } else {
                res.status(404).json({ message: "No valid entry found for the provided ID" });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch("/:entryId", (req, res, next) => {
    const id = req.params.entryId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Entry.updateOne(
        { _id: id },
        {
            $set: updateOps
        })
        .exec()
        .then(
            result => {
                res.status(200).json({
                    message: 'Entry updated',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/entries/' + id
                    }
                });
            }
        )
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});


router.delete("/:entryId", (req, res, next) => {
    const id = req.params.entryId;
    Entry.deleteOne({ _id: id })
        .exec()
        .then((result) => {
            res.status(200).json(
                {
                    message: 'Entry deleted',
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/entries',
                        body: { userId: 'String', title: 'String', entry: 'String' }
                    }
                }
            );
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
});

module.exports = router;