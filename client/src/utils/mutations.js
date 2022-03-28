import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: savedBook!) {
    saveBook(input: $input) {
      _id
      bookCount
      email
      password
      savedBooks {
        bookId
        authors
        title
        description
        image
        link
      }
      username
    }
  }
`;

export const SAVE_BOOK_LONG = gql`
mutation saveBookLong($bookId: String!, $authors: [String], $title: String!, $description: String, $image: String) {
  saveBookLong(bookId: $bookId , authors: $authors , title: $title, description: $description, image: $image ) {
    _id
    bookCount
    email
    savedBooks {
      title
      bookId
    }
    username
  }
}
`;