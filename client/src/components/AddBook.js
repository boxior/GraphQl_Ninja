import React, {Component} from "react";
import {array, bool, func, object, string} from "prop-types";
import {compose, graphql} from "react-apollo";
import {addBookMutation, getAuthorsQuery, getBooksQuery} from "../queries/queries";

//styled


class AddBook extends Component {

    state = {
        name: "",
        genre: "",
        authorId: ""
    };

    onChangeProperty = e => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    };

    onSubmit = e => {
        const {addBookMutation} = this.props;
        const {name, genre, authorId} = this.state;

        e.preventDefault();
        console.log(this.state);
        addBookMutation({
            variables: {
                name,
                genre,
                authorId: authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        });
    };

    displayAuthor() {
        const {getAuthorsQuery} = this.props;

        if (getAuthorsQuery.loading) {
            return (<option value="">Loading...</option>)
        } else {
            return (
                getAuthorsQuery.authors.map(author => (
                    <option value={author.id} key={author.id}>{author.name}</option>
                ))
            )
        }
    };


    render() {
        const {onChangeProperty, onSubmit} = this;

        return (
            <form action="" id="add-book" onSubmit={onSubmit}>
                <div className="field">
                    <label>Book name:</label>
                    <input name={`name`} type="text" onChange={onChangeProperty}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input name={`genre`} type="text" onChange={onChangeProperty}/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" id="" onChange={onChangeProperty}>
                        <option value="">Select Author</option>
                        {this.displayAuthor()}
                    </select>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);