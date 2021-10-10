import '../styles/Header.scss';

export default function Header({ handleSort }) {
  return (
    <header>
      <div className='Header__wrapper'>
        <div className='Header__logo'>Products Grid</div>
        <div className='Header__sortOptions'>
          <span>Sort by:</span>
          <ul>
            <li><button onClick={handleSort} value='price'>Price</button></li>
            <li><button onClick={handleSort} value='size'>Size</button></li>
            <li><button onClick={handleSort} value='id'>ID</button></li>
          </ul>
        </div>
      </div>
    </header>
  )
}
