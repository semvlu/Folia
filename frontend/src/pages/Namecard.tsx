import React from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import telephoneLogo from '../assets/telephone.svg';
import emailLogo from '../assets/email.svg';
import linkedinLogo from '../assets/linkedin.svg';
import githubLogo from '../assets/github.svg';
import xLogo from '../assets/twitter-x.svg';
import './Namecard.css';

interface SocialMedia {
  linkedin: string;
  github: string;
  x: string;
}

interface HeaderProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  socialMedia: SocialMedia;
}


const Namecard = () => {
    const loc = useLocation();
    const formData = loc.state;

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

// Page layout
    return (
    <div className="namecard-container">
        <div ref={contentRef}>
            <Header name={formData.name} title={formData.title}
             email={formData.email} phone={formData.phone}
             socialMedia={formData.socialMedia} />
            
            <PersonalDetails birth={formData.birth} address={formData.address}
             city={formData.city} country={formData.country}/>
        </div>

      <button onClick={genPDF} className="btn-export">Export as PDF</button>
    </div>
  );
};

const Header = ({ name = "", title = "", email = "", phone = "", socialMedia }: HeaderProps) => (
  <header className="namecard-header">
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
  <section className="namecard-section">
    <h2>Personal Details</h2>
    <p>Address: {address}, {city}</p>
    <p>Nationality: {country}</p>
    <p>Date of Birth: {birth}</p>
  </section>
);


export default Namecard;