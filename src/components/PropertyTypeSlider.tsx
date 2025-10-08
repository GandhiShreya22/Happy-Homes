"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { defaultErrMsg } from "../utils/constants";
import { PropertyCategory } from "../data/featuredProperties";

const imgArr = [
	"/assets/img/home/home.png",
	"/assets/img/home/residential.png",
	"/assets/img/home/workplace.png",
	"/assets/img/home/apartment.png",
	"/assets/img/home/farmhouse.png",
];

// Function to get image for category index (cycles through available images)
const getImageForCategory = (index: number) => {
	return imgArr[index % imgArr.length];
};

export default function PropertyTypeSlider() {
	const [categories, setCategories] = useState<PropertyCategory[]>([]);

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

	const fetchCategories = async () => {
		try {
			const res = await fetch("/api/categories");
			const data = await res.json();
			if (data.success) {
				setCategories(data.data);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(defaultErrMsg)
		}
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<Slider {...settings} className="property-slider">
			{categories?.map((catg, i) => (
				<div
					key={catg.id}
					className="property-item aos"
					data-aos="fade-up"
					data-aos-duration="1000"
				>
					<div className="property-card-item mx-2">
						<div className="mb-3 text-center">
							<img src={getImageForCategory(i)} alt={`property-icon-${i + 1}`} className="m-auto" />
						</div>
						<h5 className="mb-1"> {catg.name} </h5>
						{/* <p className="mb-0"> 30 Properties</p> */}
					</div>
				</div>
			))}
		</Slider>
	);
}
