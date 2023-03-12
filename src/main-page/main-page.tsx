import { ArrowPathIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React from 'react';

import { merge } from '../utils/merge';

import { loadRandomQuote } from './random-quote';

interface Props {
  onNewQuote: (newQuote: string) => void;
}
export const MainPage: React.FC<Props> = (props) => {
  const controller = useController(props);

  return (
    <div
      className={classNames(
        'flex h-full flex-col items-center justify-center gap-8',
      )}
    >
      {controller.state.isLoading && (
        <div>
          <ArrowPathIcon className={classNames('h-6 w-6 animate-spin')} />
        </div>
      )}

      {!controller.state.isLoading && (
        <React.Fragment>
          <div
            className={classNames('max-w-xl text-center font-serif text-2xl')}
          >
            {controller.state.currentQuote}
          </div>

          <div>
            <button
              type="button"
              className={classNames(
                'rounded-full bg-pink-700 px-6 py-3 font-bold text-white hover:bg-pink-600',
              )}
              onClick={(): void => controller.loadNewQuote()}
            >
              Random Quote
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

interface State {
  currentQuote: string;
  isLoading: boolean;
}
interface Controller {
  state: State;

  loadNewQuote: () => void;
}
function useController(props: Props): Controller {
  const [state, setState] = React.useState<State>({
    currentQuote: '',
    isLoading: false,
  });

  React.useEffect(() => {
    void loadNewQuote();
  }, []);

  React.useEffect(() => {
    if (state.currentQuote === '') {
      return;
    }

    props.onNewQuote(state.currentQuote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentQuote]);

  async function loadNewQuote(): Promise<void> {
    setState((state) => merge(state, { isLoading: true }));

    const quote = await loadRandomQuote();

    setState((state) =>
      merge(state, { isLoading: false, currentQuote: quote }),
    );
  }

  return {
    state: state,

    loadNewQuote: (): void => {
      void loadNewQuote();
    },
  };
}
