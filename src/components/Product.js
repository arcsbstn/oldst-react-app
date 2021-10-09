import '../styles/Product.scss'

export default function Product({ info }) {
  const { size, price, face, date } = info;

  return (
    <>
      <span className='Product__face' style={{fontSize: `${size}px`}}>{face}</span>
      <div className='Product__displayInfo'>
        <p>${price}</p>
        <p>{size}</p>
        <p>{date}</p>
      </div>
    </>
  )
}
