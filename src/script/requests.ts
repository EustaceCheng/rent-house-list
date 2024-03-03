import axios from 'axios';
import qs from 'query-string';

import { env } from '@/env';

const API = axios.create({
    baseURL: env.NEXT_PUBLIC_API_DOMAIN,
    paramsSerializer: {
        serialize: params => qs.stringify(params, { skipEmptyString: true, skipNull: true }),
    },
});

export default API;
