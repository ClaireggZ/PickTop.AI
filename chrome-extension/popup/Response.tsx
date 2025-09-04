import { Paper, Text } from '@mantine/core';

function Response({ response, transitionStyle }) {
  if (response.type === 'find') {
    const explanation = (() => {
      if (!response.response.explanation) {
        return 'We don\'t have anything for you! Or an error occurred.'
      }
      return response.response.explanation;
    })();

    return (
      <Paper
        shadow="xs"
        p="md"
        style={{ ...transitionStyle, zIndex: 1 }}
      >
        <Text>{explanation}</Text>
      </Paper>
    );
  }

  // This is currently the same as above, but when we display more than just the
  // explanation it will be different (between discovery and validation)
  const explanation = (() => {
    if (!response.response.explanation) {
      return 'We don\'t have anything for you! Or an error occurred.'
    }
    return response.response.explanation;
  })();

  return (
    <Paper
      shadow="xs"
      p="md"
      style={{ ...transitionStyle, zIndex: 1 }}
    >
      <Text>{explanation}</Text>
    </Paper>
  );
}

export default Response;
