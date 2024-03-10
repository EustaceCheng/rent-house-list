import axios from 'axios';
import { z } from 'zod';
import { env } from '@/env';

const URL =
    '/home/search/rsList?is_format_data=1&is_new_list=1&type=1&region=3&order=posttime&orderType=desc&recom_community=1';

const BASE_URL = env.NEXT_PUBLIC_API_DOMAIN;
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-CSRF-TOKEN': 'eTFIjxaCHhFlVjgAMAr6sNkLdEiBjgrW9Agc2Ucd',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

const rsListResponseSchema = z.object({
    data: z.object({
        data: z
            .object({
                title: z.string(),
                photo_list: z.string().array(),
                price: z.string(),
                price_unit: z.string(),
                post_id: z.number(),
                surrounding: z.object({
                    type: z.string(),
                    desc: z.string(),
                    distance: z.string(),
                }),
            })
            .array(),
    }),
    records: z.string(),
});

type RsListResponse = z.infer<typeof rsListResponseSchema>;

type GetHouseListParams = {};
export const getRsList = async (params?: GetHouseListParams) => {
    const { data } = await axiosInstance.get<RsListResponse>(URL, params);

    rsListResponseSchema.parse(data);

    return data;
};
