import '../styles/Header.scss';

export default function Header({ handleSort, sortByValue }) {
  let priceButtonStyle = {}, sizeButtonStyle = {}, idButtonStyle = {};

  if (sortByValue === 'price') priceButtonStyle = { backgroundColor: 'rgb(230,140,120)' };
  if (sortByValue === 'size') sizeButtonStyle = { backgroundColor: 'rgb(230,140,120)' };
  if (sortByValue === 'id') idButtonStyle = { backgroundColor: 'rgb(230,140,120)' };

  return (
    <header>
      <div className='Header__wrapper'>
        <div className='Header__logo'>
          <a href='/'>
            Products Grid *
          </a>
        </div>
        <div className='Header__sortOptions'>
          <span>Sort by:</span>
          <ul>
            <li><button onClick={handleSort} style={priceButtonStyle} value='price'>Price</button></li>
            <li><button onClick={handleSort} style={sizeButtonStyle} value='size'>Size</button></li>
            <li><button onClick={handleSort} style={idButtonStyle} value='id'>ID</button></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
