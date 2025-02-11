import React from 'react';
import './Instruction.css';
const Instruction = () => {
    return (
        <>
            <div className="accordion" id="accordionPlusMinus">
              { /* data-bs-parent="#accordion": use it only when 1 card 
              shall be shown @ a time */}
              <h2><b>Need to Know</b></h2>
              <h5>
                For our old patrons and newbies, here are some instruction guides.
              </h5>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#clpse1"
                    aria-expanded="true" 
                    aria-controls="clpse1">
                    Dear Patron
                  </button>
                </h2>
                <div id="clpse1" className="accordion-collapse collapse">
                  <div className="accordion-body text-bidgray">
                    <i>Welcome back! </i><br/>
                    <li>Get your name card by filling in the e-mail and the country / region.</li>
                    <li>Modify directly for the things you want to change.</li>
                    <li>Keep things as used to? Just left it blank!</li>
                    <li>Delete things? Key <kbd>d</kbd> in the field.</li>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#clpse2"
                    aria-expanded="true" aria-controls="clpse2">
                    Newbie
                  </button>
                </h2>
                <div id="clpse2" className="accordion-collapse collapse">
                  <div className="accordion-body text-bidgray">
                    <i>Greetings!</i> Fill in to create your first name card!
                  </div>
                </div>
              </div>


            </div>
        </>
    );
};
export default Instruction