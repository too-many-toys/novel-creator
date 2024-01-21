import { Box, Button, Input, Modal, SimpleGrid, Stack, Text, Textarea } from '@chakra-ui/react'
import { useRef, useState } from 'react';
import './TextAnimation.css';
import { ShakeText } from './component/text/Shake';

const EFFECT_KEY = 'effect';

export const CreateNovel = () =>{
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [selectText, setSelectText] = useState(false);
  const [selectStartIndex, setSelectStartIndex] = useState(0);
  const [selectEndIndex, setSelectEndIndex] = useState(0);

  const [textEffects, setTextEffects] = useState(new Map<string, Array<string>>());

  const [isHover, setIsHover] = useState(false);

  const contentInput = useRef(null);

  const setTitleText = (e: any) => {
    setTitle(e.target.value);
  }

  const setContentText = (e: any) => {
    setContent(e.target.value);
  }

  const selectedContentText = (e: any) => {
    setSelectText(false);
    if(e.target.selectionStart === e.target.selectionEnd) return;

    setSelectText(true);
    setSelectStartIndex(e.target.selectionStart);
    setSelectEndIndex(e.target.selectionEnd);
  }

  const makeBold = () => {
    if (!selectText) return;

    const index = `${selectStartIndex}-${selectEndIndex}`;
    if(isEffect(selectStartIndex, selectEndIndex)) {
      alert("여러 효과를 동시에 적용할 수 없습니다. 다음 업데이트를 기다려주세요!");
      return;
    }

    let effects = textEffects.get(index);
    if(effects === undefined) {
      effects = [];
    }
    effects.push('bold');

    setTextEffects(textEffects.set(index, effects));
    setTextEffects(new Map([...textEffects].sort()));
    setSelectText(false);
  }

  const makeShake = () => {
    if (!selectText) return;
    
    const index = `${selectStartIndex}-${selectEndIndex}`;
    if(isEffect(selectStartIndex, selectEndIndex)) {
      alert("여러 효과를 동시에 적용할 수 없습니다. 다음 업데이트를 기다려주세요!");
      return;
    }

    let effects = textEffects.get(index);
    if(effects === undefined) {
      effects = [];
    }
    effects.push('shake');

    setTextEffects(textEffects.set(index, effects));
    setTextEffects(new Map([...textEffects].sort()));
    setSelectText(false);
  }

  const getTexts = () => {
    const texts = [];

    let index = 0;
    for (const [key, value] of textEffects) {
      const [startIndex, endIndex] = key.split('-');
      texts.push(<span key={key}>{content.slice(index, Number(startIndex))}</span>);

      // TODO: 지금은 한 가지 효과만 적용
      switch(value[0]){
        case 'bold':
          texts.push(<span onMouseEnter={effectMouseOver} key={key + EFFECT_KEY} className={value.join(' ')}>{content.slice(Number(startIndex), Number(endIndex))}</span>);
          break;
        case 'shake':
          texts.push(<ShakeText onMouseEnter={effectMouseOver} key={key + EFFECT_KEY} text={content.slice(Number(startIndex), Number(endIndex))} />);
          break;
      }
      texts.push(<span key={key + "button"}>{isHover && <Button onClick={() => cancelEffect(key)}>취소</Button>}</span>);
      index = Number(endIndex);
    }
    texts.push(<span key={index + 1}>{content.slice(index, content.length)}</span>);
    return texts;
  }

  const effectMouseOver = () => {
    setIsHover(true);
  }

  const cancelEffect = (key: string) => {
    const effects = textEffects;
    effects.delete(key);
    setTextEffects(effects);
    setIsHover(false);
  }

  const isEffect = (startIndex: number, endIndex: number) => {
    for (const [key] of textEffects) {
      const [startString, endString] = key.split('-');
      const start = Number(startString);
      // array index가 아닌 length로 동작하기 때문에 -1
      const end = Number(endString) - 1;

      if((start >= startIndex && end <= endIndex - 1)
        || (start >= startIndex && end >= endIndex - 1 && start <= endIndex - 1)
        || (start <= startIndex && end <= endIndex - 1 && end >= startIndex)
      ) {
        return true;
      }
    }

    return false;
  }

  return (
    <main style={{ padding: 10, width:'100vh' }}>
      <h1>소설 쓰기</h1>
      <SimpleGrid columns={2} spacing={10}>
        <Input placeholder="제목" onChange={setTitleText} />
        <Text>{title}</Text>
        <Stack>
          <Textarea placeholder="줄거리" ref={contentInput} onSelect={selectedContentText} onChange={setContentText} />
          {selectText && 
            <Stack direction='row'>
              <Button onClick={makeBold}>굵게</Button>
              <Button onClick={makeShake}>흔들기</Button>
            </Stack>
          }
        </Stack>
        <Box>
          {getTexts()}
        </Box>
        {/* <ShakeText text={content}></ShakeText> */}
      </SimpleGrid> 
    </main>
  );
}
