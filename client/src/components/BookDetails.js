import React, {Component} from "react";
import styled from "styled-components";
import {object, array, string, bool, func} from "prop-types";
import {graphql} from "react-apollo"
import {getBookQuery} from "../queries/queries";

//styled

const BookDetailsWrap = styled.div`
  
`;
class BookDetails extends Component {

    static propTypes = {};

    static defaultProps = {};

    displayBookDetails = () => {
        const {book} = this.props.data;

        if(book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className={`other-name`}>
                        {book.author.books.map(book => (
                            <li key={book.id}>
                                {book.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>No selected book...</div>
            )
        }
    };

    render() {
        console.log(this.props);
        return (
            <BookDetailsWrap id={`book-details`}>
                {this.displayBookDetails()}
            </BookDetailsWrap>
        );
    };
};

export default graphql(getBookQuery, {
    options: props => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }

})(BookDetails)