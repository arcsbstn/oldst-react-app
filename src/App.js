import { useState, useEffect } from 'react';

import Product from './components/Product';

function App() {
  let [productsInfo, setProductsInfo] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);

  const fetchData = () => {
    fetch(`http://localhost:8000/products?_page=${pageNumber}&_limit=15`)
      .then(res => res.json())
      .then(parsedRes => {
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
    </div>
  );
}

export default App;
