// pages/404.js
export default function Custom404() {
  return <NotFoundImage />;
}

import React from 'react';
import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  ActionIcon,
} from '@mantine/core';
import image from './404.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function NotFoundImage() {
  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={80} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
        <Image src={image.src} className={classes.mobileImage} />

        <div>
          <Title className={classes.title}>Page Not Found</Title>
          <Text color="dimmed" size="lg">
            The page you entered does not exist. Check that you properly typed in the address. It's
            also possible that the page has been moved to another address. Contact us if you think
            this is an error. Thanks!
          </Text>

          <SimpleGrid style={{ maxWidth: 230 }}>
            <Link href="/">
              <Button variant="outline" size="md" mt="xl" className={classes.control}>
                Get back to home page
              </Button>
            </Link>

            <Link href="/" onClick={router.back}>
              <Button variant="outline" size="md" mt="xl" className={classes.control}>
                Get back
              </Button>
            </Link>
          </SimpleGrid>
        </div>
        <Image src={image.src} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
