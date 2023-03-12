import { ArrowPathIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React from 'react';

import { loadRandomQuote } from './random-quote';

interface Props {
  onNewQuote: (newQuote: string) => void;
}
export const MainPageWithoutController: React.FC<Props> = (props) => {
  const [currentQuote, setCurrentQuote] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    void loadNewQuote();
  }, []);

  React.useEffect(() => {
    if (currentQuote === '') {
      return;
    }

    props.onNewQuote(currentQuote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuote]);

  async function loadNewQuote(): Promise<void> {
    setIsLoading(true);

    const quote = await loadRandomQuote();

    setIsLoading(false);
    setCurrentQuote(quote);
  }

  return (
    <div
      className={classNames(
        'flex h-full flex-col items-center justify-center gap-8',
      )}
    >
      {isLoading && (
        <div>
          <ArrowPathIcon className={classNames('h-6 w-6 animate-spin')} />
        </div>
      )}

      {!isLoading && (
        <React.Fragment>
          <div
            className={classNames('max-w-xl text-center font-serif text-2xl')}
          >
            {currentQuote}
          </div>

          <div>
            <button
              type="button"
              className={classNames(
                'rounded-full bg-pink-700 px-6 py-3 font-bold text-white hover:bg-pink-600',
              )}
              onClick={(): void => void loadNewQuote()}
            >
              Random Quote
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
