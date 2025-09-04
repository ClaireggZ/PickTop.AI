import { useState } from 'react';
import { Image, LoadingOverlay, Stack, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import picktopImage from 'data-base64:~assets/picktop.png';
import UserInput from './UserInput';
import Response from './Response';

function Main() {
  const [isLoading, { open, close }] = useDisclosure(false);
  const [response, setResponse] = useState(null);

  return (
    <Stack
      h="100%"
      bg="var(--mantine-color-body)"
      align="center"
      justify="space-between"
      pos="relative"
    >
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

      <Image
        h={50}
        src={picktopImage}
        w="auto"
        fit="contain"
      />

      <Transition
        mounted={!!response}
        transition="fade-up"
        duration={400}
        timingFunction="ease"
      >
        {(transitionStyle) => <Response response={response} transitionStyle={transitionStyle} />}
      </Transition>

      <UserInput enableLoadingState={open} disableLoadingState={close} setResponse={setResponse} hasBottomPadding={!!response} />

      <div></div>
    </Stack>
  );
}

export default Main;
