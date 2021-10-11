const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');







module.exports = {




    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email })
            if (existingUser) {
                throw new Error('User Exists already.')
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })

            const result = await user.save();
            return { ...result._doc, password: null, _id: result.id.toString() }
        } catch (err) {
            throw err;
        };
    },

    login: async ({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User Does not exist');
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error('Password is incorrect!');

        }
        const token = jwt.sign({ userId: user.id, email: user.email },
            'somesupersecretkey',
            {

                expiresIn: '1h'
            }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 }
    }
};



  // updateEvent: () => {
    //     return Marksheet
    //         .findOneAndUpdate({ _id }, input, { new: true })
    //         .then(events => {
    //             return events.map(event => {
    //                 return { ...event._doc, _id: event.id };
    //             });
    //         }).catch(err => {
    //             throw err;
    //         });
    // },

    // deleteEvent: () =>{


    //     return events
    //     .findByIdAndRemove( _id )
    //     .then(events => {
    //         return events.map(event => {
    //             return { ...event._doc, _id: event.id };
    //         });
    //     }).catch(err => {
    //         throw err;
    //     });

    // }


    //     const user = new User({
    //         email : args.userInput.email,
    //         password: args.userInput.password
    //         });
    //     return user
    //         .save()
    //        .then(result => {
    //             console.log(result);
    //             return { ...result._doc, _id: result.id };
    //         }).catch(err => {
    //             console.log(err);
    //             throw err;
    //         });

    //     // return event;
    // },