const Marksheet = require('../../models/event');
const User = require('../../models/user')
const {dateToString} = require('../../helpers/date');
const { bookings } = require('.');

const user = async userId => {
    try {
        const user = await User.findById(userId)

        return {
            ...user._doc,
            _id: user.id,
            createdMarksheet: events.bind(this, user._doc.createdMarksheet)

        };
    } catch (err) {
        throw err;
    };
}
const events = async eventIds => {
    try {
        const events = await Marksheet.find({ _id: { $in: eventIds } })
       return events.map(event => {
           return transformEvent(event);
        });
        
    } catch (err) {
        throw err;
    }
};
const singleEvent = async eventId => {
    try {
        const event = await Marksheet.findById(eventId);
        return {
            ...event._doc,
            _id: event.id,
            creator: user.bind(this, event.creator)
        };

    } catch (err) {
        throw err;
    }
};


const transformEvent =  event => {
    return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator)
    };

};

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
};

};

exports.transformBooking= transformBooking;
exports.transformEvent = transformEvent;

// exports.user =user;
// exports.events = events;
// exports.singleEvent = singleEvent;