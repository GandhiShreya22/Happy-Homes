import Link from "next/link";
import Image from "next/image";

export default function Header() {
	return (
		<header className="header">
			<div className="container">
				<nav className="navbar navbar-expand-lg header-nav">
					<div className="navbar-header">
						<Link href="/" className="navbar-brand logo">
							<Image src="/assets/img/happy-homes-logo.png" width={200} height={50} className="img-fluid" alt="Logo" />
						</Link>
						<Link href="/" className="navbar-brand logo-dark">
							<Image src="/assets/img/happy-homes-logo.png" width={200} height={50} className="img-fluid" alt="Logo" />
						</Link>
						<a id="mobile_btn" href="#">
							<i className="material-icons-outlined">menu</i>
						</a>
					</div>

					<div className="main-menu-wrapper">
						<div className="menu-header">
							<Link href="/" className="menu-logo">
								<Image src="/assets/img/happy-homes-logo.png" width={200} height={50} className="img-fluid" alt="Logo" />
							</Link>
							<Link href="/" className="menu-logo menu-logo-dark">
								<Image src="/assets/img/happy-homes-logo.png" width={200} height={50} className="img-fluid" alt="Logo" />
							</Link>
							<a id="menu_close" className="menu-close" href="#">
								<i className="material-icons-outlined">close</i>
							</a>
						</div>

						<ul className="main-nav">
							<li>
								<Link href="/">Home</Link>
							</li>
							<li>
								<Link href="/about">About Us</Link>
							</li>
							<li className="has-submenu">
								<a>Our Services <i className="material-icons-outlined">expand_more</i></a>
								<ul className="submenu">
									<li><Link href="/society-management">Society Management</Link></li>
									<li><Link href="/interior-architecture">Interior and Architecture</Link></li>
									<li><Link href="/buy-rent">Buy and Rent Property</Link></li>
								</ul>
							</li>
							<li>
								<Link href="/buy-property">Buy Property</Link>
							</li>
							<li>
								<Link href="/rent-property">Rent Property</Link>
							</li>
							<li>
								<Link href="/contact">Contact Us</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
} 