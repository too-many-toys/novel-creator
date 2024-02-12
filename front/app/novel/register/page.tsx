'use client';

import {
  Center,
  SimpleGrid,
  Text,
  TextInput,
  TagsInput,
  FileInput,
  Space,
  Select,
  Button,
  Blockquote,
  Group,
  Dialog,
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { config } from '../../config';
import { useDisclosure } from '@mantine/hooks';
import { useAccount, useSignMessage } from 'wagmi';

type CreateNovel = {
  title: string;
  description: string;
  tags: string[];
  genres: string | null;
};

function Register() {
  const { address } = useAccount();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [genres, setGenres] = useState<string | null>('');

  const [successDialogOpen, successHandler] = useDisclosure(false);
  const [errorDialogOpen, errorHandler] = useDisclosure(false);
  const [loginDialogOpen, loginHandler] = useDisclosure(false);
  const [notSupportedDialogOpen, notSupportedHandler] = useDisclosure(false);

  const { data: signMessageData, error, signMessage, variables } = useSignMessage();

  const icon = <IconInfoCircle />;

  useEffect(() => {
    (async () => {
      if (variables?.message && signMessageData) {
        console.log(signMessageData);
      }
    })();
  }, [signMessageData, variables?.message]);

  async function registerNovel(data: CreateNovel) {
    if (!address) {
      loginHandler.open();
      return;
    }

    axios
      .post(
        `${config.BASE_URL}/novel/register`,
        {
          title: data.title,
          description: data.description,
          walletAddress: address,
          tags: data.tags,
          genres: data.genres,
          // imageUrl: 'https://via.placeholder.com/150',
        },
        {
          headers: { 'Content-Type': 'application/json', Accept: '*/*' },
        }
      )
      .then(() => {
        successHandler.open();
      })
      .catch((error) => {
        console.error(error);
        errorHandler.open();
      });
  }

  async function registerNovelWithBlockchain(data: CreateNovel) {
    notSupportedHandler.open();
    return;
    if (!address) {
      loginHandler.open();
      return;
    }

    signMessage({ message: 'Register Your Novel To Polygon' });
  }

  return (
    <>
      <Center>
        <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
          <Center>
            <Text>소설 등록</Text>
          </Center>
          <TextInput
            variant="filled"
            radius="md"
            size="md"
            label="소설 제목"
            placeholder="제목"
            description="소설 제목은 작품 단위 입니다 (XXX가 귀환했다, X회차라 너무 쉬운 것 같습니다 등)"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
          <Space h="md" />
          <TextInput
            variant="filled"
            radius="md"
            size="md"
            label="소설 설명"
            placeholder="설명"
            description="소설을 간단하게 설명해주세요!"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <Space h="md" />
          <TagsInput
            label="소설의 태그를 설정할 수 있어요"
            size="md"
            placeholder="여러 태그"
            data={tags}
            value={tags}
            onChange={setTags}
          />
          <Space h="md" />
          <FileInput
            size="md"
            label="소설 이미지"
            description="추후 AI 생성 이미지로 간단하게 이미지를 만들 수 있는 기능이 업데이트 될 예정이에요!"
            placeholder=".png, .jpg, .jpeg"
          />
          <Space h="md" />
          <Select
            label="소설 장르"
            placeholder="무협, 판타지, 로맨스 등"
            size="md"
            data={['무협', '판타지', '액션', '드라마', '학원', '로맨스', '추리', 'SF', '기타']}
            value={genres}
            onChange={setGenres}
          />
          <Space h="md" />
          <Blockquote color="red" icon={icon} mt="md">
            주의!
            <br />
            소설을 등록할 때 "블록체인에 올리기"를 선택하면 소설을 등록할 때,
            <br />
            회차를 블록체인에 등록할 때 수수료가 필요합니다.
          </Blockquote>
          <Space h="md" />
          <Center>
            <Group>
              <Button
                variant="filled"
                color="pink"
                onClick={() => {
                  registerNovelWithBlockchain({ title, description, tags, genres });
                }}
              >
                블록체인에 올리기!
              </Button>
              <Button
                variant="filled"
                color="green"
                onClick={() => {
                  registerNovel({ title, description, tags, genres });
                }}
              >
                그냥 올리기!
              </Button>
            </Group>
          </Center>
        </SimpleGrid>
        <Group>
          <Dialog
            opened={successDialogOpen}
            withCloseButton
            onClose={successHandler.close}
            size="lg"
            radius="md"
          >
            <Text size="sm" mb="xs" fw={500}>
              등록이 완료되었습니다!
            </Text>
          </Dialog>
          <Dialog
            opened={errorDialogOpen}
            withCloseButton
            onClose={errorHandler.close}
            size="lg"
            radius="md"
          >
            <Text size="sm" mb="xs" fw={500}>
              에러가 발생했습니다!
            </Text>
          </Dialog>
          <Dialog
            opened={loginDialogOpen}
            withCloseButton
            onClose={loginHandler.close}
            size="lg"
            radius="md"
          >
            <Text size="sm" mb="xs" fw={500}>
              메타마스크로 먼저 로그인을 해 주세요!
            </Text>
          </Dialog>
          <Dialog
            opened={notSupportedDialogOpen}
            withCloseButton
            onClose={notSupportedHandler.close}
            size="lg"
            radius="md"
          >
            <Text size="sm" mb="xs" fw={500}>
              아직 지원하지 않는 기능입니다!
              <br />
              업데이트를 기다려주세요!
            </Text>
          </Dialog>
        </Group>
      </Center>
    </>
  );
}

export default Register;
