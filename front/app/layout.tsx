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
import { WagmiProvider, http, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectWalletButton } from '@/components/Metamask/ConnectWalletButton';
import { SessionProvider } from 'next-auth/react';

declare global {
  interface Window {
    Kakao: any;
  }
}

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure(true);

  const config = createConfig({
    chains: [polygonMumbai],
    connectors: [
      // injected(),
      // walletConnect({ projectId: 'NovelCreator' })
    ],
    transports: {
      [polygonMumbai.id]: http(),
    },
  });

  return (
    <html lang="ko">
      <body>
        <MantineProvider theme={theme}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
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
                    <ConnectWalletButton />
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
                  <SessionProvider>{children}</SessionProvider>
                </AppShell.Main>
              </AppShell>
            </QueryClientProvider>
          </WagmiProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
