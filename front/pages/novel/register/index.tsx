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
} from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';

import { config } from '../../config';

function Register() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [genres, setGenres] = useState<string | null>('');

  const icon = <IconInfoCircle />;

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
            description="이 소설 제목은 작품 단위 입니다 (XXX가 귀환했다, X회차라 너무 쉬운 것 같습니다 등)"
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
              <Button variant="filled" color="pink">
                블록체인에 올리기!
              </Button>
              <Button
                variant="filled"
                color="green"
                onClick={() => {
                  registerNovel();
                }}
              >
                그냥 올리기!
              </Button>
            </Group>
          </Center>
        </SimpleGrid>
      </Center>
    </>
  );
}

function registerNovel() {
  console.log(config.BASE_URL);
}

export default Register;
