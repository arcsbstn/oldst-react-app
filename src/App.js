import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Product from './components/Product';

function App() {
  let [pageInfo, setPageInfo] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  let [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    return fetch(`http://localhost:8000/products?_page=${pageNumber}&_limit=15`)
      .then(res => res.json())
      .catch(err => console.error(err))
  }

  const updateStates = () => {
    fetchData()
      .then(parsedRes => {
        if (parsedRes.length < 1) setHasMore(false)

        setPageInfo([...pageInfo, ...parsedRes]);
        setPageNumber(pageNumber + 1);
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    updateStates()
  }, []); // eslint-disable-line

  return (
    <div className='App'>
      <InfiniteScroll
        dataLength={pageInfo.length}
        next={updateStates}
        hasMore={hasMore}
        loader={<h4>loading...</h4>}
        endMessage={<h4>~ end of catalogue ~</h4>}
      >
        {pageInfo.map(e => {
          return (
            <div
              className='Product__tile'
              key={e.id}
            >
              <Product info={e} />
            </div>
          )
        })}
      </InfiniteScroll>
    </div>
  );
}

export default App;
