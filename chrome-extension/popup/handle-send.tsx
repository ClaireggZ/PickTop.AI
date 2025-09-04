import wretch from 'wretch';

const BASE_URL = "http://localhost:3000";

function handleSend(tabState: string, userInput: string, openLoadingOverlay, closeLoadingOverlay, setResponse) {
  if (tabState === 'discovery') {
    handleFind(userInput, openLoadingOverlay, closeLoadingOverlay, setResponse);
  } else {
    handleCheck(userInput, openLoadingOverlay, closeLoadingOverlay, setResponse);
  }
}

async function handleFind(userInput: string, openLoadingOverlay, closeLoadingOverlay, setResponse) {
  openLoadingOverlay();

  const responseJson = await wretch(`${BASE_URL}/api/find`)
    .post({ userInput })
    .res((response) => response.json());

  closeLoadingOverlay();

  setResponse({ type: 'find', response: responseJson });
}

async function handleCheck(userInput: string, openLoadingOverlay, closeLoadingOverlay, setResponse) {
  openLoadingOverlay();

  const responseJson = await wretch(`${BASE_URL}/api/check`)
    .post({ userInput })
    .res((response) => response.json());

  closeLoadingOverlay();

  setResponse({ type: 'check', response: responseJson });
}

export default handleSend;
