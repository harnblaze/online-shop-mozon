import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'; // import { registerUser } from '../redux/authSlice';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { singUp } from '../../store/actionCreators/auth';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Вы должны ввести имя')
    .min(3, 'Имя должно быть больше 3 символов')
    .max(20, 'Имя должно быть не больше 20 символов'),
  lastName: Yup.string()
    .required('Вы должны ввести фамилию')
    .min(3, 'Фамилия должна быть больше 3 символов')
    .max(20, 'Фамилия должна быть не больше 20 символов'),
  email: Yup.string()
    .required('Вы должны ввести  email')
    .email('email не верный'),
  password: Yup.string()
    .required('Вы должны ввести пароль')
    .min(8, 'Пароль должен содержать не менее 8 символов'),
});
const formOptions = { resolver: yupResolver(validationSchema) };

const RegistrationForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (values: any): Promise<void> => {
    console.log('Values:::', values);
    // console.log('Values:::', JSON.stringify(values));
    await dispatch(singUp(values));
  };

  const onError = (error: any): void => {
    console.log('ERROR:::', error);
  };

  return (
    <>
      {/* eslint-disable @typescript-eslint/no-misused-promises */}
      <Form
        onSubmit={handleSubmit(onSubmit, onError)}
        className={'d-flex flex-column'}
      >
        <Form.Label as={'h5'} className={'text-center'}>
          Регистрация
        </Form.Label>
        <Form.Group controlId="formBasicFirstName" className={'mb-3'}>
          <>
            <Form.Label>Имя</Form.Label>

            <Form.Control
              type="text"
              placeholder="Введите свое имя"
              aria-invalid={errors.firstName !== undefined ? 'true' : 'false'}
              {...register('firstName')}
            />
            {errors.firstName !== undefined && (
              <Form.Text className="text-danger" role="alert">
                {errors.firstName?.message as string}
              </Form.Text>
            )}
          </>
        </Form.Group>

        <Form.Group controlId="formBasicLastName" className={'mb-3'}>
          <>
            <Form.Label>Фамилия</Form.Label>

            <Form.Control
              type="text"
              placeholder="Введите свою фамилию"
              aria-invalid={errors.lastName !== undefined ? 'true' : 'false'}
              {...register('lastName')}
            />
            {errors.lastName !== undefined && (
              <Form.Text className="text-danger">
                {errors.lastName?.message as string}
              </Form.Text>
            )}
          </>
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="formBasicAdmin">
          {/* <Form.Label>Вы админ?</Form.Label> */}
          <Form.Check
            label={'Вы админ?'}
            type="checkbox"
            {...register('isAdmin')}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={'mx-auto'}>
          Зарегистрироваться
        </Button>
      </Form>
    </>
  );
};

export default RegistrationForm;
