import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import { GET_USER } from '../utils/queries';
import { getSavedBookIds } from '../utils/localStorage';
import useDeleteBook from '../hooks/useDeleteBook';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});
  const { loading, data, refetch } = useQuery(GET_USER);
  const { handleDeleteBook } = useDeleteBook(setUserData);

  useEffect(() => {
    const user = data?.user ? data.user : {};
    setUserData(user);
  }, [data]);

  // if the number of saved book ids differs the rendered books refetch
  const refetchIfNeeded = () => {
    const userDataLength = Object.keys(userData).length;
    const savedBooks = getSavedBookIds().length;
    const currentBooks = userDataLength ? userData.savedBooks.length : 0;
    if (savedBooks !== currentBooks) {
      refetch();
    }
  };

  refetchIfNeeded();

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData?.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData?.savedBooks?.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
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
