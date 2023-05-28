import { useAppDispatch } from '../store/hooks';
import { setDocs } from '../store/slices/docs';

export type DocsHook = {
  toggleDocs: () => void;
};

const useDocs = (): DocsHook => {
  const dispatch = useAppDispatch();
  const toggleDocs = (): void => {
    dispatch(setDocs({ isDocs: true }));
  };

  return { toggleDocs };
};

export default useDocs;
