import React, { useState, MouseEvent } from "react";
import { InputOtp } from "@heroui/input-otp";
import { useForm, Controller } from "react-hook-form";
import "./SubmitBtn_OtpModal.css";

const SubmitBtn_OtpModal = ({ show, onClose, onOtpSubmit, otp, setOtp }) => {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOtpSubmit(otp);
  };

  return (
    <div
      className="modal fade show"
      id="otpModal"
      data-bs-backdrop="static"
      tabIndex={-1}
      data-bs-keyboard="false"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Please enter the OTP sent to your email <br />
              OTP will expire in 10 minutes
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form
              className="d-flex flex-column flex-md-row justify-content-center align-items-center"
              onSubmit={handleSubmit}
            >
              <div className="col-auto mb-2 mb-md-0 otp-input">
                <InputOtp
                  inputMode="numeric"
                  value={otp}
                  onValueChange={setOtp}
                  isRequired
                  length={6}
                />
              </div>
              <div className="col-auto ms-md-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitBtn_OtpModal;
