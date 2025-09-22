export default function Footer() {
	return (
		<footer className="footer footer-dark">
			<div className="footer-top">
				<div className="container">
					<div className="row row-gap-4">
						<div className="col-lg-4 col-md-6 col-sm-8">
							<div className="footer-widget footer-about">
								<h5>About Us </h5>
								<p>Happy Homes is your trusted property partner, making it easy to buy, sell, and rent properties across India’s top cities. With thousands of verified listings and seamless inquiry support, we connect you to the right place you can truly call home.</p>
								<div className="social-links">
									<h5>Connect with us</h5>
									<div className="social-icon">
										<a href="#"><i className="fa-brands fa-facebook"></i></a>
										<a href="#"><i className="fa-brands fa-x-twitter"></i></a>
										<a href="#"><i className="fa-brands fa-instagram"></i></a>
										<a href="#"><i className="fa-brands fa-linkedin"></i></a>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-2 col-md-6 col-sm-4">
							<div className="footer-widget">
								<h5 className="footer-title">Company</h5>
								<ul className="footer-menu">
									<li><a href="#">About Us</a></li>
									<li><a href="#">Society Management</a></li>
									<li><a href="#">Interior and Architecture</a></li>
									<li><a href="#">Buy and Rent Property</a></li>
									<li><a href="#">Contact Us</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-4">
							<div className="footer-widget">
								<h5 className="footer-title">Property</h5>
								<ul className="footer-menu">
									<li><a href="#">Houses</a></li>
									<li><a href="#">Offices</a></li>
									<li><a href="#">Villas</a></li>
									<li><a href="#">Apartment</a></li>
									<li><a href="#">Farmhouses</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-4">
							<div className="footer-widget">
								<h5 className="footer-title">Citis/States</h5>
								<ul className="footer-menu">
									<li><a href="#">Gujarat</a></li>
									<li><a href="#">Maharashtra</a></li>
									<li><a href="#">Pune</a></li>
									<li><a href="#">Bangalore</a></li>
									<li><a href="#">Delhi</a></li>
									<li><a href="#">Hyderabad</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-4 col-sm-4">
							<div className="footer-widget">
								<h5 className="footer-title">Useful Links</h5>
								<ul className="footer-menu">
									<li><a href="#">Legal Notice</a></li>
									<li><a href="#">Privacy Policy</a></li>
									<li><a href="#">Terms & Conditions</a></li>
									<li><a href="#">Support</a></li>
									<li><a href="#">Refund Policy</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container">
					<div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
						<div className="copyright">
							<p>Copyright © {new Date().getFullYear()}. All Rights Reserved, Happy Homes</p>
						</div>
						<div className="company-logo">
							<p>Developed By : <a href="https://www.accreteit.com/" className="link-primary" target="_blank" rel="noreferrer">Accrete InfoTech</a></p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
} 