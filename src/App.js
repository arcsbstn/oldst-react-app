import { useState, useEffect, useRef, useCallback } from 'react';
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
  let [sortByValue, setSortByValue] = useState('');
  let [loading, setLoading] = useState(true);

  const fetchData = () => {
    return fetch(`${apiUrl}&_page=${pageNumber}`)
      .then(res => res.json())
      .catch(err => console.error(err))
  }

  const updateStates = () => {
    setLoading(true)

    fetchData()
      .then(parsedRes => {
        setLoading(false)

        let newPageInfo = [...pageInfo, ...parsedRes];
        let newAdIndex = 20 * adsInserted + adsInserted - 1;

        if (newPageInfo.length > 20 && newAdIndex < newPageInfo.length) {
          let adImageId = Math.floor(Math.random() * 1000);
          while (adImageId === prevAdImageId) adImageId = Math.floor(Math.random() * 1000);

          if (newAdIndex > 0) {
            newPageInfo.splice(newAdIndex, 0, {
              type: 'ad',
              url: `http://localhost:8000/ads/?r=${adImageId}`,
              id: uuidv4(),
              adImageId: adImageId
            })
          }

          setAdsInserted(adsInserted + 1);
          setPrevAdImageId(adImageId);
        }

        if (parsedRes.length < 1) setHasMore(false);

        setPageInfo(newPageInfo);
        setPageNumber(pageNumber + 1);
      })
      .catch(err => console.error(err))
  }

  const handleSort = (e) => {
    e.preventDefault();

    setPageInfo([]);
    setPageNumber(1);
    setAdsInserted(0);
    setHasMore(true);

    if (apiUrl.includes(`_sort=${e.target.value}`)) setApiUrl(BASE_API_URL);
    else setApiUrl(`${BASE_API_URL}&_sort=${e.target.value}`);

    if (sortByValue === e.target.value) setSortByValue('');
    else setSortByValue(e.target.value);
  }

  const observer = useRef()
  const lastPageElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(pageNumber + 1);
        updateStates();
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore]); // eslint-disable-line

  useEffect(() => {
    updateStates();
  }, [sortByValue]); // eslint-disable-line

  return (
    <div className='App'>
      <Header
        handleSort={handleSort}
        sortByValue={sortByValue}
      />
      <div className='Page__wrapper'>
        {pageInfo.map((e, index) => {
          if (e.type) return <div className='Ad__wrapper' key={e.id}><Ad info={e} /></div>
          else if (pageInfo.length === index + 1) return <div ref={lastPageElementRef} className='Product__wrapper' key={e.id}><Product info={e} /></div>
          else return <div className='Product__wrapper' key={e.id}><Product info={e} /></div>
        })}
      </div>
      <div>{loading && <Loader />}</div>
      <div>{!hasMore && <CatalogueEnd />}</div>
    </div>
  );
}

export default App;
