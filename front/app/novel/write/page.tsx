'use client';

import { SimpleGrid, Text, TextInput, Textarea } from '@mantine/core';
import { useState } from 'react';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
      <SimpleGrid cols={2} spacing="xs" verticalSpacing="xs">
        <TextInput
          variant="filled"
          radius="md"
          placeholder="제목"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
        <Text size="lg">{title}</Text>
        <Textarea
          variant="filled"
          placeholder="줄거리"
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <Text size="md">{content}</Text>
      </SimpleGrid>
    </>
  );
}
//%%<([^<>]+)>[^<>]+<\1/>%%
export default Write;
