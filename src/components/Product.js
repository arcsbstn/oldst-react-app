import '../styles/Product.scss'

export default function Product({ info }) {
  const { size, price, face, date } = info;

  const priceInDollars = (Math.round(price) / 100).toFixed(2);

  const isWithinTheWeek = (date) => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return new Date(date) > d;
  }
  const relativeDate = (date) => {
    const d1 = new Date();
    const d2 = new Date(date);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  const fullDate = date.substr(3, 12);

  return (
    <>
      <span className='Product__face' style={{ fontSize: `${size}px` }}>{face}</span>
      <div className='Product__displayInfo'>
        <p className='Product__price'>${priceInDollars}</p>
        <p>Size: {size}px</p>
        <p>Posted {isWithinTheWeek(date) ? `${relativeDate(date)} days ago` : fullDate}</p>
      </div>
    </>
  )
}
