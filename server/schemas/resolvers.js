const { User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {

    Query: {

        me: async () => {
            return User.find().populate("savedBooks");
        }

    },

    Mutation: {

        login: async (parent, { inputEmail, inputPassword }) => {

            //Scan DB for input email
            const user = await User.findOne({ email: inputEmail });

            //If input email not in DB, throw error
            if (!user) throw AuthenticationError;

            //If input email is in DB... compare input against DB password, on fail:
            if (!await user.isCorrectPassword(inputPassword)) throw AuthenticationError;

            //On success:
            const token = signToken(user);

            return { token, user };

        },

        addUser: async (parent, { username, email, password }) => {

            const user = await User.create({ username, email, password });
            const token = signToken(newUser);

            return { token, user }

        },

        saveBook: async (parent, { body }, contextValue) => {

            console.log(contextValue);

            //CHANGE USERNAME TO JWT USERNAME
            // const user = await User.findOneAndUpdate(
            //     { username: contextValue.user._id },
            //     { $addToSet: { savedBooks: book } },
            //     {
            //         new: true,
            //     }
            // );

            if (contextValue.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: contextValue.user._id },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );
            }
            throw AuthenticationError;
        },

        removeBook: async (parent, { bookId }, contextValue) => {

            const updatedUser = await User.findOneAndUpdate(
                { _id: contextValue.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw AuthenticationError;
            }

        },

    }

}

module.exports = resolvers;