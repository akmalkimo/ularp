import Carousel from "./Carousel"

function Testimonials() {
  return (
    <>
    <section className="testimonialsWrapper">
        <h2>Discover the tools that students and professionals rely on when exam results really count.</h2>
        <Carousel />
        <div className="educatorsWrapper">
          <h2>Educators: Put your students on the path of success.</h2>
          <p className="educatorsDescription">We work with educational institutions and programs to provide access to our products that promote student success. All participating programs receive access to our reporting dashboard, which includes analytical tools and metrics to monitor and compare individual as well as group performance.</p>
          <button className="testimonialsCTA">Contact Us</button>
        </div>
    </section>
    <div className="fourPeopleWrapper">
      <img src="/media/fourPeople.jpg" />
      <p>Are you interested in shaping the future of education?<br /><br /> We employ only the most talented individuals who share our passion and commitment to producing the highest quality, student-focused educational content on the market today. Are you interested?</p>
      <button>Join Our Team</button>          
    </div>
    </>
  )
}

export default Testimonials