import React from 'react'

const  UserContext = React.createContext('Default User Context Value');

const UserProvider = UserContext.Provider;
const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer }
