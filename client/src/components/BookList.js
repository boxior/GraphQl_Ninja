import React, {Component} from "react";
import {array, bool, func, object, string} from "prop-types";
import {compose, graphql} from "react-apollo";
import {getBooksQuery} from "../queries/queries";
import BookDetails from "./BookDetails"

//styled

class BookList extends Component {

    static propTypes = {};

    static defaultProps = {};

    state = {
        selected: null
    }

    onClickBook = (bookId) => (e) => {
        this.setState({
            selected: bookId
        });
    };

    displayBooks = () => {
        const {getBooksQuery} = this.props;
        const {onClickBook} = this;

        if (getBooksQuery.loading) {
            return <div>Loading books...</div>
        } else {
            return getBooksQuery.books.map(book =>
                <li
                    key={book.id}
                    onClick={onClickBook(book.id)}
                >{book.name}
                </li>)
        }
        ;
    }

    render() {
        return (
            <div>
                <ul id={`book-list`}>
                    {this.displayBooks()}
                </ul>
                <BookDetails
                    bookId={this.state.selected}
                />
            </div>
        );
    };
};

export default compose(
    graphql(getBooksQuery, {name: "getBooksQuery"})
)(BookList);