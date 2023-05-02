import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {
  createProduct,
  getProductById,
  updateProduct,
} from '../../store/actionCreators/products';
import { Button, Form, Modal } from 'react-bootstrap';

interface ProductFormProps {
  productId?: string;
  onClose: () => void;
  show: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  productId,
  onClose,
  show,
}) => {
  const dispatch = useAppDispatch();
  const product = useTypedSelector(getProductById(productId ?? ''));
  console.log(product);
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Вы должны ввести  название')
      .min(3, 'Название должно быть больше 3-х символов')
      .max(20, 'Название должно быть не больше 20-ти символов'),
    description: Yup.string()
      .required('Вы должны ввести описание')
      .min(10, 'Описание должно быть больше 10-ти символов'),
    category: Yup.string().required('Вы должны выбрать категорию товара'),
    brand: Yup.string()
      .required('Вы должны ввести бренд')
      .min(3, 'Название бренда должно быть больше 3-х символов'),
    price: Yup.number().required('Вы должны ввести цену'),
    rating: Yup.number().required('Вы должны ввести рейтинг'),
    thumbnail: Yup.string().url('Введите корректный url'),
    discountPercentage: Yup.number().required('Вы должны ввести скидку'),
    stock: Yup.number().required('Вы должны ввести количество в наличии'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (values: any): Promise<void> => {
    if (productId !== undefined) {
      await dispatch(updateProduct(values));
    } else {
      await dispatch(createProduct(values));
    }
    onClose();
  };

  const onError = (error: any): void => {
    console.log('ERROR:::', error);
  };

  return (
    <Modal show={show}>
      {/* eslint-disable @typescript-eslint/no-misused-promises */}
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Form.Group controlId="title">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={product?.title}
              placeholder="Введите название"
              aria-invalid={errors.title !== undefined ? 'true' : 'false'}
              {...register('title')}
            />
            {errors.title !== undefined && (
              <Form.Text className="text-danger">
                {errors.title?.message as string}
              </Form.Text>
            )}
          </Form.Group>

          <Button variant="primary" type="submit">
            {productId !== undefined ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductForm;
