import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPostByIdQuery } from "../services/postsApi";
import { Card, Flex } from "antd";

const PostPage = () => {
  const { id } = useParams();
  const { data: post, error, isLoading } = useGetPostByIdQuery(Number(id));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (!post) return <p>No data!</p>;

  return (
    <Flex vertical align="center" style={{ marginTop: "32px" }}>
      <Card
        title={post.title}
        extra={<Link to="/">Назад</Link>}
        style={{ width: 600 }}
      >
        <p>{post.body}</p>
      </Card>
    </Flex>
  );
};

export default PostPage;
