const { buildSchema } = require('graphql');

module.exports =  buildSchema(`
type Booking {
    _id:ID!
    event:Marksheet!
    user:User!
    createdAt:String!
    updatedAt:String!
}

type Marksheet{
    _id:ID
    rollno:Int
    name:String
    maths:String
    science:String
    english:String
    creator:User!
}

type User {

    _id: ID!
    email:String!
    password:String
    createdMarksheet:[Marksheet!]
}

type AuthData {
    userId:ID!
    token:String!
    tokenExpiration:Int!
}


input MarksheetInput{
   
    rollno:Int
    name:String
    maths:String
    science:String
    english:String

}

input UserInput{
    email:String!
    password:String!
}


type RootQuery{
    
    events:[Marksheet!]!
    bookings:[Booking!]!
    login(email:String!,password:String!):AuthData!
    
   
}
type RootMutation{
    createEvent( marksheetInput: MarksheetInput):Marksheet
    createUser(userInput:UserInput):User
    bookEvent(eventId:ID!):Booking!
    cancelBooking(bookingId: ID!):Marksheet!
    updateEvent(_id:ID!,input:MarksheetInput):Marksheet
    deleteEvent(_id:ID!):Marksheet
}
schema{
    query: RootQuery
    mutation:RootMutation
}
`)
