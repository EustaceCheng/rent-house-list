import { useQuery } from '@tanstack/react-query';
import { getRsList } from './api';

export const useRsList = () =>
    useQuery({
        queryKey: ['rsList'],
        queryFn: getRsList,
        retry: (count, error) => {
            console.log({ error });
            if (count > 3) return false;
            return true;
        },
        refetchOnWindowFocus: false,
    });
