import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Product from './components/Product';

function App() {
  let [productsInfo, setProductsInfo] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  let [hasMore, setHasMore] = useState(true);

  const fetchData = () => {
    fetch(`http://localhost:8000/products?_page=${pageNumber}&_limit=15`)
      .then(res => res.json())
      .then(parsedRes => {
        if (parsedRes.length < 1) setHasMore(false)

        setProductsInfo([...productsInfo, ...parsedRes]);
        setPageNumber(pageNumber + 1);
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchData()
  }, []); // eslint-disable-line

  return (
    <div className='App'>
      <InfiniteScroll
        dataLength={productsInfo.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>loading...</h4>}
        endMessage={<h4>~ end of catalogue ~</h4>}
      >
        {productsInfo.map(e => {
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
