import React from 'react'
import Main from '../components/Main'
import Rows from '../components/Rows'
import Request from '../Request'
function Home() {
  return (
    <>
        <Main/>
        <Rows title="Top Rated" fetchURL={Request.requestTopRated} />
        <Rows title="Popular" fetchURL={Request.requestPopular} />
        <Rows title="Trending" fetchURL={Request.requestTopTrending} />
        <Rows title="UpComing" fetchURL={Request.requestUpcoming} />
    </>
  )
}

export default Home