'use client';
import '@mantine/core/styles.css';
import React from 'react';
import Head from 'next/head';
import {
  AppShell,
  Burger,
  ColorSchemeScript,
  Group,
  MantineProvider,
  NavLink,
} from '@mantine/core';
import { theme } from '../theme';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <html lang="ko">
      <body>
        <MantineProvider theme={theme}>
          <Head>
            <title>Open Novel</title>
            <ColorSchemeScript />
            <link rel="shortcut icon" href="/favicon.svg" />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
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
                <span style={{ fontWeight: 'bold', color: 'pink', scale: '1.2' }}>
                  Show Your Novel
                </span>
              </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
              <NavLink component={Link} href="/" label="Home" />
              <NavLink component={Link} href="/novel/register" label="Register Novel" />
              <NavLink component={Link} href="/novel/write" label="Write Novel" />
              <NavLink component={Link} href="/novel/character" label="Character Relations" />
              <NavLink component={Link} href="/novel/story" label="Story Relations" />
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}