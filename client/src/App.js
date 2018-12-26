import React, {Component} from 'react';
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import {ApolloProvider} from "react-apollo"
import {client, store} from "./store/createStore";

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client} store={store}>
                <div id={`main`}>
                    <h1>Ninja</h1>
                    <BookList

                    />
                    <AddBook/>
                </div>
            </ApolloProvider>

        );
    }
}

export default App;
