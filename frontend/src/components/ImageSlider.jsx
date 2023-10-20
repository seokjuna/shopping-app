import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const ImageSlider = ({ images }) => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop>
        {images.map((image, index) => (
            <div key={index}>
                <img 
                    className='w-full max-h-[150px]'
                    src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
                    alt={image}
                />
            </div>
        ))}
    </Carousel>
  )
}

export default ImageSlider