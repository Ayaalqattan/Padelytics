import React, { useState } from 'react';
import './FAQPage.css';

const FAQPage = () => {
  // State to track which FAQ item is expanded
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle function for expanding/collapsing FAQ items
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // FAQ data array - each object represents one FAQ item
  const faqData = [
    {
      question: "What is Padel Performance Analysis?",
      answer: "Our Padel Performance Analysis is an advanced video-based service that analyzes your padel game using AI and expert review. We process footage of your matches or practice sessions to provide detailed insights about your technique, movement patterns, strategic decisions, and overall performance metrics. This helps players of all levels identify strengths, weaknesses, and specific areas for improvement."
    },
    // {
    //   question: "How does the video analysis process work?",
    //   answer: "The process is simple: Upload your match or practice footage through our website or mobile app. Our system uses AI to track player movements, ball trajectories, and court positioning. Our padel experts then review the AI analysis to provide personalized insights. Within 24-48 hours, you'll receive a comprehensive report with visual data, metrics, and actionable recommendations to improve your game."
    // },
    {
      question: "What equipment do I need to record my games?",
      answer: "For optimal results, we recommend recording with at least 720p resolution from an elevated position behind the court. However, we can analyze footage from most modern smartphones, GoPros, or standard video cameras. The ideal setup is a fixed camera position that captures the entire court, but we can also work with footage that follows player movements. Our app includes guidelines for optimal recording positions and settings."
    },
    {
      question: "What specific metrics and insights will I receive?",
      answer: "Our analysis includes: shot distribution (drive, bandeja, volley, smash), successful shot percentage, movement efficiency, court positioning heat maps, serve effectiveness, error patterns, tactical decision-making evaluation, and comparison with previous performances. For premium subscribers, we also include comparison with professional player benchmarks and personalized drills targeted to improve specific weaknesses."
    },
    {
      question: "Is the service available on both iOS and Android?",
      answer: "Yes, our Padel Performance Analysis app is available for both iOS and Android devices. You can download it from the Apple App Store or Google Play Store. The mobile app offers the same analysis capabilities as our website, plus additional features like quick video recording, trimming, and uploading directly from your device."
    },
    // {
    //   question: "How long does it take to receive my analysis?",
    //   answer: "Standard analyses are delivered within 24-48 hours after uploading your video. Rush orders (available with premium subscriptions) can be delivered within 12 hours. You'll receive a notification via email and in-app when your analysis is ready to view. All analyses remain accessible in your account indefinitely for reference and progress tracking."
    // },
    // {
    //   question: "Can I analyze doubles matches or only singles?",
    //   answer: "Our system is optimized for the standard padel doubles format (2 vs 2), which is the most common form of the game. We can also analyze singles matches, but our movement and positioning insights are particularly valuable for doubles play where court coverage and coordination are crucial. When uploading doubles footage, you can specify which player you want us to focus on primarily."
    // },
    // {
    //   question: "What subscription plans do you offer?",
    //   answer: "We offer several subscription tiers: Basic (2 analyses per month), Standard (5 analyses per month, plus comparative data), Premium (10 analyses per month, rush service, professional benchmarking), and Team/Club plans (customized for coaches managing multiple players). All subscriptions include access to both the web platform and mobile app. We also offer one-time analysis purchases for those who don't want a subscription."
    // },
    // {
    //   question: "Can coaches use this for multiple players?",
    //   answer: "Absolutely! We offer special Team/Club plans designed specifically for coaches. These plans allow you to manage multiple player profiles, compare player performances, track team progress, and create customized training plans based on collective data. Coaches can also add comments and highlights to share specific insights with their players directly through our platform."
    // },
    // {
    //   question: "How accurate is the AI analysis?",
    //   answer: "Our AI system has been trained on thousands of padel matches, including professional tournaments, and achieves over 95% accuracy in shot classification and player tracking. However, what sets our service apart is that all AI analyses are reviewed by certified padel coaches to ensure accuracy and add human expertise to the technical data. This combination provides the most reliable and insightful analysis available."
    // },
    // {
    //   question: "Can I see sample analyses before subscribing?",
    //   answer: "Yes! We provide sample analyses on our website that demonstrate the type of insights and data visualizations you'll receive. Additionally, new users can get one free analysis when they sign up, allowing you to experience the full service with your own gameplay footage before committing to a subscription."
    // },
    // {
    //   question: "Do you offer analysis in languages other than English?",
    //   answer: "Currently, we offer analysis reports in English, Spanish, Swedish, and Arabic. We're continuously adding support for more languages. The interface of both our website and app is available in these languages as well as French, German, Italian, and Portuguese."
    // },
    {
      question: "How can I track my progress over time?",
      answer: "Our platform includes a Progress Dashboard that automatically tracks your key metrics across all your analyzed sessions. You can view trends in your performance, compare specific matches, and see how you're improving in targeted areas. Premium users also receive quarterly progress reports with detailed insights and recommendations based on their improvement trajectory."
    },
    {
      question: "Is my video content secure and private?",
      answer: "Absolutely. We take data privacy very seriously. Your uploaded videos and analysis results are visible only to you (and coaches/teammates you explicitly share them with). We use bank-level encryption for all data transfers and storage. You retain full ownership of your content, and we never use your videos for training our AI without explicit permission."
    },
    // {
    //   question: "Can I cancel my subscription at any time?",
    //   answer: "Yes, you can cancel your subscription at any time through your account settings. If you cancel, you'll continue to have access to the service until the end of your current billing period. You'll also maintain access to all your previously completed analyses even after your subscription ends."
    // }
  ];

  return (
    <div className="faq-page">
      <div className="faq-hero">
        <div className="faq-hero-content">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about Padelytics Performance Analysis service</p>
        </div>
      </div>

      <div className="faq-container">
        <div className="faq-intro">
          <h2>How Can We Help You?</h2>
          <p>Find answers to common questions about Padelytics video analysis service for padel players and coaches. Can't find what you're looking for? Contact our support team for personalized assistance.</p>
        </div>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h2>Still Have Questions?</h2>
          <p>Our team is here to help you get the most out of your padel game analysis.</p>
          <div className="faq-contact-options">
            <div className="contact-option">
              <div className="contact-icon">✉️</div>
              <h3>Email Support</h3>
              <p>Get a response within 24 hours</p>
              <a href="mailto:support@padelanalysis.com" className="contact-button">Email Us</a>
            </div>
            <div className="contact-option">
              <div className="contact-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Available 9am-6pm CET</p>
              <button className="contact-button">Start Chat</button>
            </div>
            <div className="contact-option">
              <div className="contact-icon">📱</div>
              <h3>Phone Support</h3>
              <p>For Premium members</p>
              <a href="tel:+123456789" className="contact-button">Call Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;