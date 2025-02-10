import React, { useState, useEffect } from 'react';
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
    const email = loc.state?.email;
    const [cardData, setCardData] = useState( {
      name: '',
      title: '',
      email: '',
      phone: '',
      socialMedia: {linkedin: '', github: '', x: ''},
  
      address: '',
      city: '',
      country: '',
      
      // photo: null as File | null
    });

    useEffect(() => {
      if (email) {
        fetch(`http://localhost:3001/user/${email}`)
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log("Fetched data:", data); 

            setCardData({
              name: data.Name || 'John Doe',
              title: data.Title || '',
              email: data.Email || '@example.com',
              phone: data.Phone || '',
              socialMedia: {
                linkedin: data.Linkedin || '',
                github: data.Github || '',
                x: data.X || '',
              },
              address: data.Address || 'Nieuwezijds Voorburgwal 147',
              city: data.City || 'Amsterdam',
              country: data.Country || 'Netherlands',
            });
          })
          .catch(error => console.error("Error fetching data:", error));
      }
    }, [email]);

    const contentRef = React.useRef(null); // ref for PDF/PNG
    
    async function genPDF() {
        if (contentRef.current) {
          const canvas = await html2canvas(contentRef.current, {scale: 2, useCORS: true });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio);
          pdf.save('Folia_Namecard.pdf')
        }
    };

    async function genPNG() {
      if (contentRef.current) {
        const canvas = await html2canvas(contentRef.current, {scale: 2, backgroundColor: null});
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'Folia_Namecard.png';
        link.click();
      }
    };

// Page layout
    return (
    <>
      <nav className="navbar navbar-dark">
        <a className="mx-auto text-center navbar-text"
          href="/"
        >
          F/&#8498;olia
        </a>

        <button className="navbar-toggler" type="button" 
          data-toggle="collapse" data-target="#navbarNav" 
          aria-controls="navbarNav" aria-expanded="false">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About Us</a>
            </li>
          </ul>
        </div>

      </nav>


      <div className="namecard-container" ref={contentRef}>

        <Header name={cardData.name} title={cardData.title}
          email={cardData.email} phone={cardData.phone}
          socialMedia={{
            linkedin: cardData.socialMedia.linkedin,
            github: cardData.socialMedia.github,
            x: cardData.socialMedia.x
          }} />

        <Details address={cardData.address}
          city={cardData.city} country={cardData.country}/>
      </div>
      <button onClick={genPDF} className="btn btn-danger">Export as PDF</button>
      <button onClick={genPNG} className="btn btn-primary">Export as PNG</button>
      </>
  );
};

const Header = ({ name = "", title = "", email = "", phone = "", socialMedia }: HeaderProps) => (
  <header className="namecard-header">
    <h1>{name}</h1>
    <h3>{title}</h3>
    <div className="contact-info">
      <img src={emailLogo} className='namecard-logo' /> {email}
      <img src={telephoneLogo} className="namecard-logo" /> {phone}
    </div>

    <div className="social-media">
      <img src={linkedinLogo} className='namecard-logo' /> {socialMedia?.linkedin || ""} 
      <img src={githubLogo} className='namecard-logo' /> {socialMedia?.github || ""}
      <img src={xLogo} className='namecard-logo' /> {socialMedia?.x || ""}
    </div>
  </header>
);

const Details = ({ address="", city="", country="" }) => (
  <section className="namecard-section">
    <p>{address}, {city}</p>
    <p>{country}</p>
  </section>
);


export default Namecard;