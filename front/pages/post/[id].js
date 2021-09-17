import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useSelector } from 'react-redux';

import wrapper from '../../store/configureStore';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const router = useRouter();
  const { singlePost } = useSelector((state) => state.post);
  const { id } = router.query;

  // if (router.isFallback !singlePost) {
  //   // fallback이 true이면 paths에 없는 요소에 대해서는 getStaticProps를 적용
  //   return <div>로딩중...</div>;
  //   // next@9.4.5 이상에서 에러 해결
  // }

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { id: '1' } },
//       { params: { id: '2' } },
//       { params: { id: '3' } },
//     ],
//     fallback: false,
//   };
// }

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id, // 혹은 context.query.id
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;
