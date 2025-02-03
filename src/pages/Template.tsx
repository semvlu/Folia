import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import telephoneLogo from '../assets/telephone.svg';
import emailLogo from '../assets/email.svg';
import linkedinLogo from '../assets/linkedin.svg';
import githubLogo from '../assets/github.svg';
import xLogo from '../assets/twitter-x.svg';
import './Template.css';

const Template = () => {
    const loc = useLocation();
    const formData = loc.state;

    console.log('Passed data:', formData); // Add this line to check the contents of userData

    const contentRef = React.useRef(null); // ref for PDF
    
    const genPDF = async () => {
        if (contentRef.current) {
          const canvas = await html2canvas(contentRef.current);
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio);
          pdf.save('document.pdf')
        }
      };

    return (
    <div className="cv-container">
        <div ref={contentRef}>
            <Header name={formData.name} title={formData.title}
             email={formData.email} phone={formData.phone}
             socialMedia={formData.socialMedia} />
            
            <PersonalDetails birth={formData.birth} address={formData.address}
             city={formData.city} country={formData.country}/>
            <Education />
            <Experience />
            <Skills />
            <p>{formData.description}</p>
            <p>{formData.date}</p>
        </div>
      <button onClick={genPDF} className="btn-export">Export as PDF</button>
    </div>
  );
};

const Header = ({ name="", title="", email="", phone="", socialMedia=null }) => (
  <header className="cv-header">
    <h1>{name}</h1>
    <h3>{title}</h3>
    <p>
      <img src={emailLogo} className='logo' />: {email} | 
      <img src={telephoneLogo} className="logo" />: {phone}
    </p>
    <p>
      <img src={linkedinLogo} className='logo' /> {socialMedia?.linkedin || ""} | 
      <img src={githubLogo} className='logo' /> {socialMedia?.github || ""} | 
      <img src={xLogo} className='logo' /> {socialMedia?.x || ""}
    </p>
  </header>
);

const PersonalDetails = ({ birth="", address="", city="", country="" }) => (
  <section className="cv-section">
    <h2>Personal Details</h2>
    <p>Address: {address}, {city}</p>
    <p>Nationality: {country}</p>
    <p>Date of Birth: {birth}</p>
  </section>
);

const Education = () => (
  <section className="cv-section">
    <h2>Education</h2>
    <ul>
      <li>
        <h3>Bachelor of Science in Computer Science</h3>
        <p>XYZ University, 2015 - 2019</p>
      </li>
      <li>
        <h3>High School Diploma</h3>
        <p>ABC High School, 2010 - 2014</p>
      </li>
    </ul>
  </section>
);

const Experience = () => (
  <section className="cv-section">
    <h2>Work Experience</h2>
    <ul>
      <li>
        <h3>Frontend Developer</h3>
        <p>Company A, 2020 - Present</p>
        <p>Responsibilities:
          <ul>
            <li>Developed responsive web applications using React and Redux.</li>
            <li>Collaborated with designers and backend developers.</li>
            <li>Optimized performance and accessibility.</li>
          </ul>
        </p>
      </li>
      <li>
        <h3>Junior Developer</h3>
        <p>Company B, 2019 - 2020</p>
        <p>Responsibilities:
          <ul>
            <li>Assisted in building web applications using JavaScript and HTML/CSS.</li>
            <li>Performed code reviews and debugging.</li>
          </ul>
        </p>
      </li>
    </ul>
  </section>
);

const Skills = () => (
  <section className="cv-section">
    <h2>Skills</h2>
    <ul>
      <li>JavaScript, React, Redux</li>
      <li>HTML, CSS, SASS</li>
      <li>Node.js, Express</li>
      <li>Git, GitHub</li>
      <li>Agile Development</li>
    </ul>
  </section>
);

export default Template;