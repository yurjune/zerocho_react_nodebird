import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  /* useSelector은 redux로 관리하는 state를 가져온다.
  function 컴포넌트가 렌더링될 때와 action이 dispatch될 때 작동한다.
  비교를 수행하여 이전값과 현재값이 다르면 리렌더링한다.
  */
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link href='/'><a>노드버드</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton/>
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="http://www.naver.com" target="_blank" rel="noreferrer noopener">네이버 가기</a>
        </Col>
      </Row>
    </div>
  );
};

// 개발할때 원칙
// 1. grid에서 가로먼저 자르고 세로로 자르기
// 2. 모바일부터 디자인하고 태블릿, 데스크탑 순서로 디자인

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
