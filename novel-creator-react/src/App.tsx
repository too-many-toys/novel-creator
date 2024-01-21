import { ChakraProvider, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { SidebarCustom } from './Sidebar';

declare global {
  interface Window{
    ethereum?: any;
  }
}

let injectedProvider = false

if (typeof window.ethereum !== 'undefined') {
  injectedProvider = true
}

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false;

export const App = () =>{
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <SidebarCustom />
    </ChakraProvider>
  );
}
