import React, { useState } from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { searchGoogleBooks } from '../utils/API';

const SearchBookForm = ({ onSearchBook }) => {
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      onSearchBook(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Row>
        <Col xs={12} md={8}>
          <Form.Control
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            size="lg"
            placeholder="Search for a book"
          />
        </Col>
        <Col xs={12} md={4}>
          <Button type="submit" variant="success" size="lg">
            Submit Search
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default SearchBookForm;
