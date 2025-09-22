"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PropertyTypeSlider() {
	const settings = {
		dots: false,
		arrows: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{ breakpoint: 1200, settings: { slidesToShow: 3 } },
			{ breakpoint: 992, settings: { slidesToShow: 2 } },
			{ breakpoint: 576, settings: { slidesToShow: 1 } },
		],
	};

	return (
		<Slider {...settings} className="property-slider">
			<div className="property-item aos" data-aos="fade-up" data-aos-duration="1000">
				<div className="property-card-item">
					<div className="mb-3 text-center">
						<img src="/assets/img/home/home.png" alt="property-icon-1" className="m-auto" />
					</div>
					<h5 className="mb-1"> Houses </h5>
					<p className="mb-0"> 30 Properties</p>
				</div>
			</div>
			<div className="property-item">
				<div className="property-card-item aos" data-aos="fade-down" data-aos-duration="1000">
					<div className="mb-3 text-center">
						<img src="/assets/img/home/workplace.png" alt="property-icon-1" className="m-auto" />
					</div>
					<h5 className="mb-1"> Offices </h5>
					<p className="mb-0"> 45 Properties</p>
				</div>
			</div>
			<div className="property-item aos" data-aos="fade-up" data-aos-duration="1000">
				<div className="property-card-item">
					<div className="mb-3 text-center">
						<img src="/assets/img/home/residential.png" alt="property-icon-1" className="m-auto" />
					</div>
					<h5 className="mb-1"> Villas </h5>
					<p className="mb-0"> 28 Properties</p>
				</div>
			</div>
			<div className="property-item aos" data-aos="fade-down" data-aos-duration="1000">
				<div className="property-card-item">
					<div className="mb-3 text-center">
						<img src="/assets/img/home/apartment.png" alt="property-icon-1" className="m-auto" />
					</div>
					<h5 className="mb-1"> Apartment </h5>
					<p className="mb-0"> 35 Properties</p>
				</div>
			</div>
			<div className="property-item aos" data-aos="fade-up" data-aos-duration="1000">
				<div className="property-card-item">
					<div className="mb-3 text-center">
						<img src="/assets/img/home/farmhouse.png" alt="property-icon-1" className="m-auto" />
					</div>
					<h5 className="mb-1"> Farmhouses </h5>
					<p className="mb-0"> 15 Properties</p>
				</div>
			</div>
		</Slider>
	);
}
