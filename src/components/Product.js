import '../styles/Product.scss'

export default function Product({ info }) {
  let { size, price, face, date } = info;
  let priceInDollars = (Math.round(price) / 100).toFixed(2);

  return (
    <>
      <span className='Product__face' style={{ fontSize: `${size}px` }}>{face}</span>
      <div className='Product__displayInfo'>
        <p className='price'>${priceInDollars}</p>
        <p>{size}</p>
        <p>{date}</p>
      </div>
    </>
  )
}
