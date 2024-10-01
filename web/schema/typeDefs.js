const typeDefs = `

type Chat {
  id: String
  name: String
  lastMessage: String
  isNewMessage: Boolean
  messages: [Message]
  members: [User]
}

type User {
  id: String
  email: String
  nickname: String
}

type Message {
  id: String
  message: String
  userId: String
  chatId: String
  user: User
}

type Contact {
id: String
name: String
user: User
}


type GetChatsByUserResponse{
  success: Boolean
  errors: ErrorInfo
  chats: [Chat]
}

type GetContactsByUserResponse{
  success: Boolean
  errors: ErrorInfo
  contacts: [Contact]
}

input EditContactInput {
  id: String
  name: String
  contactOwnerId: String
}


input UserInput {
  id: String
  email: String
  nickname: String
}

type ContactResponse {
  success: Boolean
  errors: ErrorInfo
  contact: Contact  
}


type DeleteContactResponse {
  success: Boolean
  errors: ErrorInfo
}

type GetSearchEntitiesResponse {
  success: Boolean
  errors: ErrorInfo
  chats: [Chat]
  users: [User]
  messages: [Message]
}

type ErrorInfo{
  code:String
  message:String
}

type Query {
    getChatsByUser(id: String!): GetChatsByUserResponse  
    getContactsByUser(id: String!):GetContactsByUserResponse
    getContactsToAddInChat(userId: String!, chatId: String!): GetContactsByUserResponse
    getSearchEntities(input: String!, userId: String!): GetSearchEntitiesResponse
}

type Mutation {
    editContact(contact: EditContactInput!): ContactResponse
    deleteContact(contactId: String!): DeleteContactResponse
    addContact(contact: UserInput, user: UserInput): ContactResponse
}
`

module.exports = {
	typeDefs
}
