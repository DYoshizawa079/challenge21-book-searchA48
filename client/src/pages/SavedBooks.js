import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  
  //const { data: userDataB } = useQuery(GET_ME);
  //console.log("userDataB - 1: ", userDataB);

  const { data: userDataB } = useQuery(GET_ME);
  console.log("userDataB: ", userDataB);
  /* const fetchUserData = async () => {
    const { data: userDataB } = await useQuery(GET_ME);
    console.log("userDataB: ", userDataB);
    return userDataB;
  }
  let userDataC = fetchUserData; */
  
  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;
  console.log("userDataLength: ",userDataLength);

  //setUserData(userDataB);

  useEffect((userDataC) => {
    const getUserData = async () => {

      console.log("getUserData fires");
      console.log("userDataC: ", userDataC);

      try {
        console.log("getUserData's TRY statement fires");
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        //console.log("token: ", token);

        if (!token) {
          return false;
        }

        //const response = await getMe(token);
        //const { data: userDataB } = useQuery(GET_ME);
        //console.log("userDataB - 2: ", userDataB);
        const response = userDataC;
        

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        //const user = userDataB;
        
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  /* const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  }; */

  // if data isn't here yet, say so
  if (!userDataB) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userDataB.me.savedBooks.length
            ? `Viewing ${userDataB.me.savedBooks.length} saved ${userDataB.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userDataB.me.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' /* onClick={() => handleDeleteBook(book.bookId)} */>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
