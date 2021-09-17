import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction, CLEAR_USER_ERROR } from '../reducers/user';

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const loginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError, me } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);
      dispatch({
        type: CLEAR_USER_ERROR,
      });
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]); //

  /* 로그인 요청 과정
  1. onSubmitForm이 실행되면 dispatch함수가 액션객체를 받아 실행
  2-1. dispatch에 의해 reducer함수가 실행
  2-2. 2-1이 실행되면서 saga에서 액션 객체의 type에 해당하는 take함수도 실행
  3. take함수의 호출을 따라 put함수가 실행되어 다시 reducer가 실행
  */

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br />
        <Input name="user-email" value={email} required onChange={onChangeEmail} />
      </div>
      <div>
        <label htmlFor="user-password">패스워드</label>
        <br />
        <Input name="user-password" value={password} type="password" required onChange={onChangePassword} />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default loginForm;
