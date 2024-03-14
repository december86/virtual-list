import React, { useState } from "react";
import { List } from "antd";
import VirtualList from "rc-virtual-list";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../services/postsApi";

const HEIGHT = 600;

const Posts: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, error } = useGetPostsQuery(page);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight - e.currentTarget.scrollTop - HEIGHT
      ) <= 1
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <List style={{ padding: "16px" }}>
      <VirtualList
        data={posts || []}
        height={HEIGHT}
        itemHeight={100}
        itemKey="email"
        onScroll={onScroll}
      >
        {(post: Post) => (
          <List.Item key={post.id}>
            <List.Item.Meta
              description={post.body}
              title={<Link to={`/posts/${post.id}`}>{post.title}</Link>}
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default Posts;
