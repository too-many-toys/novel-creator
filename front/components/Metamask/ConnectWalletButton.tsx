'use client';

import { config } from '@/app/config';
import { Button, Group } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useConnect, useAccount } from 'wagmi';

export const ConnectWalletButton = () => {
  const { connectors, connect } = useConnect();
  const [domLoaded, setDomLoaded] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  async function login() {
    axios
      .post(
        `${config.BASE_URL}/user/login`,
        { walletAddress: address },
        { headers: { 'Content-Type': 'application/json', Accept: '*/*' } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log('로그인 성공');
          return;
        }
        if (res.status === 201) {
          console.log('회원가입');
          return;
        }

        console.error('로그인 실패', res);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <>
      {domLoaded && (
        <Group>
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                login();
              }}
            >
              메타마스크 연결
            </Button>
          ))}
        </Group>
      )}
    </>
  );
};
