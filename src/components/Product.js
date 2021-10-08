export default function Product({ info }) {
  const { size, price, face, date } = info;

  return (
    <>
      <div className='Product__face'>{face}</div>
      <div className='Product__displayInfo'>
        <p>{price}</p>
        <p>{size}</p>
        <p>{date}</p>
      </div>
    </>
  )
}
