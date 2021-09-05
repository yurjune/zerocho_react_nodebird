import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const loginForm = ({ setIsLoggedIn }) => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback((e) => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id"></label>
        <br />
        <Input 
          name="user-id" 
          type="text"
          value={id}
          onChange={onChangeId} 
          required 
        />
      </div>
      <div>
        <label htmlFor="user-password"></label>
        <br />
        <Input 
          name="user-password" 
          type="password"
          value={password}
          onChange={onChangePassword} 
          required 
        />
      </div>
      <ButtonWrapper>
        <Button 
          type="primary" 
          htmlType="submit" 
          loading={false}
          >
          로그인
        </Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
  );
}

export default loginForm;
