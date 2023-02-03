export default function ProductCardEmpty() {
  return (
    <li className='card bg-base-100 shadow-xl'>
      <figure className='hover:cursor-pointer hover:brightness-110 transition-all bg-white'>
        <img className='object-contain w-full h-56' />
      </figure>
      <div className='card-body'>
        <h2 className='text-xl font-semibold truncate'></h2>
      </div>
    </li>
  );
}
