import React from "react";
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient } from 'apollo-clientgit ini';
import book from "../reducers/book";


export const client = new ApolloClient({
    uri: `http://localhost:4000/graphql`
});
export const store = createStore(
    combineReducers({
        book: book(),
        apollo: client.reducer(),
    }),
    {}, // initial state
    compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
);

