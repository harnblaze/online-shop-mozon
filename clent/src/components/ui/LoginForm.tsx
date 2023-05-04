import React, { FC } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { signIn } from '../../store/actionCreators/auth';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useHistory } from 'react-router-dom';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory<any>();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Вы должны ввести  email')
      .email('email не верный'),
    password: Yup.string().required('Вы должны ввести пароль'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (values: any): void => {
    const redirect =
      history.location?.state?.from?.pathname !== undefined &&
      history.location?.state?.from?.pathname !== '/login'
        ? history.location.state.from.pathname
        : '/';
    void dispatch(signIn({ payload: values, redirect }));
  };

  const onError = (error: any): void => {
    console.log('ERROR:::', error);
  };

  /* eslint-disable @typescript-eslint/no-misused-promises */

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      className={'d-flex flex-column'}
    >
      <Form.Label as={'h5'} className={'text-center'}>
        Вход
      </Form.Label>

      <Form.Group controlId="formBasicEmail" className={'mb-3'}>
        <>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите email"
            aria-invalid={errors.email !== undefined ? 'true' : 'false'}
            {...register('email')}
          />
          {errors.email !== undefined && (
            <Form.Text className="text-danger">
              {errors.email?.message as string}
            </Form.Text>
          )}
        </>
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className={'mb-3'}>
        <>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            aria-invalid={errors.password !== undefined ? 'true' : 'false'}
            {...register('password')}
          />
          {errors.password !== undefined && (
            <Form.Text className="text-danger">
              {errors.password?.message as string}
            </Form.Text>
          )}
        </>
      </Form.Group>

      <Button variant="primary" type="submit" className={'mx-auto'}>
        Войти
      </Button>
    </Form>
  );
};

export default LoginForm;
