import React from "react";
import { Link } from "react-router-dom";
import { List } from "antd";

const Blogs = ({ blogs, notify }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={blogs}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            title={<Link to={`/blogs/${item.id}`}>{item.title}</Link>}
            description={`by ${item.author}`}
          />
        </List.Item>
      )}
    >
    </List>
  )
}

export default Blogs;