import { Button } from 'antd';
import { z } from 'zod';
import API from '@/script/requests';

const Home = () => (
    <div>
        <UpdateHouseListButton />
    </div>
);

const URL =
    '/home/search/rsList?is_format_data=1&is_new_list=1&type=1&region=3&order=posttime&orderType=desc&recom_community=1';

const affiliateDetailsResponseSchema = z.object({
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

type AffiliateDetailsResponse = z.infer<typeof affiliateDetailsResponseSchema>;
type GetHouseListParams = {};

const getHouseList = async (params?: GetHouseListParams) => {
    const { data } = await API.get<AffiliateDetailsResponse>(URL, params);

    affiliateDetailsResponseSchema.parse(data);

    return data;
};

const UpdateHouseListButton = () => {
    const handleClick = async () => {
        try {
            const a = await getHouseList();
            console.log(a);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button type="primary" onClick={handleClick}>
            Update House List
        </Button>
    );
};

export default Home;
