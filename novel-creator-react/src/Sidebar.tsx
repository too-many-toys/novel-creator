import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { CreateNovel } from './CreateNovel';
import { Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Route, Routes } from "react-router-dom";
import { Home } from './Home';
import { Character } from './Character';
import { Story } from './Story';

export const SidebarCustom = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} backgroundColor='#333333'>
        <Menu>
          <MenuItem component={<Link as={ReactRouterLink} to="/home" />}> 홈 </MenuItem>
          <MenuItem component={<Link as={ReactRouterLink} to="/createNovel" />}> 소설 쓰기</MenuItem>
          <MenuItem component={<Link as={ReactRouterLink} to="/character" />}> 인물 설계</MenuItem>
          <MenuItem component={<Link as={ReactRouterLink} to="/story" />}> 스토리 설계</MenuItem>
          <MenuItem onClick={() => setCollapsed(!collapsed)}> 접기 </MenuItem>
        </Menu>
      </Sidebar>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/createNovel" element={<CreateNovel />} />
        <Route path="/character" element={<Character />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </div>
  );
};
