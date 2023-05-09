import React, {useEffect} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';

import {createProduct, updateProduct,} from '../../store/actionCreators/products';
import {Button, Form, Modal} from 'react-bootstrap';
import {IProduct} from '../../types/products';
import {getCategories} from '../../store/actionCreators/category';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {showNotification} from "../../utils/showNotification";

interface ProductFormProps {
    product?: IProduct;
    onClose: () => void;
    show: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
                                                     product,
                                                     onClose,
                                                     show,
                                                 }) => {
    const dispatch = useAppDispatch();
    const categories = useTypedSelector(getCategories());

    useEffect(
        () =>
            reset({
                title: product?.title ?? '',
                description: product?.description ?? '',
                category: product?.category ?? '',
                brand: product?.brand ?? '',
                price: product?.price ?? 0,
                rating: product?.rating ?? 0,
                thumbnail: product?.thumbnail ?? '',
                discountPercentage: product?.discountPercentage ?? 0,
                stock: product?.stock ?? 0,
            }),
        [product],
    );

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
        price: Yup.number()
            .required('Вы должны ввести цену')
            .moreThan(0, 'Цена не может быть 0? или меньше'),
        rating: Yup.number()
            .required('Вы должны ввести рейтинг')
            .min(0, 'Рейтинг не может быть меньше 0')
            .max(5, 'Рейтинг не может быть больше 5'),
        thumbnail: Yup.string().url('Введите корректный url'),
        discountPercentage: Yup.number()
            .required('Вы должны ввести скидку')
            .min(0, 'Скидка не может быть меньше 0%')
            .max(100, 'Скидка не может быть больше 100%'),
        stock: Yup.number()
            .required('Вы должны ввести количество в наличии')
            .min(0, 'Количество товара не может быть меньше 0'),
    });
    const formOptions = {
        resolver: yupResolver(validationSchema),
    };

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm(formOptions);

    const onHide = (): void => {
        reset();
        onClose();
    };

    const onSubmit = async (values: any): Promise<void> => {
        if (product !== undefined) {
            const isOk = await dispatch(updateProduct({...values, _id: product._id}));
            showNotification(isOk, 'обновлен')
        } else {
            const isOk = await dispatch(createProduct(values));
            showNotification(isOk, 'создан')
        }
        onHide();
    };

    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            {/* eslint-disable @typescript-eslint/no-misused-promises */}
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="title" className={'mb-4'}>
                        <Form.Label>Название</Form.Label>
                        <Controller
                            name="title"
                            control={control}
                            render={({field}) => (
                                <Form.Control
                                    {...field}
                                    type="text"
                                    placeholder="Введите название"
                                    aria-invalid={
                                        errors.description !== undefined ? 'true' : 'false'
                                    }
                                />
                            )}
                        />
                        {errors.title !== undefined && (
                            <Form.Text className="text-danger">
                                {errors.title?.message as string}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group controlId="description" className={'mb-4'}>
                        <Form.Label>Описание</Form.Label>
                        <Controller
                            name="description"
                            control={control}
                            render={({field}) => (
                                <Form.Control
                                    {...field}
                                    type="text"
                                    placeholder="Введите описание"
                                    aria-invalid={
                                        errors.description !== undefined ? 'true' : 'false'
                                    }
                                />
                            )}
                        />
                        {errors.description !== undefined && (
                            <Form.Text className="text-danger">
                                {errors.description?.message as string}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group controlId="category" className={'mb-4'}>
                        <Form.Label>Категория</Form.Label>
                        <Controller
                            name="category"
                            control={control}
                            render={({field}) => (
                                <Form.Select
                                    {...field}
                                    aria-invalid={
                                        errors.category !== undefined ? 'true' : 'false'
                                    }
                                >
                                    <option value={''} disabled={true}>
                                        Выберите категорию
                                    </option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                        />
                        {errors.category !== undefined && (
                            <Form.Text className="text-danger">
                                {errors.category?.message as string}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group controlId="brand" className={'mb-4'}>
                        <Form.Label>Бренд</Form.Label>
                        <Controller
                            name="brand"
                            control={control}
                            render={({field}) => (
                                <Form.Control
                                    {...field}
                                    type="text"
                                    placeholder="Введите бренд"
                                    aria-invalid={errors.brand !== undefined ? 'true' : 'false'}
                                />
                            )}
                        />
                        {errors.brand !== undefined && (
                            <Form.Text className="text-danger">
                                {errors.brand?.message as string}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group controlId="price" className={'mb-4'}>
                        <Form.Label>Цена, $</Form.Label>
                        <Controller
                            name="price"
                            control={control}
                            render={({field}) => (
                                <Form.Control
                                    {...field}
                                    type="number"
                                    placeholder="Введите цену"
                                    aria-invalid={errors.price !== undefined ? 'true' : 'false'}
                                />
                            )}
                        />
                        {errors.price !== undefined && (
                            <Form.Text className="text-danger">
                                {errors.price?.message as string}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group controlId="rating" className={'mb-4'}>
                        <Form.Label>Рейтинг</Form.Label>
                        <Controller
                            name="rating"
                            control={control}
                            render={({field}) => (
                                <Form.Control
                                    {...field}
                                    type="number"
                                    placeholder="Введите рейтинг"
                                    aria-invalid={errors.rating !== undefined ? 'true' : 'false'}
                                />
                            )}
                        />
                        {errors.rating !== undefined && (
                            <Form.Text className="text-danger">
                                {errors.rating?.message as string}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group controlId="thumbnail" className={'mb-4'}>
                        <Form.Label>Изображение</Form.Label>
                        <Controller
                            name="thumbnail"
                            control={control}
                            render={({field}) => (
                                <Form.Control
                                    {...field}
                                    type="text"
                                    placeholder="Введите ссылку ни изображение"
                                    aria-invalid={
                                        errors.thumbnail !== undefined ? 'true' : 'false'
                                    }
                                />
                            )}
                        />
                        {errors.thumbnail !== undefined && (
                            <Form.Text className="text-danger">
                                {errors.thumbnail?.message as string}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group controlId="discountPercentage" className={'mb-4'}>
                        <Form.Label>Скидка, %</Form.Label>
                        <Controller
                            name="discountPercentage"
                            control={control}
                            render={({field}) => (
                                <Form.Control
                                    {...field}
                                    type="number"
                                    placeholder="Введите скидку"
                                    aria-invalid={
                                        errors.discountPercentage !== undefined ? 'true' : 'false'
                                    }
                                />
                            )}
                        />
                        {errors.discountPercentage !== undefined && (
                            <Form.Text className="text-danger">
                                {errors.discountPercentage?.message as string}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group controlId="stock" className={'mb-4'}>
                        <Form.Label>Кол-во</Form.Label>
                        <Controller
                            name="stock"
                            control={control}
                            render={({field}) => (
                                <Form.Control
                                    {...field}
                                    type="number"
                                    placeholder="Введите количество товара"
                                    aria-invalid={errors.stock !== undefined ? 'true' : 'false'}
                                />
                            )}
                        />
                        {errors.stock !== undefined && (
                            <Form.Text className="text-danger">
                                {errors.stock?.message as string}
                            </Form.Text>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {product !== undefined ? 'Изменить' : 'Добавить'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductForm;
