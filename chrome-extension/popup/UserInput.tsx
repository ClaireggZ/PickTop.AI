import { useState } from 'react';
import { SegmentedControl, Stack, Textarea } from '@mantine/core';

import handleSend from './handle-send';

function handleKeyDown(event, tabState, userInput, setUserInput, enableLoadingState, disableLoadingState, setResponse) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    if (userInput.trim() === '') return; // Ignore empty
    handleSend(tabState, userInput, enableLoadingState, disableLoadingState, setResponse);
    setUserInput('');
  }
}

function UserInput({ enableLoadingState, disableLoadingState, setResponse, hasBottomPadding }) {
  const [tabState, setTabState] = useState('validation');
  const [userInput, setUserInput] = useState('');

  const placeholder = (() => {
    if (tabState === 'discovery') {
      return 'I want my future laptop to...';
    }
    return 'I want to check that my current laptop can...';
  })();

  return (
    <Stack
      gap="md"
      align="center"
      pos="relative"
      bottom={5}
      pb={hasBottomPadding ? "sm" : undefined}
    >
      <SegmentedControl
        value={tabState}
        onChange={setTabState}
        size="md"
        data={[
          { label: 'Discovery', value: 'discovery' },
          { label: 'Validation', value: 'validation' },
        ]}
      />
      <Textarea
        size="lg"
        placeholder={placeholder}
        miw={300}
        autosize
        minRows={2}
        value={userInput}
        onChange={(event) => setUserInput(event.currentTarget.value)}
        onKeyDown={(event) => handleKeyDown(event, tabState, userInput, setUserInput, enableLoadingState, disableLoadingState, setResponse)}
      />
    </Stack>
  )
}

export default UserInput;
