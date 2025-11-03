"use client";

import { useRouter } from "next/navigation";
import { testimonials } from "@/src/data/testimonials";
import { faqGroups } from "@/src/data/faqsData";
import PropertyTypeSlider from "@/src/components/PropertyTypeSlider";
import FeaturedSalesSlider from "@/src/components/featuredProperties/FeaturedSalesSlider";
import FeaturedRentSlider from "@/src/components/featuredProperties/FeaturedRentSlider";
import CitiesSection from "@/src/components/CitiesSection";
import TestimonialCard from "@/src/components/TestimonialCard";
import FAQAccordion from "@/src/components/FAQAccordion";
import PropertySearchForm from "@/src/components/property/PropertySearchForm";
import { usePropertyData } from "@/src/hooks/usePropertyData";

export default function HomePage() {
  const { keywords, categories, loading, error } = usePropertyData();
  const router = useRouter();

  const handleSearchSubmit = async (formData: any) => {
    // redirect to respective listing page
    router.push(`/${formData.type}-property?${new URLSearchParams(formData).toString()}`);
  };

  return (
    <>
      <section className="Home-banner-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="banner-content aos" data-aos="fade-up">
                <h1 className="mb-2">Find Your Best Dream House for Rental, Buy & Sell...</h1>
                <p className="mb-0">Properties for buy / rent in in your location. We have more than 3000+ listings for you to choose</p>
              </div>
            </div>
          </div>

          <div className="home-search-1 home-search-2">
            <ul className="nav nav-tabs justify-content-lg-start justify-content-center aos" data-aos="fade-up" role="tablist">
              <li className="nav-item" role="presentation">
                <a className="nav-link active" data-bs-toggle="tab" href="#buy_property" role="tab" aria-controls="buy_property" aria-selected="true">
                  <i className="material-icons-outlined me-2">shopping_basket</i>Buy Property
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" data-bs-toggle="tab" href="#rent_property" role="tab" aria-controls="rent_property" aria-selected="false">
                  <i className="material-icons-outlined me-2">king_bed</i>Rent Property
                </a>
              </li>
            </ul>

            <div className="tab-content aos" data-aos="fade-down" data-aos-duration="1000">
              <div className="tab-pane fade show active" id="buy_property" role="tabpanel">
                <PropertySearchForm
                  keywords={keywords}
                  categories={categories}
                  keyCatgLoading={loading}
                  onSubmit={handleSearchSubmit}
                  type="buy"
                />
              </div>

              <div className="tab-pane fade" id="rent_property" role="tabpanel">
                <PropertySearchForm
                  keywords={keywords}
                  categories={categories}
                  keyCatgLoading={loading}
                  onSubmit={handleSearchSubmit}
                  type="rent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-work-section section-padding">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-down" data-aos-duration="1000">
            <h2 className="mb-2 text-center">How It Works</h2>
            <div className="sec-line">
              <span className="sec-line1"></span>
              <span className="sec-line2"></span>
            </div>
            <p className="mb-0 text-center">Discover, choose, and inquire - all in 3 easy steps.</p>
          </div>
          <div className="row">
            <div className="col-lg-4 d-flex aos" data-aos="fade-up" data-aos-duration="500">
              <div className="howit-work-item text-center flex-fill" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="100">
                <div className="mb-3 bg-secondary avatar avatar-md rounded-circle p-2">
                  <img src="/assets/img/home/icons/work-icon-1.svg" alt="icon" />
                </div>
                <h5 className="mb-3">01. Search for Location</h5>
                <p className="mb-0">Find properties easily by entering your preferred city, area, or neighborhood. Our smart search helps you explore the right locations that match your lifestyle and needs.</p>
              </div>
            </div>
            <div className="col-lg-4 d-flex aos" data-aos="fade-down" data-aos-duration="1000">
              <div className="howit-work-item text-center flex-fill" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="100">
                <div className=" mb-3 bg-danger avatar avatar-md rounded-circle p-2">
                  <img src="/assets/img/home/icons/work-icon-2.svg" alt="icon" />
                </div>
                <h5 className="mb-3">02. Select Property Type</h5>
                <p className="mb-0">Choose from a wide range of property options - apartments, villas, plots, or commercial spaces. Filter by type, budget, and amenities to find your perfect match.</p>
              </div>
            </div>
            <div className="col-lg-4 d-flex aos" data-aos="fade-up" data-aos-duration="500">
              <div className="howit-work-item text-center flex-fill" data-aos="fade-down" data-aos-duration="1200" data-aos-delay="100">
                <div className="mb-3 bg-success avatar avatar-md rounded-circle p-2">
                  <img src="/assets/img/home/icons/work-icon-3.svg" alt="icon" />
                </div>
                <h5 className="mb-3">03. Inquire About the Property</h5>
                <p className="mb-0">Like what you see? Simply submit an inquiry and our sales executive will connect with you to guide you through the next steps and help you close the deal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-property-section section-padding bg-dark position-relative overflow-hidden">
        <div className="container">
          <div className="row position-relative">
            <div className="col-lg-4 aos" data-aos="fade-down" data-aos-duration="1000">
              <div className="section-heading">
                <h2 className="mb-2 text-lg-start text-center text-white">Explore by  <span className="d-lg-block "> Property Type </span></h2>
                <div className="sec-line justify-content-lg-start">
                  <span className="sec-line1"></span>
                  <span className="sec-line2"></span>
                </div>
                <p className="mb-0 text-lg-start text-center text-light">Whether you&apos;re looking for a cozy apartment, a luxurious villa, or a commercial investment, we&apos;ve got you covered.</p>
              </div>
            </div>
            <div className="col-lg-8">
              <PropertyTypeSlider />
            </div>
          </div>
        </div>
        <img src="/assets/img/home/icons/property-element-1.svg" alt="property-element-0" className="img-fluid custom-element-img-1 d-lg-block d-none" />
        <img src="/assets/img/home/icons/property-element-2.svg" alt="property-element-0" className="img-fluid custom-element-img-2 d-lg-block d-none" />
      </section>

      <section className="features-section section-padding bg-light position-relative">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-down" data-aos-duration="1000">
            <h2 className="mb-2 text-center">Featured Properties for Sales</h2>
            <div className="sec-line">
              <span className="sec-line1"></span>
              <span className="sec-line2"></span>
            </div>
            <p className="mb-0 text-center">Hand-picked selection of quality places</p>
          </div>

          <FeaturedSalesSlider />

          <div className="text-center d-flex align-items-center justify-content-center m-auto">
            <a href="/buy-property" className="btn btn-lg btn-dark d-flex align-items-center gap-1">
              Explore All <i className="material-icons-outlined">arrow_forward</i>
            </a>
          </div>
        </div>
      </section>

      {/* cities section */}
      <CitiesSection />

      {/* features rent section */}
      <section className="features-section section-padding bg-light position-relative">
        <div className="container">
          <div className="section-heading aos" data-aos="fade-down" data-aos-duration="1000">
            <h2 className="mb-2 text-center">Featured Properties for Rent</h2>
            <div className="sec-line">
              <span className="sec-line1"></span>
              <span className="sec-line2"></span>
            </div>
            <p className="mb-0 text-center">Hand-picked selection of quality places</p>
          </div>

          <FeaturedRentSlider />

          <div className="text-center d-flex align-items-center justify-content-center m-auto">
            <a href="/rent-property" className="btn btn-lg btn-dark d-flex align-items-center gap-1">
              Explore All <i className="material-icons-outlined">arrow_forward</i>
            </a>
          </div>
        </div>
      </section>

      {/* statistics section */}
      <section className="statistics-section section-padding bg-dark position-relative">
        <div className="container">
          <div className="d-flex align-items-center justify-content-lg-between justify-content-md-between justify-content-center flex-wrap gap-2">
            <div className="statistics-item d-flex align-items-center gap-2 flex-wrap aos" data-aos="fade-down" data-aos-duration="1000">
              <div>
                <img src="/assets/img/home/list.png" style={{ height: "60px", width: "60px" }} alt="stat-icon-1" className="img-fluid stat-img" />
              </div>
              <div>
                <h4 className="mb-1"><span>50K</span></h4>
                <p className="mb-0">Listings Added</p>
              </div>
            </div>
            <div className="statistics-item d-flex align-items-center gap-2 flex-wrap aos" data-aos="fade-up" data-aos-duration="1000">
              <div>
                <img src="/assets/img/home/close.png" style={{ height: "60px", width: "60px" }} alt="stat-icon-1" className="img-fluid stat-img" />
              </div>
              <div>
                <h4 className="mb-1"><span>2000+</span></h4>
                <p className="mb-0">Deals Closed</p>
              </div>
            </div>
            <div className="statistics-item d-flex align-items-center gap-2 flex-wrap aos" data-aos="fade-down" data-aos-duration="1000">
              <div>
                <img src="/assets/img/home/location-pin.png" style={{ height: "60px", width: "60px" }} alt="stat-icon-1" className="img-fluid stat-img" />
              </div>
              <div>
                <h4 className="mb-1"><span>20+</span></h4>
                <p className="mb-0">Major Cities</p>
              </div>
            </div>
            <div className="statistics-item d-flex align-items-center gap-2 flex-wrap aos" data-aos="fade-up" data-aos-duration="1000">
              <div>
                <img src="/assets/img/home/happiness.png" style={{ height: "60px", width: "60px" }} alt="stat-icon-1" className="img-fluid stat-img" />
              </div>
              <div>
                <h4 className="mb-1"> <span>5000+</span></h4>
                <p className="mb-0">Happy Users </p>
              </div>
            </div>
          </div>
        </div>
        <img src="/assets/img/home/icons/property-element-1.svg" alt="property-element-0" className="img-fluid custom-element-img-1 d-lg-block d-none" />
        <img src="/assets/img/home/icons/property-element-2.svg" alt="property-element-0" className="img-fluid custom-element-img-2 d-lg-block d-none" />
      </section>

      {/* buy section */}
      <section className="buy-property-section section-padding pb-0">
        <div className="container">

          <div className="row justify-content-center">

            {/* Service 1: Lease / Buy / Sell / Investment */}
            <div className="col-lg-4 col-md-6">
              <div
                className="buy-property-item text-center mb-lg-0 mb-md-0  mb-4 aos"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <div className="img-card overflow-hidden text-center">
                  <a>
                    <img
                      src="/assets/img/home/city/property-img-1.jpg"
                      alt="Lease Buy Sell Investment"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="buy-property bg-white d-flex align-items-center justify-content-between">
                  <h6 className="mb-0"><a href="">Lease / Buy / Sell / Investment</a></h6>
                </div>
              </div>
            </div>

            {/* Service 2: Housing Management */}
            <div className="col-lg-4 col-md-6">
              <div
                className="buy-property-item text-center mb-lg-0 mb-md-0  mb-4 aos"
                data-aos="fade-down"
                data-aos-duration="1200"
              >
                <div className="img-card overflow-hidden text-center">
                  <a>
                    <img
                      src="/assets/img/home/city/property-img-2.jpg"
                      alt="Housing Management"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="buy-property bg-white d-flex align-items-center justify-content-between">
                  <h6 className="mb-0"><a href="">Housing Management</a></h6>
                </div>
              </div>
            </div>

            {/* Service 3: Interior Design */}
            <div className="col-lg-4 col-md-6">
              <div
                className="buy-property-item text-center mb-lg-0 mb-md-0  mb-4 aos"
                data-aos="fade-down"
                data-aos-duration="1400"
              >
                <div className="img-card overflow-hidden text-center">
                  <a>
                    <img
                      src="/assets/img/home/city/property-img-3.jpg"
                      alt="Interior Design"
                      className="img-fluid"
                    />
                  </a>
                </div>
                <div className="buy-property bg-white d-flex align-items-center justify-content-between">
                  <h6 className="mb-0"><a href="">Interior Design</a></h6>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* partners section */}
      <section className="partners-section section-padding ">
        <div className="container">

          {/* start title */}
          <div className="section-heading aos" data-aos="fade-down" data-aos-duration="1000">
            <h2 className="mb-2 text-center">Find your perfect place - Buy, Sell & Rent properties with ease.</h2>
            <div className="sec-line">
              <span className="sec-line1"></span>
              <span className="sec-line2"></span>
            </div>
          </div>
          {/* end title */}

        </div>
      </section>

      {/* testimonials section */}
      <section className="testimonials-section section-padding ">
        <div className="container">

          {/* testimonials title */}
          <div className="section-heading aos" data-aos="fade-down" data-aos-duration="1000">
            <h2 className="mb-2 text-center text-white">Testimonials</h2>
            <div className="sec-line">
              <span className="sec-line1"></span>
              <span className="sec-line2"></span>
            </div>
            <p className="mb-0 text-center text-light">What our happy client says</p>
          </div>

          {/* testimonials slider */}
          <div className="testimonials-slider-item testimonials-slider">
            {testimonials.map((t) => (
              <div className="testimonials-slide" key={t.id}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* faq section */}
      <section className="faq-section section-padding bg-light ">
        <div className="container">
          {/* Section Title */}
          <div className="section-heading aos" data-aos="fade-down" data-aos-duration="1000">
            <h2 className="mb-2 text-center">Frequently Asked Questions</h2>
            <div className="sec-line">
              <span className="sec-line1"></span>
              <span className="sec-line2"></span>
            </div>
            <p className="mb-0 text-center"> Ready to buy your dream home? find it here.</p>
          </div>
          <div className="row">
            {/* Left Image */}
            <div className="col-lg-6 aos" data-aos="fade-up" data-aos-duration="1500">
              <img src="/assets/img/home/bg/faq-img.jpg" alt="" className="img-fluid custom-faq-img rounded" />
            </div>

            {/* Right Accordion */}
            <div className="col-lg-6">
              <div className="card mb-0">
                <div className="card-body">
                  {faqGroups.map((group, idx) => (
                    <div key={`faq-group-${idx}`}>
                      <FAQAccordion groupId={`faq-accordion-${idx}`} faqs={group.items} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
