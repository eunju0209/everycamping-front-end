import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className='flex items-center justify-center gap-5 py-2 drop-shadow'>
      <Link to='/tent' className='hover:text-primary transition-colors'>
        Tent
      </Link>
      <Link to='/cook' className='hover:text-primary transition-colors'>
        Cook
      </Link>
      <Link to='/accessory' className='hover:text-primary transition-colors'>
        Accessory
      </Link>
    </nav>
  );
}
