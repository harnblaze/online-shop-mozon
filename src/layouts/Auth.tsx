import React, { FC, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import RegisterForm from '../components/ui/RegisterForm';
import { useParams } from 'react-router-dom';
import LoginForm from '../components/ui/LoginForm';

const Auth: FC = () => {
  const { type } = useParams<{ type: string }>();
  const [formType, setFormType] = useState<string>(
    type === 'register' ? type : 'login',
  );

  const toggleFormType = (): void => {
    setFormType(prevState => (prevState === 'register' ? 'login' : 'register'));
  };

  return (
    <Container className={'flex-column align-items-center mt-5 '}>
      {formType === 'register' ? (
        <>
          <p>
            Уже есть аккаунт?&nbsp;
            <Button
              variant={'link'}
              onClick={toggleFormType}
              className={'pb-2'}
            >
              Войти
            </Button>
          </p>
          <RegisterForm />
        </>
      ) : (
        <>
          <p>
            Еще нет аккаунта?&nbsp;
            <Button
              variant={'link'}
              onClick={toggleFormType}
              className={'pb-2'}
            >
              Зарегистрироваться
            </Button>
          </p>
          <LoginForm />
        </>
      )}
    </Container>
  );
};

export default Auth;
