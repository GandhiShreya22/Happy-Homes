"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { featuredProperties } from "../../data/featuredProperties";
import PropertyCard from "./PropertyCard";

export default function FeaturedRentSlider() {
	const settings = {
		dots: false,
		arrows: true,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{ breakpoint: 1200, settings: { slidesToShow: 2 } },
			{ breakpoint: 992, settings: { slidesToShow: 2 } },
			{ breakpoint: 768, settings: { slidesToShow: 1 } },
		],
	};

	// Split into slides, 2 cards per slide
	const slides = [];
	for (let i = 0; i < featuredProperties.length; i += 2) {
		slides.push(featuredProperties.slice(i, i + 2));
	}

	return (
		<Slider {...settings} className="feature-slider-item features-slider position-none">
			{slides.map((slide, index) => (
				<div className="features-slide-card" key={index}>
					{slide.map((property) => (
						<div
							className="d-flex aos"
							data-aos="fade-down"
							data-aos-duration={property.id % 2 === 0 ? "1500" : "1000"}
							key={property.id}
						>
							<PropertyCard property={property} />
						</div>
					))}
				</div>
			))}
		</Slider>
	);
}
