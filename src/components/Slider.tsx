import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

export default function Slider() {
  const banners = [
    {
      imagePath:
        'https://images.unsplash.com/photo-1599403302125-430c37091864?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    },
    {
      imagePath:
        'https://images.unsplash.com/photo-1542338106-1b4bfe84d5df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    },
  ];

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      autoPlay
      dynamicHeight={false}
      className='relative -top-10'
    >
      {banners.map((banner, idx) => (
        <div key={idx} className='w-full max-h-700px'>
          <img src={banner.imagePath} alt='캠핑' />
        </div>
      ))}
    </Carousel>
  );
}
