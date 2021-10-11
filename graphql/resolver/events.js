
const Marksheet = require('../../models/event');
const {transformEvent} = require('./merge')
const User = require('../../models/user');



module.exports = {
    events: async () => {
        try {
            const events = await Marksheet.find()

            return events
                .map(event => {
                    return transformEvent(event);
                });
        } catch (err) {
            throw err;
        };
        // return events;

    },
    createEvent: async (args,req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        const event = new Marksheet({
            rollno: args.marksheetInput.rollno,
            name: args.marksheetInput.name,
            maths: +args.marksheetInput.maths,
            science: +args.marksheetInput.science,
            english: +args.marksheetInput.english,
            creator: req.userId
        });

        let createdMarksheet;
        try {
            const result = await event.save();
            createdMarksheet = transformEvent(result);
            const creator = await User.findById(req.userId);

            if (!creator) {
                throw new Error('User not found');
            }
            creator.createdMarksheet.push(event);
            await creator.save();

            return createdMarksheet;

        } catch (err) {
            console.log(err);
            throw err;
        }

        // return event;
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