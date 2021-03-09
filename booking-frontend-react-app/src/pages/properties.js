import styles from './properties.css';
import React from 'react';
import { List, Avatar, Icon } from 'antd';

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `Property number -  AAXX-${i * 2 + 5}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'A property description is the written portion of a real estate listing that describes the real estate for sale or lease. Nowadays, most buyers begin their property search online. Therefore, real estate descriptions are your best chance to sway buyers and sellers.',
    content: `Price -  ${i * 134 + 75}`,
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
export default function () {

  return (
    <div className={styles.normal}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        footer={
          <div>
            @booking property
      </div>
        }
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[
              
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://images.freeimages.com/images/large-previews/3a2/house-in-colmar-1640603.jpg"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </div>
  );
}
