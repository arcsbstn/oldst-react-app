import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';

import Ad from './components/Ad';
import CatalogueEnd from './components/CatalogueEnd';
import Header from './components/Header';
import Loader from './components/Loader';
import Product from './components/Product';

import './styles/Ad.scss'
import './styles/App.scss'
import './styles/Product.scss'

function App() {
  const BASE_API_URL = 'http://localhost:8000/products?_limit=15'

  let [pageInfo, setPageInfo] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  let [hasMore, setHasMore] = useState(true);
  let [adsInserted, setAdsInserted] = useState(0);
  let [prevAdImageId, setPrevAdImageId] = useState(-1);
  let [apiUrl, setApiUrl] = useState(BASE_API_URL);

  const fetchData = () => {
    console.log(`fetchData: ${apiUrl}&_page=${pageNumber}`)
    return fetch(`${apiUrl}&_page=${pageNumber}`)
      .then(res => res.json())
      .catch(err => console.error(err))
  }

  const updateStates = () => {
    fetchData()
      .then(parsedRes => {
        let newPageInfo = [...pageInfo, ...parsedRes];
        let newAdIndex = 20 * adsInserted + adsInserted - 1;

        if (newPageInfo.length > 20 && newAdIndex < newPageInfo.length) {
          let adImageId = Math.floor(Math.random() * 1000);

          while (adImageId === prevAdImageId) adImageId = Math.floor(Math.random() * 1000);

          newPageInfo.splice(newAdIndex, 0, {
            type: 'ad',
            url: `http://localhost:8000/ads/?r=${adImageId}`,
            id: uuidv4()
          })

          setAdsInserted(adsInserted + 1);
          setPrevAdImageId(adImageId);
        }

        if (parsedRes.length < 1) setHasMore(false);

        setPageInfo(newPageInfo);
        setPageNumber(pageNumber + 1);
      })
      .catch(err => console.error(err))
  }

  const initializeStates = () => {
    setPageInfo([]);
    setPageNumber(1);
    setAdsInserted(0);
    setPrevAdImageId(-1);
  }

  const handleSort = (e) => {
    e.preventDefault();
    let sortValue = e.target.value

    initializeStates();

    if (apiUrl.includes(`_sort=${sortValue}`)) setApiUrl(BASE_API_URL);
    else setApiUrl(`${BASE_API_URL}&_sort=${sortValue}`);
  }

  useEffect(() => {
    updateStates();
  }, []); // eslint-disable-line

  return (
    <div className='App'>
      <Header handleSort={handleSort} />
      <InfiniteScroll
        dataLength={pageInfo.length}
        next={updateStates}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<CatalogueEnd />}
      >
        <div className='Page__wrapper'>
          {pageInfo.map(e => {
            if (e.type) return <div className='Ad__wrapper' key={e.id}><Ad info={e} /></div>

            return <div className='Product__wrapper' key={e.id}><Product info={e} /></div>
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
