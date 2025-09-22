import Link from 'next/link';

export default function BuyRentPage() {
	return (
		<div className="page-wrapper">
			<div className="breadcrumb-bar">
				<div className="row align-items-center text-center position-relative z-1">
					<div className="col-md-12 breadcrumb-arrow">
						<h1 className="breadcrumb-title">Buy, Rent & Sell</h1>
						<nav aria-label="breadcrumb" className="page-breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><Link href="/"><span><i className="material-icons-outlined me-1">home</i></span>Home</Link></li>
								<li className="breadcrumb-item active" aria-current="page">Buy, Rent & Sell</li>
							</ol>
						</nav>
					</div>
				</div>
			</div>

			<section className="py-5">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 mb-4 mb-lg-0">
							<img src="/assets/img/blogs/blog-img-05.jpg" className="img-fluid rounded shadow" alt="Buy Rent Sell Property" />
						</div>
						<div className="col-lg-6">
							<h2 className="mb-3">Your Trusted Property Partner</h2>
							<p>Happy Homes is your one-stop destination to <strong>Buy, Rent, or Sell</strong> properties. Whether you are looking for a dream home, a modern office, or want to sell your villa at the best price, our expert team ensures a smooth and transparent process.</p>
							<p className="mb-0">With our strong network, market expertise, and personalized services, we help you make the right real estate decisions with confidence.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-light py-5">
				<div className="container">
					<div className="text-center mb-5">
						<h2>Our Property Services</h2>
						<p className="text-muted">Comprehensive real estate solutions for every need</p>
					</div>
					<div className="row g-4">
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-house-user fa-2x text-primary mb-3"></i>
									<h5>Buy Property</h5>
									<p>Find your dream home, apartment, villa, or office with verified listings and expert guidance.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-key fa-2x text-primary mb-3"></i>
									<h5>Rent Property</h5>
									<p>Explore affordable rental options for families, professionals, and businesses with flexible terms.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-handshake fa-2x text-primary mb-3"></i>
									<h5>Sell Property</h5>
									<p>Get the best value for your property with our marketing, negotiation, and closing support.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-city fa-2x text-primary mb-3"></i>
									<h5>Commercial Spaces</h5>
									<p>Offices, shops, and co-working spaces tailored to your business needs.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-building fa-2x text-primary mb-3"></i>
									<h5>Apartments & Villas</h5>
									<p>Luxury apartments, modern villas, and gated communities at prime locations.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-file-contract fa-2x text-primary mb-3"></i>
									<h5>Property Assistance</h5>
									<p>End-to-end support including legal documentation, registration, and property management.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5 text-center">
				<div className="container">
					<h2 className="mb-3">Find Your Perfect Property Today</h2>
					<p className="mb-4">Buy, Rent, or Sell with Happy Homes — trusted by hundreds of families & businesses.</p>
					<a href="/contact" className="btn btn-primary btn-lg">Get in Touch</a>
				</div>
			</section>
		</div>
	);
}
