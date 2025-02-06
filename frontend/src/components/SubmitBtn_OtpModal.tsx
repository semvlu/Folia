import React, { useState, MouseEvent } from "react";
import './SubmitBtn_OtpModal.css';

const SubmitBtn_OtpModal = () => {
    const [showOtpModal, setShowOtpModal] = useState(false);

    const handleClick = (e: MouseEvent) => {
        setShowOtpModal(true);
    }

    const handleClose = () => {
        setShowOtpModal(false);
    }

    return (
        <>
            <button
                className="btn btn-primary"
                onClick={ handleClick }
                data-bs-toggle="modal"
                data-bs-target="#otpModal"
            >
                Submit & Verify OTP (TEST)
            </button>

            { showOtpModal && (                
                <div className="modal fade" 
                    id="otpModal"
                    data-bs-backdrop="static"
                    tabIndex={-1}
                    data-bs-keyboard="false"
                    aria-hidden="true">
 
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Please enter the OTP sent to your email <br/>
                                    OTP will expire in 10 minutes
                                </h5>
                                <button type="button" 
                                    className="btn-close" 
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleClose}>
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="col-auto">
                                        <input type="text" id="otp" name="otp" 
                                        className="form-control" 
                                        inputMode="numeric" required />
                                    </div>
                                    <div className="col-auto">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SubmitBtn_OtpModal;