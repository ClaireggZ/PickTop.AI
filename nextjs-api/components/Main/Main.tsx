import { SegmentedControl, Stack, Textarea } from "@mantine/core";
import { useState } from "react";

function Main() {
  const [tabState, setTabState] = useState('discovery');
  const placeholder = (() => {
    if (tabState === 'discovery') {
      return 'I want my future laptop to...';
    }
    return 'I want to check that my current laptop can...';
  })();

  return (
    <Stack
      h="calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px) - (var(--app-shell-padding, 0px) * 2))"
      bg="var(--mantine-color-body)"
      align="center"
      justify="flex-end"
      gap="md"
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
        miw={600}
      />
    </Stack>
  );
}

export default Main;
