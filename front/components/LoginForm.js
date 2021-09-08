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
  const { isLoggingIn } = useSelector((state) => state.user);
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    dispatch(loginRequestAction({ id, password }));
  }, [id, password]); //

  /* 로그인 요청 과정
  1. onSubmitForm이 실행되면 dispatch함수의 인수인 action creator함수가 실행
  2. 만들어진 액션 객체를 받아 dispatch함수가 실행
  3-1. 액션 객체의 type에 해당하는 saga의 take함수가 실행
  3-2. 3-1가 실행되면서 reducer함수도 같이 실행
  4. take함수의 호출을 따라 put함수가 실행되어 다시 reducer가 실행
  */

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id"></label>
        <br />
        <Input name="user-id" value={id} required onChange={onChangeId} />
      </div>
      <div>
        <label htmlFor="user-password"></label>
        <br />
        <Input name="user-password" value={password} type="password" required onChange={onChangePassword} />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  );
}

export default loginForm;
