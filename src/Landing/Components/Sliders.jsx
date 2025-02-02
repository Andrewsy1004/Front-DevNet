

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const allies = [
    { name: 'Amazon', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2eDylw8Px2xcqwGiPior6AzEGyZPSP6vkg&s' },
    { name: 'Linkedin', logo: 'https://1000marcas.net/wp-content/uploads/2020/01/LinkedIn-emblema.jpg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/800px-Google_2015_logo.svg.png' },
    { name: 'Twitter', logo: 'https://pbs.twimg.com/profile_images/1683364783033139200/q256m4uQ_400x400.jpg' },
    { name: 'Tesla', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq-bqyryg1pTEFipZ5Owh4jAsRcubpl3gfG0E4r8sUMFIm_MRKyDQ-NPdGRyX8DrHxclw&usqp=CAU' },
];


export const Sliders = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Nuestros Aliados</h2>
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {allies.map((ally, index) => (
                        <SwiperSlide key={index} className="flex justify-center mb-9">
                            <div className="bg-white p-5 shadow-md rounded-xl flex flex-col items-center hover:shadow-2xl ">
                                <img src={ally.logo} alt={ally.name} className="w-24 h-24 object-contain" />
                                <p className="mt-2 text-gray-700 font-medium">{ally.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};