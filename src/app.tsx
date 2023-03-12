import React from 'react';

import { MainPage, MainPageWithoutController } from './main-page';

enum Component {
  WithController,
  WithoutController,
}

// Here, you can define which component to use - either the one that uses the Controller Pattern, or the one that doesn't.
const COMPONENT_TO_SHOW = Component.WithController as Component;

export const App: React.FC = () => {
  return (
    <React.Fragment>
      {COMPONENT_TO_SHOW === Component.WithController && (
        <MainPage onNewQuote={(newQuote): void => console.log(newQuote)} />
      )}
      {COMPONENT_TO_SHOW === Component.WithoutController && (
        <MainPageWithoutController
          onNewQuote={(newQuote): void => console.log(newQuote)}
        />
      )}
    </React.Fragment>
  );
};
