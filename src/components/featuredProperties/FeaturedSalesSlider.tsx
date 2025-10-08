"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import PropertyCard from "./PropertyCard";
import { Property } from "../../data/featuredProperties";

export default function FeaturedSalesSlider() {
	const [properties, setProperties] = useState<Property[]>([]);

	const settings = {
		dots: false,
		arrows: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{ breakpoint: 1200, settings: { slidesToShow: 2 } },
			{ breakpoint: 992, settings: { slidesToShow: 2 } },
			{ breakpoint: 768, settings: { slidesToShow: 1 } },
		],
	};

	const fetchProperties = async () => {
		const res = await fetch("/api/active-properties?type=sale&featured=true&limit=8");
		const data = await res.json();

		if (data.success) {
			setProperties(data.data.properties);
		} else {
			toast.error(data.message);
		}
	};

	useEffect(() => {
		fetchProperties();
	}, []);

	// Split into slides, 2 cards per slide
	const slides = [];
	for (let i = 0; i < properties.length; i += 2) {
		slides.push(properties.slice(i, i + 2));
	}

	return (
		<Slider {...settings} className="feature-slider-item features-slider position-none">
			{slides.map((slide, index) => (
				<div className="features-slide-card" key={index}>
					{slide.map((property) => (
						<div
							className="d-flex aos my-3 mx-2"
							data-aos="fade-down"
							data-aos-duration={property.id % 2 === 0 ? "1500" : "1000"}
							key={property.id}
						>
							<PropertyCard property={property} link="/property-details" />
						</div>
					))}
				</div>
			))}
		</Slider>
	);
}
