import React, { useRef } from "react";
import "animate.css"; // Import Animate.css for animations
import "./Home.css";
import backgroundVideo from "../assets/background.mp4"; // Ensure the video file is in the correct path

const Home = () => {
  const anxietySectionRef = useRef(null);
  const depressionSectionRef = useRef(null);
  const sleepSectionRef = useRef(null);
  const nutritionSectionRef = useRef(null);
  const relationshipsSectionRef = useRef(null);

  // Function to scroll to a section smoothly
  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="home-container">
      {/* Header with Background Video */}
      <header className="home-header">
        <video autoPlay loop muted className="background-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="header-overlay"></div>
        <div className="header-content animate__animated animate__fadeInDown">
        <h1 className="main-title animate__animated animate__fadeInUp">Mental Well-Being</h1>
          <h1 className="header-title">Your trusted guide to mental health & wellness</h1>
        </div>
      </header>

      {/* Main Section */}
      <main className="main-section">
       
        <p className="main-subtitle animate__animated animate__fadeInUp animate__delay-1s">
          A holistic guide to care
        </p>

             {/* Services Section */}
             <div className="cards-container">
          {/* Clicking these will scroll to their respective sections */}
          <div className="card animate_animated animatefadeInUp animate_delay-1s" onClick={() => scrollToSection(anxietySectionRef)}>
            <p>Treatment for Anxiety</p>
          </div>
          <div className="card animate_animated animatefadeInUp animate_delay-2s" onClick={() => scrollToSection(depressionSectionRef)}>
            <p>Treatment for Depression</p>
          </div>
          <div className="card animate_animated animatefadeInUp animate_delay-3s" onClick={() => scrollToSection(sleepSectionRef)}>
            <p>Better Sleep</p>
          </div>
          <div className="card animate_animated animatefadeInUp animate_delay-4s" onClick={() => scrollToSection(nutritionSectionRef)}>
            <p>Nutrition & Supplements</p>
          </div>
          <div className="card animate_animated animatefadeInUp animate_delay-5s" onClick={() => scrollToSection(relationshipsSectionRef)}>
            <p>Building Relationships</p>
          </div>
        </div>

        {/* Anxiety Treatment Section */}
        <section ref={anxietySectionRef} className="anxiety-section animate_animated animatefadeInUp animate_delay-1s">
          <h2 className="anxiety-title">Treatment for Anxiety</h2>
          <p>Anxiety disorders can be treated using various approaches, including therapy, medication, and lifestyle changes.</p>
          <p>Cognitive Behavioral Therapy (CBT) helps individuals manage anxiety effectively.</p>
          <p>Regular exercise, mindfulness practices, and a balanced diet play a crucial role in reducing anxiety.</p>
          <p>Deep breathing techniques and meditation can significantly improve mental calmness.</p>
          <p>Connecting with support groups or professional therapists can provide long-term relief.</p>
          
        </section>

        {/* Depression Treatment Section */}
        <section ref={depressionSectionRef} className="anxiety-section animate_animated animatefadeInUp animate_delay-2s">
          <h2 className="anxiety-title">Treatment for Depression</h2>
          <p>Depression is a serious mental condition that requires proper care and treatment.</p>
          <p>Therapy, such as Cognitive Behavioral Therapy (CBT), can help change negative thought patterns.</p>
          <p>Antidepressant medications can be effective in balancing mood-related neurotransmitters.</p>
          <p>Regular exercise releases endorphins, known as "feel-good" hormones.</p>
          <p>Healthy lifestyle habits like proper sleep, diet, and social interactions help alleviate symptoms.</p>
     
        </section>

        {/* Sleep Improvement Section */}
        <section ref={sleepSectionRef} className="anxiety-section animate_animated animatefadeInUp animate_delay-3s">
          <h2 className="anxiety-title">Better Sleep</h2>
          <p>Quality sleep is essential for mental and physical well-being.</p>
          <p>Avoiding caffeine and screen exposure before bedtime improves sleep quality.</p>
          <p>Practicing relaxation techniques like deep breathing and guided meditation promotes better sleep.</p>
          <p>Maintaining a consistent sleep schedule helps regulate the body's circadian rhythm.</p>
          <p>Using white noise or calming sounds can create an ideal sleeping environment.</p>
        </section>

        {/* Nutrition & Supplements Section */}
        <section ref={nutritionSectionRef} className="anxiety-section animate_animated animatefadeInUp animate_delay-4s">
          <h2 className="anxiety-title">Nutrition & Supplements</h2>
          <p>Proper nutrition plays a crucial role in mental health.</p>
          <p>Eating foods rich in omega-3 fatty acids, vitamins, and antioxidants supports brain function.</p>
          <p>Staying hydrated and limiting processed foods can prevent mood fluctuations.</p>
          <p>Supplements like Vitamin D, B-complex, and magnesium contribute to overall well-being.</p>
          <p>Avoiding excessive caffeine and sugar intake prevents energy crashes and mood swings.</p>
        </section>

        {/* Relationship Building Section */}
        <section ref={relationshipsSectionRef} className="anxiety-section animate_animated animatefadeInUp animate_delay-5s">
          <h2 className="anxiety-title">Building Relationships</h2>
          <p>Strong relationships play a vital role in emotional well-being.</p>
          <p>Effective communication and active listening help strengthen bonds with others.</p>
          <p>Spending quality time with loved ones fosters emotional support and trust.</p>
          <p>Practicing gratitude and kindness enhances social connections.</p>
          <p>Seeking professional counseling can help resolve conflicts and improve relationships.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;