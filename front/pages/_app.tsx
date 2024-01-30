import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AppShell, Burger, Group, MantineProvider, NavLink, Skeleton } from '@mantine/core';
import { theme } from '../theme';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Link from 'next/link';

export default function App({ Component, pageProps }: AppProps) {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Open Novel</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <AppShell
        header={{ height: 50 }}
        navbar={{ width: 200, breakpoint: 'sm', collapsed: { desktop: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} size="sm" />
            <ColorSchemeToggle />
            <span style={{fontWeight: 'bold', color: 'pink', scale: '1.2'}}>Show Your Novel</span>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLink component={Link} href="/" label="Home" />
          <NavLink component={Link} href="/novel/register" label="Register Novel" />
          <NavLink component={Link} href="/novel/write" label="Write Novel" />
          <NavLink component={Link} href="/novel/character" label="Character Relations" />
          <NavLink component={Link} href="/novel/story" label="Story Relations" />
        </AppShell.Navbar>
        <AppShell.Main>
          <Component {...pageProps} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
