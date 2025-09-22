import Link from 'next/link';

export default function SocietyManagementPage() {
	return (
		<div className="page-wrapper">
			<div className="breadcrumb-bar">
				<div className="row align-items-center text-center position-relative z-1">
					<div className="col-md-12 col-12 breadcrumb-arrow">
						<h1 className="breadcrumb-title">Society Management</h1>
						<nav aria-label="breadcrumb" className="page-breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><Link href="/"><span><i className="material-icons-outlined me-1">home</i></span>Home</Link></li>
								<li className="breadcrumb-item active" aria-current="page">Society Management</li>
							</ol>
						</nav>
					</div>
				</div>
			</div>

			<section className="py-5">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 mb-4 mb-lg-0">
							<img src="/assets/img/blogs/blog-img-15.jpg" className="img-fluid rounded shadow" alt="Society Management" />
						</div>
						<div className="col-lg-6">
							<h2 className="mb-3">Managing Communities with Care</h2>
							<p>Happy Homes provides complete <strong>Society Management Services</strong> for apartments, residential complexes, and gated communities. From day-to-day facility management to financial transparency, we ensure your community runs smoothly.</p>
							<p className="mb-0">Our team handles everything from security, housekeeping, accounting, and maintenance to community engagement — making your living experience hassle-free.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-light py-5">
				<div className="container">
					<div className="text-center mb-5">
						<h2>Our Key Services</h2>
						<p className="text-muted">End-to-end solutions for modern housing societies</p>
					</div>
					<div className="row g-4">
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-shield-alt fa-2x text-primary mb-3"></i>
									<h5>Security Management</h5>
									<p>24/7 surveillance, access control, and professional guards for complete safety of residents.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-broom fa-2x text-primary mb-3"></i>
									<h5>Housekeeping & Maintenance</h5>
									<p>Regular cleaning, waste management, and upkeep of common areas for a healthy environment.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-wallet fa-2x text-primary mb-3"></i>
									<h5>Accounting & Billing</h5>
									<p>Transparent society accounts, maintenance collection, and automated billing systems.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-users fa-2x text-primary mb-3"></i>
									<h5>Community Engagement</h5>
									<p>Organizing events, digital notices, and communication channels for residents.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-tools fa-2x text-primary mb-3"></i>
									<h5>Facility Management</h5>
									<p>AMC for lifts, generators, water systems, and technical support for society assets.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-hand-holding-heart fa-2x text-primary mb-3"></i>
									<h5>Resident Support</h5>
									<p>Dedicated helpdesk for resident issues, quick resolution, and support services.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5">
				<div className="container text-center">
					<h2 className="mb-5">How It Works</h2>
					<div className="row g-4">
						<div className="col-md-3">
							<div className="p-4 bg-light rounded shadow-sm">
								<span className="badge bg-primary rounded-circle p-3 mb-3">1</span>
								<h6>Assessment</h6>
								<p className="mb-0">We analyze your society’s unique needs and challenges.</p>
							</div>
						</div>
						<div className="col-md-3">
							<div className="p-4 bg-light rounded shadow-sm">
								<span className="badge bg-primary rounded-circle p-3 mb-3">2</span>
								<h6>Planning</h6>
								<p className="mb-0">Customized management plan covering all major areas.</p>
							</div>
						</div>
						<div className="col-md-3">
							<div className="p-4 bg-light rounded shadow-sm">
								<span className="badge bg-primary rounded-circle p-3 mb-3">3</span>
								<h6>Implementation</h6>
								<p className="mb-0">Deploy staff, systems, and tools for effective operations.</p>
							</div>
						</div>
						<div className="col-md-3">
							<div className="p-4 bg-light rounded shadow-sm">
								<span className="badge bg-primary rounded-circle p-3 mb-3">4</span>
								<h6>Monitoring</h6>
								<p className="mb-0">Continuous supervision, reporting, and performance tracking.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5 text-center">
				<div className="container">
					<h2 className="mb-3">Looking for Hassle-Free Society Management?</h2>
					<p className="mb-4">Partner with Happy Homes and transform your society’s living experience.</p>
					<a href="/contact" className="btn btn-primary btn-lg">Contact Us</a>
				</div>
			</section>
		</div>
	);
}
