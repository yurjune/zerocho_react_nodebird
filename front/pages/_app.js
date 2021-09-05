// _app.js는 공통적으로 사용할 레이아웃 컴포넌트
import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';

// 여기서 Component는 서버에 요청한 페이지
// index.js의 Home이 Component에 들어간다.
const Nodebird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Nodebird</title>
      </Head>
      <Component />
    </>
  )
}

Nodebird.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default Nodebird;
