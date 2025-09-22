import Link from 'next/link';

export default function InteriorArchitecturePage() {
	return (
		<div className="page-wrapper">
			<div className="breadcrumb-bar">
				<div className="row align-items-center text-center position-relative z-1">
					<div className="col-md-12 breadcrumb-arrow">
						<h1 className="breadcrumb-title">Interior & Architecture</h1>
						<nav aria-label="breadcrumb" className="page-breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><Link href="/"><span><i className="material-icons-outlined me-1">home</i></span>Home</Link></li>
								<li className="breadcrumb-item active" aria-current="page">Interior & Architecture</li>
							</ol>
						</nav>
					</div>
				</div>
			</div>

			<section className="py-5">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 mb-4 mb-lg-0">
							<img src="/assets/img/blogs/blog-img-08.jpg" className="img-fluid rounded shadow" alt="Interior & Architecture" />
						</div>
						<div className="col-lg-6">
							<h2 className="mb-3">Designing Homes That Inspire</h2>
							<p>Happy Homes offers premium <strong>Interior & Architectural Design Services</strong> tailored for apartments, villas, and luxury homes. From creative interiors to smart space planning, we create environments that blend functionality with beauty.</p>
							<p className="mb-0">Our expert team of designers and architects delivers end-to-end solutions — from concept design and 3D visualization to execution and project handover.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="bg-light py-5">
				<div className="container">
					<div className="text-center mb-5">
						<h2>Our Expertise</h2>
						<p className="text-muted">Creative design & functional architecture for every lifestyle</p>
					</div>
					<div className="row g-4">
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-couch fa-2x text-primary mb-3"></i>
									<h5>Interior Design</h5>
									<p>Customized furniture layouts, modular kitchens, wardrobes, and décor for every room.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-drafting-compass fa-2x text-primary mb-3"></i>
									<h5>Architectural Planning</h5>
									<p>Smart layouts, sustainable design, and functional floor plans for villas & apartments.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-paint-roller fa-2x text-primary mb-3"></i>
									<h5>Renovation & Remodeling</h5>
									<p>Upgrade old spaces with modern designs, lighting, and luxury finishes.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-lightbulb fa-2x text-primary mb-3"></i>
									<h5>Lighting & Ambience</h5>
									<p>Elegant lighting solutions and ambience creation for cozy, stylish interiors.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-draw-polygon fa-2x text-primary mb-3"></i>
									<h5>3D Visualization</h5>
									<p>High-quality 3D renders and walkthroughs before project execution.</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card h-100 shadow-sm border-0">
								<div className="card-body text-center">
									<i className="fas fa-leaf fa-2x text-primary mb-3"></i>
									<h5>Sustainable Design</h5>
									<p>Eco-friendly materials, energy-efficient layouts, and green building solutions.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5">
				<div className="container text-center">
					<h2 className="mb-5">Our Process</h2>
					<div className="row g-4">
						<div className="col-md-3">
							<div className="p-4 bg-light rounded shadow-sm">
								<span className="badge bg-primary rounded-circle p-3 mb-3">1</span>
								<h6>Consultation</h6>
								<p className="mb-0">Understanding your vision, lifestyle, and requirements.</p>
							</div>
						</div>
						<div className="col-md-3">
							<div className="p-4 bg-light rounded shadow-sm">
								<span className="badge bg-primary rounded-circle p-3 mb-3">2</span>
								<h6>Concept Design</h6>
								<p className="mb-0">Creating mood boards, layouts, and 3D visualizations.</p>
							</div>
						</div>
						<div className="col-md-3">
							<div className="p-4 bg-light rounded shadow-sm">
								<span className="badge bg-primary rounded-circle p-3 mb-3">3</span>
								<h6>Execution</h6>
								<p className="mb-0">On-site implementation with quality materials & skilled workforce.</p>
							</div>
						</div>
						<div className="col-md-3">
							<div className="p-4 bg-light rounded shadow-sm">
								<span className="badge bg-primary rounded-circle p-3 mb-3">4</span>
								<h6>Delivery</h6>
								<p className="mb-0">Final handover with complete satisfaction guarantee.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-5 text-center">
				<div className="container">
					<h2 className="mb-3">Transform Your Home with Expert Design</h2>
					<p className="mb-4">Let Happy Homes bring your dream interiors & architecture to life.</p>
					<a href="/contact" className="btn btn-primary btn-lg">Book a Consultation</a>
				</div>
			</section>
		</div>
	);
}
