import Breadcrumb from '@/src/components/Breadcrumb';
import ContactForm from '@/src/components/ContactForm';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="page-wrapper">
      <Breadcrumb title='Contact Us' />

      <div className="contact-us-wrap-01">
        <div className="container">
          <div className="row align-items-center row-gap-3">
            <div className="col-lg-6">
              <div className="card border-0">
                <div className="card-body p-4">
                  <h4 className="mb-2">Talk to Member of Sales Team</h4>
                  <p className="mb-3">Connect with our experienced real estate experts for personalized guidance, property insights, and assistance with buying, selling, or renting your dream property.</p>
                  <p className="fw-semibold mb-0">Toll Free : 888 634-5891</p>
                </div>
              </div>
              <div className="card border-0 mb-0">
                <div className="card-body p-4">
                  <h4 className="mb-2">Customer Support</h4>
                  <p className="mb-3">Need help with listings, site features, or property-related services? Our support team is here to provide quick solutions and dedicated assistance.</p>
                  {/* <a href="#faq" className="btn btn-dark">Go to FAQ</a> */}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ms-0 ms-lg-4">
                <img src="/assets/img/contact-us/contact-us-img-01.jpg" alt="img" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-us-wrap-02">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mx-auto">
              <div className="row align-items-center justify-content-center mb-3">
                <div className="col-md-6 col-lg-4">
                  <div className="contact-us-item-01">
                    <div className="d-flex align-items-center">
                      <span className="material-icons-outlined">mail</span>
                      <div>
                        <h6 className="mb-2">Email Address</h6>
                        <p className="mb-0">info@happyhomes.example</p>
                        <p className="mb-0">support@happyhomes.example</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="contact-us-item-01">
                    <div className="d-flex align-items-center">
                      <span className="material-icons-outlined">call</span>
                      <div>
                        <h6 className="mb-2">Phone Number</h6>
                        <p className="mb-0">+81649 48103</p>
                        <p className="mb-0">+78301 71940</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="contact-us-item-01">
                    <div className="d-flex align-items-center">
                      <span className="material-icons-outlined">location_on</span>
                      <div>
                        <h6 className="mb-2">Address</h6>
                        <p className="mb-0">509 Rosewood Drive, San Francisco, California</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center row-gap-3">
            <div className="col-lg-6">
              <img src="/assets/img/contact-us/contact-us-img-02.jpg" alt="img" className="img-fluid" />
            </div>
            <div className="col-lg-6">
              <div className="contact-us-item-02">
                <h2>Get In Touch</h2>
                <ContactForm />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="google-map">
        <iframe className="rounded-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2967.8862835683544!2d-73.98256668525309!3d41.93829486962529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd0ee3286615b7%3A0x42bfa96cc2ce4381!2s132%20Kingston%20St%2C%20Kingston%2C%20NY%2012401%2C%20USA!5e0!3m2!1sen!2sin!4v1670922579281!5m2!1sen!2sin" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  );
}
