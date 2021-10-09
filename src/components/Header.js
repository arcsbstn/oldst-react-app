import '../styles/Header.scss';

export default function Header({ sortByPrice, sortBySize, sortById }) {
  return (
    <header>
      <div className='Header__logo'>Products Grid</div>
      <div className='Header__sortOptions'>
        <span>Sort by:</span>
        <ul>
          <li><button onClick={sortByPrice}>Price</button></li>
          <li><button onClick={sortBySize}>Size</button></li>
          <li><button onClick={sortById}>ID</button></li>
        </ul>
      </div>
    </header>
  )
}
