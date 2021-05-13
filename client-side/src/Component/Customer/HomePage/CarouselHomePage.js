import React from 'react';
import Carousel from "react-bootstrap/Carousel";

const CarouselHomePage = () => {
    return(
        <Carousel fade className='mb-3'>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={{height: '45vh'}}
                    src="/image/Carousel_1.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={{height: '45vh'}}
                    src="/image/Carousel_2.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    style={{height: '45vh'}}
                    src="/image/Carousel_3.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselHomePage;