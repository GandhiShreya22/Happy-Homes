"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import PropertyCard from "./PropertyCard";
import { Property } from "../../data/featuredProperties";

export default function FeaturedRentSlider() {
	const [properties, setProperties] = useState<Property[]>([]);

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

	const fetchProperties = async () => {
		const res = await fetch("/api/active-properties?type=rent&featured=true&limit=8");
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

	return (
		<Slider {...settings} className="feature-slider-item features-slider position-none">
		{properties?.length > 0 ? (
			properties.map((property, index) => (
				<div className="features-slide-card" key={index}>
						<div
							className="d-flex aos my-3 mx-2"
							data-aos="fade-down"
							data-aos-duration={property.id % 2 === 0 ? "1500" : "1000"}
							key={property.id}
						>
							<PropertyCard property={property} link="/property-details" />
						</div>
				</div>
			))
		) : (
			<p className="text-center">No featured rent properties available.</p>
		)}
		</Slider>
	);
}
