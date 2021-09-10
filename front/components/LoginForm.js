import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const loginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]); //

  /* 로그인 요청 과정
  1. onSubmitForm이 실행되면 dispatch함수의 인수인 action creator함수가 실행
  2. 만들어진 액션 객체를 받아 dispatch함수가 실행
  3-1. dispatch에 의해 reducer함수가 실행
  3-2. 3-1이 실행되면서 saga에서 액션 객체의 type에 해당하는 take함수도 실행
  4. take함수의 호출을 따라 put함수가 실행되어 다시 reducer가 실행
  */

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email" />
        <br />
        <Input name="user-email" value={email} required onChange={onChangeEmail} />
      </div>
      <div>
        <label htmlFor="user-password" />
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
