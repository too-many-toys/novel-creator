import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center">
      <Button onClick={() => setColorScheme('light')}>Light Mode</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark Mode</Button>
    </Group>
  );
}
