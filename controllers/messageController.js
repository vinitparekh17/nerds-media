const User = require('../models/userModel');
const Messages = require('../models/messageModel');
const webhook = require('../utils/webhook');

exports.getMessages = async (req, res, next) => {
    try {
      
        const { from, to } = req.body;

        // remove messages older than 1 day
        const oldMessages = await Messages.find({
            createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        });
        if (oldMessages) {
            oldMessages.forEach(async (message) => {
                await message.remove();
            });
        }

        // $all is a mongoose operator is used to check if the array contains all the values and not just one of them
        // sort is used to sort the messages in ascending order

        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((message) => {
            return {
                fromSelf: message.sender.toString() === from,
                message: message.message.text,
                createdAt: message.createdAt,
            };
        });

        res.json(projectedMessages);
    } catch (error) {
        conaole.log(error);
        webhook(`\`\`\`js\n${error}\`\`\``);
    }
};

exports.addMessage = async (req, res, next) => {
    try {

        const { from, to, message } = req.body;

        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) {
            return res.json({ message: 'Message added successfully.' });
        } else {
            return res.json({
                message: 'Failed to add message to the database',
            });
        }
    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);
        res.status(500).json({
            success: false,
            message: 'Failed to add message to the database',
        });
    }
};

// a route that returns the list of users who has your recent chat
exports.ChatUsers = async (req, res, next) => {
    const { id } = req.body;
    try {
        const findUsers = await Messages.find(
            { users: id },
            { users: 1 },
            { unique: true }
        );

        // return the list by removing the user who has logged in (current user)
        const userList = findUsers.map((user) => {
            return user.users.filter((user) => user !== id);
        });

        // return the unique list of users
        const users = [
            ...new Set(
                userList.map((user) => {
                    return user[0];
                })
            ),
        ];

        // getting the user details from the users collection
        const usersDetails = await User.find({ _id: { $in: users } }).select([
            'userName',
            'profilePic',
            '_id',
        ]);
        res.status(200).json({
            success: true,
            users: usersDetails,
        });
    } catch (error) {
        webhook(`\`\`\`js\n${error}\`\`\``);
        res.status(500).json({
            success: false,
            error,
        });
    }
};
