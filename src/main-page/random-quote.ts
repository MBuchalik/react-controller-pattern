const QUOTES = [
  "Change will not come if we wait for some other person or some other time. We are the ones we've been waiting for. We are the change that we seek.",

  'Three things cannot be long hidden: the sun, the moon, and the truth.',

  'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.',

  "If you're walking down the right path and you're willing to keep walking, eventually you'll make progress.",

  'Better than a thousand hollow words, is one word that brings peace.',
];

/**
 * Load a random quote.
 *
 * This function is meant to simulate a remote API.
 */
export async function loadRandomQuote(): Promise<string> {
  await sleep();

  const randomIndex = Math.floor(Math.random() * QUOTES.length);

  const theQuote = QUOTES[randomIndex];

  if (theQuote === undefined) {
    console.error(
      `Did not find quote with index "${randomIndex}". This should not happen.`,
    );
    return '';
  }

  return theQuote;
}

const TIMEOUT_MILLIS = 1000;
/**
 * Wait for {@link TIMEOUT_MILLIS} and then resolve the Promise.
 */
function sleep(): Promise<void> {
  const result = new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, TIMEOUT_MILLIS);
  });

  return result;
}
