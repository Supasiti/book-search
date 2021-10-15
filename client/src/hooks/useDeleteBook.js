import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { DELETE_BOOK } from '../utils/mutations';

const useDeleteBook = (onBookDelete) => {
  const [deleteBook] = useMutation(DELETE_BOOK);

  const handleDeleteBook = async (bookId) => {
    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      const { data } = await deleteBook({ variables: { bookId } });
      const updatedUser = data.deleteBook;
      onBookDelete(updatedUser);
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  return { handleDeleteBook };
};

export default useDeleteBook;
