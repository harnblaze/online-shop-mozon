import {useEffect, useState} from 'react';
import categories from '../mockData/categories';
import products from '../mockData/products';
import httpService from '../services/http.service';
import {useAppDispatch} from './useAppDispatch';
import {loadMockData} from '../store/actionCreators/products';

interface IUseMockData {
    error: string | null;
    initialize: () => Promise<void>;
    status: string;
    progress: number;
}

const useMockData = (): IUseMockData => {
    const statusConst = {
        idle: 'Not Started',
        pending: 'In Process',
        success: 'Ready',
        error: 'Error Occurred',
    };
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const dispatch = useAppDispatch();
    const incrementCount = (): void => {
        setCount(prevState => prevState + 1);
    };

    const updateProgress = (): void => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConst.success);
            dispatch(loadMockData());
        }
    };

    const summaryCount = categories.length + products.length;

    useEffect(() => {
        updateProgress();
    }, [count]);

    const initialize = async (): Promise<void> => {
        setProgress(0);
        setCount(0);
        setStatus(statusConst.idle);
        try {
            for (const cat of categories) {
                await httpService.post('category/', cat);
                incrementCount();
            }
            for (const prod of products) {
                await httpService.post('product/', prod);
                incrementCount();
            }
        } catch (error) {
            setError(error as string);
            setStatus(statusConst.error);
        }
    };

    return {error, initialize, progress, status};
};

export default useMockData;
