import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const useSaveBook = (onBookSaved) => {
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSaveBook = async (bookToSave) => {
    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      await saveBook({ variables: { ...bookToSave } });
      // if book successfully saves to user's account, call onBookSaved()
      onBookSaved(bookToSave);
    } catch (err) {
      console.error(err);
    }
  };
  return { handleSaveBook };
};

export default useSaveBook;
