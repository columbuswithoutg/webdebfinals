import React from "react";
import Link from 'next/link';
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography, Card, CardContent, Button } from '@material-ui/core';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  post: Post[];
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  const tahoma: React.CSSProperties = { fontFamily: 'Tahoma, sans-serif', textAlign: 'center' };

  return (
    <Main>
      <Container className='profile-section'>
        <div className='container mx-auto flex justify-center items-center'>
          <nav className='flex justify-end'>
            <Link href="/" className='mx-8'>
              Home
            </Link>
            <Link href="/profile" className='mx-8'>
              Profile
            </Link>
            <Link href="/posts" className='mx-8'>
              Posts
            </Link>
          </nav>
        </div>
        <Card style={{ padding: '2rem', marginTop: '2rem', width: '100%', maxWidth: '1000px', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="mb-40" style={{ width: '100%', textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom style={tahoma}>{data.name}</Typography>
            <Typography variant="h5" gutterBottom style={{ color: 'black', ...tahoma }}>{data.email}</Typography>
            <Typography variant="body2" gutterBottom style={{ color: 'black', ...tahoma }}>{data.bio}</Typography>
          </div>
          <Typography variant="h3" gutterBottom style={{ marginTop: '2rem', ...tahoma }}>Posts</Typography>
          {data.post.map((post, index) => (
            <div key={index} style={{ marginBottom: '3rem', width: '100%', textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom style={{ color: 'black', ...tahoma }}>{post.title}</Typography>
              <Typography variant="body2" gutterBottom style={{ color: 'black', ...tahoma }}>{post.content}</Typography>
            </div>
          ))}
        </Card>
      </Container>
    </Main>
  );
};

export default Home;
