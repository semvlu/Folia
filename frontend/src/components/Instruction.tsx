import React from 'react';
import './Instruction.css';
const Instruction = () => {
    return (
        <>
            <div className="accordion" id="accordionPlusMinus">
              { /* data-bs-parent="#accordion": use it only when 1 card 
              shall be shown @ a time */}
              <h1 className="mt-5"><b>Need to Know</b></h1>
              <h2>
                For our old patrons and newbies, here are some instruction guides.
              </h2>

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
                    Welcome back! <br/>
                    Modify directly for the things you want to change. <br/>
                    If you want to keep the things like before, just left it blank. <br/>
                    If you want to delete the things, type "del" (without the quotation marks)
                    in the field.
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
                    Greetings! Fill in what you like!
                  </div>
                </div>
              </div>


            </div>
        </>
    );
};
export default Instruction