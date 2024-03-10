'use client';

import { List, Space } from 'antd';
import React from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRsList } from '@/services/queries';

const queryClient = new QueryClient();

const Home = () => (
    <div>
        <QueryClientProvider client={queryClient}>
            <RsList />
        </QueryClientProvider>
    </div>
);
const IconText = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <Space>
        {icon}
        {text}
    </Space>
);
const RsList = () => {
    const { data, isPending, isError } = useRsList();

    if (isPending || isError) return null;

    const { data: rsListData } = data.data;

    return (
        <List
            dataSource={rsListData}
            itemLayout="vertical"
            pagination={false}
            renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                        <IconText key="list-vertical-star-o" icon={<StarOutlined />} text="156" />,
                        <IconText key="list-vertical-like-o" icon={<LikeOutlined />} text="156" />,
                        <IconText
                            key="list-vertical-message"
                            icon={<MessageOutlined />}
                            text="2"
                        />,
                    ]}
                >
                    {item.price}
                </List.Item>
            )}
            size="large"
        />
    );
};

export default Home;
