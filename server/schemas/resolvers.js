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

        }

    },

}

module.exports = resolvers;