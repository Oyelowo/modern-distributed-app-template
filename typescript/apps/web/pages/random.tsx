import { Box, Button, Divider, List, Text, Title } from '@mantine/core';
import { useGetUsersQuery, useCreateUserMutation } from '@oyelowo/graphql-client';
import { getLowo } from '@oyelowo/ui';
import Link from 'next/link';
import React from 'react';
import { useQueryClient } from 'react-query';
import { client } from '../config/client';

export default function RandomUsers() {
  const queryClient = useQueryClient();
  const { data } = useGetUsersQuery(client);
  const { mutate } = useCreateUserMutation(client, {
    onMutate: () => {
      queryClient.refetchQueries(['GetUsers']);
    },
  });
  return (
    <Box>
      <Link href="/">
        <Button variant="subtle">Go Home</Button>
      </Link>
      <Title>The allergy</Title>
      another name {getLowo()}
      <Divider />
      <Button
        variant="outline"
        className="text-white"
        type="button"
        onClick={() => {
          mutate({
            userInput: {
              firstName: `Oyelowo${Math.random()}`,
              username: `Oyelowo${Math.random()}`,
              lastName: `Oyedayo${Math.random()}`,
              socialMedia: ['fd'],
              age: 19,
              password: '1234',
              email: `${+Math.random()}oye@gmail.com`,
            },
          });
        }}
      >
        Create random user
      </Button>
      <Title order={2}>Rogue Users</Title>
      <List listStyleType="disc">
        {data?.users.map((el) => (
          <List.Item key={el.id}>
            <Text>First name: {el.firstName?.slice(0, 2)}</Text>
            <Text>Created At: {el.createdAt}</Text>
            <List.Item>
              Posts:{' '}
              <List withPadding listStyleType="disc">
                {el?.posts.map((p, i) => (
                  <List.Item key={i}>
                    Title: {p.title}
                    Content: {p.content}
                  </List.Item>
                ))}
              </List>
            </List.Item>
          </List.Item>
        ))}
      </List>
    </Box>
  );
}
