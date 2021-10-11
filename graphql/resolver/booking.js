
const {transformBooking , transformEvent} = require('./merge');
const Booking = require('../../models/booking');
const Marksheet = require('../../models/event');
const User = 





module.exports = {
   
    bookings: async (args,req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });

        } catch (err) {
            throw err;
        };

    },
 

   
    bookEvent: async (args,req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        const fetchedEvent = await Marksheet.findOne({ _id: args.eventId });
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent

        });
        const result = await booking.save();
        return transformBooking(result);
    },
    cancelBooking: async (args,req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event')
            const event = transformEvent(booking.event)
            
            await Booking.deleteOne({ _id: args.bookingId });
            return event;


        } catch (err) {
            throw err;
        }
    }


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
};
