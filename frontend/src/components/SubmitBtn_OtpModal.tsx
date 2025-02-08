import React, { useState, MouseEvent } from "react";
import { InputOtp } from '@heroui/input-otp';
import { useForm, Controller } from 'react-hook-form';
import './SubmitBtn_OtpModal.css';

const SubmitBtn_OtpModal = () => {
    const [showOtpModal, setShowOtpModal] = useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm();

    const handleClick = (e: MouseEvent) => {
        setShowOtpModal(true);
    }

    const handleClose = () => {
        setShowOtpModal(false);
    }

    const onSubmit = (data: any) => {
        console.log(data);
        // handle OTP submit
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="d-flex flex-column flex-md-row 
                                        justify-content-center align-items-center">
                                        <div className="col-auto mb-2 mb-md-0">
                                            <Controller
                                                name="otp"
                                                control={control}
                                                rules={{ 
                                                    required: "OTP is required", 
                                                    minLength: { value: 6, message: "Please enter a valid OTP" } }}

                                                render={({ field }) => (
                                                    <InputOtp              
                                                        inputMode="numeric"
                                                        {...field}
                                                        isRequired
                                                        validationBehavior="aria" 
                                                        errorMessage={errors.otp ? errors.otp.message as string : ""}
                                                        isInvalid={!!errors.otp}
                                                        length={6}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-auto ms-md-3">
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SubmitBtn_OtpModal;