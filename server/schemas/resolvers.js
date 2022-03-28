// Import Mongoose models
const { User } = require('../models');

// For handling login autheticatin errors
const { AuthenticationError } = require('apollo-server-express');

// Import the Authentication Token generator function
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findById(context.user._id)
                    .select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            // If user is not found
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            // We got isCorrectPassword() from the User model
            const correctPw = await user.isCorrectPassword(password);
            // If password doesnt match
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
              const userData = User.findByIdAndUpdate(
                context.user._id,
                { $push: { savedBooks: input } },
                { new: true, runValidators: true }
              );
              return userData;
            }
            throw new AuthenticationError("You need to be logged in to save a book");
        },
        saveBookLong: async (parent, { bookId, authors, title, description, image }, context) => {
            if (context.user) {
              let bookData = {
                  "bookId": bookId,
                  "authors": authors,
                  "title": title,
                  "description": description,
                  "image": image
              }
              const userData = User.findByIdAndUpdate(
                context.user._id,
                { $push: { savedBooks: bookData } },
                { new: true, runValidators: true }
              );
              return userData;
            }
            throw new AuthenticationError("You need to be logged in to save a book");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const userData = User.findByIdAndUpdate(
                );
                return userData;
            }
            throw new AuthenticationError("You need to be logged in to remove a book");
        }
    }
}

module.exports = resolvers;