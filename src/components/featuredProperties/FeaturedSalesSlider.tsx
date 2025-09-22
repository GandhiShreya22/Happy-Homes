"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { featuredProperties } from "../../data/featuredProperties";
import PropertyCard from "./PropertyCard";

export default function FeaturedSalesSlider() {
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

	// Split into slides, 2 cards per slide
	const slides = [];
	for (let i = 0; i < featuredProperties.length; i += 2) {
		slides.push(featuredProperties.slice(i, i + 2));
	}

	return (
		// <Slider {...settings} className="feature-slider-item features-slider position-none">
		// 	<div className="features-slide-card">
		// 		<div className="d-flex aos" data-aos="fade-down" data-aos-duration="1000">
		// 			<div className="property-card flex-fill">
		// 				<div className="property-listing-item p-0 mb-0 shadow-none">
		// 					<div className="buy-grid-img mb-0 rounded-0">
		// 						<a href="#">
		// 							<img className="img-fluid" src="/assets/img/buy/buy-grid-img-01.jpg" alt="" />
		// 						</a>
		// 						<div className="d-flex align-items-center justify-content-between position-absolute bottom-0 end-0 start-0 p-3 z-1">
		// 							<h6 className="text-white mb-0">INR 12,00,000</h6>
		// 							<div className="user-avatar avatar avatar-md border rounded-circle">
		// 								<img src="/assets/img/users/user-01.jpg" alt="User" className="rounded-circle" />
		// 							</div>
		// 						</div>
		// 					</div>
		// 					<div className="buy-grid-content">
		// 						<div className="d-flex align-items-center justify-content-between mb-3">
		// 							<div>
		// 								<h6 className="title mb-1">
		// 									<a href="#">Serenity Condo Suite</a>
		// 								</h6>
		// 								<p className="d-flex align-items-center fs-14 mb-0"><i className="material-icons-outlined me-1 ms-0">location_on</i>17, Grove Towers, New York, USA</p>
		// 							</div>
		// 						</div>
		// 						<ul className="d-flex buy-grid-details d-flex mb-3 bg-light rounded p-3 justify-content-between align-items-center flex-wrap gap-1">
		// 							<li className="d-flex align-items-center gap-1">
		// 								<i className="material-icons-outlined bg-white text-secondary">bed</i>
		// 								4 Bedroom
		// 							</li>
		// 							<li className="d-flex align-items-center gap-1">
		// 								<i className="material-icons-outlined bg-white text-secondary">bathtub</i>
		// 								3 Bath
		// 							</li>
		// 							<li className="d-flex align-items-center gap-1">
		// 								<i className="material-icons-outlined bg-white text-secondary">straighten</i>
		// 								350 Sq Ft
		// 							</li>
		// 						</ul>
		// 						<div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
		// 							<p className="fs-14 fw-medium text-dark mb-0">Listed on : <span className="fw-medium text-body"> 16 Jan 2023</span></p>
		// 							<p className="fs-14 fw-medium text-dark mb-0">Category : <span className="fw-medium text-body"> Apartment</span></p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>

		// 	<div className="features-slide-card">
		// 		<div className="d-flex aos" data-aos="fade-down" data-aos-duration="1000">
		// 			<div className="property-card flex-fill mb-0">
		// 				<div className="property-listing-item p-0 mb-0 shadow-none">
		// 					<div className="buy-grid-img mb-0 rounded-0">
		// 						<a href="#">
		// 							<img className="img-fluid" src="/assets/img/buy/buy-grid-img-04.jpg" alt="" />
		// 						</a>
		// 						<div className="d-flex align-items-center justify-content-between position-absolute bottom-0 end-0 start-0 p-3 z-1">
		// 							<h6 className="text-white mb-0">INR 37,00,000</h6>
		// 							<div className="user-avatar avatar avatar-md border rounded-circle">
		// 								<img src="/assets/img/users/user-04.jpg" alt="User" className="rounded-circle" />
		// 							</div>
		// 						</div>
		// 					</div>
		// 					<div className="buy-grid-content">
		// 						<div className="d-flex align-items-center justify-content-between mb-3">
		// 							<div>
		// 								<h6 className="title mb-1">
		// 									<a href="#">Palm Cove Bungalows</a>
		// 								</h6>
		// 								<p className="d-flex align-items-center fs-14 mb-0"><i className="material-icons-outlined me-1 ms-0">location_on</i>42, Pine Residency, Miami, USA</p>
		// 							</div>
		// 						</div>
		// 						<ul className="d-flex buy-grid-details d-flex mb-3 bg-light rounded p-3 justify-content-between align-items-center flex-wrap gap-1">
		// 							<li className="d-flex align-items-center gap-1">
		// 								<i className="material-icons-outlined bg-white text-secondary">bed</i>
		// 								5 Bedroom
		// 							</li>
		// 							<li className="d-flex align-items-center gap-1">
		// 								<i className="material-icons-outlined bg-white text-secondary">bathtub</i>
		// 								3 Bath
		// 							</li>
		// 							<li className="d-flex align-items-center gap-1">
		// 								<i className="material-icons-outlined bg-white text-secondary">straighten</i>
		// 								700 Sq Ft
		// 							</li>
		// 						</ul>
		// 						<div className="d-flex align-items-center justify-content-between flex-wrap gap-1">
		// 							<p className="fs-14 fw-medium text-dark mb-0">Listed on : <span className="fw-medium text-body"> 16 Mar 2025</span></p>
		// 							<p className="fs-14 fw-medium text-dark mb-0">Category : <span className="fw-medium text-body"> Bungalow </span></p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </Slider>
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
