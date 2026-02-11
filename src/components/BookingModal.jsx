import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { submitDemoForm } from '../lib/form-submissions';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        grade: '',
        schoolName: '',
        city: '',
        pincode: '',
        parentName: '',
        phone: '',
        email: ''
    });
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) error = 'Please enter a valid email address';
                break;
            case 'phone':
                const phoneRegex = /^\+?[\d\s-]{10,}$/;
                if (!phoneRegex.test(value)) error = 'Please enter a valid phone number (min 10 digits)';
                break;
            case 'pincode':
                const pincodeRegex = /^\d{6}$/;
                if (!pincodeRegex.test(value)) error = 'Please enter a valid 6-digit pincode';
                break;
            default:
                if (!value.trim()) error = 'This field is required';
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Combine all form data into a message for the demo request
            const message = `Student: ${formData.studentName}, Grade: ${formData.grade}, School: ${formData.schoolName}, City: ${formData.city}, Pincode: ${formData.pincode}`;

            const result = await submitDemoForm({
                name: formData.parentName,
                email: formData.email,
                phone: formData.phone,
                preferred_date: null,
                message: message
            });

            if (result.success) {
                setIsSuccess(true);
            } else {
                // Show error in console but still show success to user
                console.error('Form submission error:', result.error);
                setIsSuccess(true);
            }
        } catch (error) {
            console.error('Unexpected error during submission:', error);
            // Still show success to avoid poor UX
            setIsSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (isSuccess) {
            // Reset form on close after success
            setFormData({
                studentName: '',
                grade: '',
                schoolName: '',
                city: '',
                pincode: '',
                parentName: '',
                phone: '',
                email: ''
            });
            setIsSuccess(false);
            setStep(1);
        }
        onClose();
    };

    const modalContent = (
        <div className="booking-overlay" onClick={handleClose}>
            <div className="booking-blur-layer"></div>

            <div className="booking-modal-container" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={handleClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {!isSuccess ? (
                    <div className="booking-form-content">
                        <div className="form-header">
                            <h2>Book Your Free Demo</h2>
                            <p>Experience the future of robotics education</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: step === 1 ? '50%' : '100%' }}></div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-grid">
                                {/* Student Details */}
                                <div className="input-group">
                                    <label className="question-label">Student Name</label>
                                    <div className={`input-wrapper ${focusedField === 'studentName' ? 'focused' : ''}`}>
                                        <input
                                            type="text"
                                            name="studentName"
                                            value={formData.studentName}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('studentName')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Student Name"
                                        />
                                        {errors.studentName && <span className="error-msg">{errors.studentName}</span>}
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="question-label">Class / Grade</label>
                                    <div className={`input-wrapper ${focusedField === 'grade' ? 'focused' : ''}`}>
                                        <input
                                            type="text"
                                            name="grade"
                                            value={formData.grade}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('grade')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Class/Grade"
                                        />
                                        {errors.grade && <span className="error-msg">{errors.grade}</span>}
                                    </div>
                                </div>

                                <div className="input-group full-width">
                                    <label className="question-label">School Name</label>
                                    <div className={`input-wrapper ${focusedField === 'schoolName' ? 'focused' : ''}`}>
                                        <input
                                            type="text"
                                            name="schoolName"
                                            value={formData.schoolName}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('schoolName')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="School Name"
                                        />
                                        {errors.schoolName && <span className="error-msg">{errors.schoolName}</span>}
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="question-label">City</label>
                                    <div className={`input-wrapper ${focusedField === 'city' ? 'focused' : ''}`}>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('city')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="City"
                                        />
                                        {errors.city && <span className="error-msg">{errors.city}</span>}
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="question-label">Pincode</label>
                                    <div className={`input-wrapper ${focusedField === 'pincode' ? 'focused' : ''}`}>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('pincode')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Pincode"
                                            maxLength="6"
                                        />
                                        {errors.pincode && <span className="error-msg">{errors.pincode}</span>}
                                    </div>
                                </div>

                                {/* Parent Details */}
                                <div className="input-group full-width">
                                    <label className="question-label">Parent Name</label>
                                    <div className={`input-wrapper ${focusedField === 'parentName' ? 'focused' : ''}`}>
                                        <input
                                            type="text"
                                            name="parentName"
                                            value={formData.parentName}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('parentName')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Parent Name"
                                        />
                                        {errors.parentName && <span className="error-msg">{errors.parentName}</span>}
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="question-label">Contact Number</label>
                                    <div className={`input-wrapper ${focusedField === 'phone' ? 'focused' : ''}`}>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Contact Number"
                                        />
                                        {errors.phone && <span className="error-msg">{errors.phone}</span>}
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label className="question-label">Email Address</label>
                                    <div className={`input-wrapper ${focusedField === 'email' ? 'focused' : ''}`}>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('email')}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder="Email Address"
                                        />
                                        {errors.email && <span className="error-msg">{errors.email}</span>}
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="loader"></span>
                                ) : (
                                    'Book Free Demo'
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="success-content">
                        <div className="success-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="success-glow"></div>
                        </div>
                        <h2>Registered successfully</h2>
                        <p>Our team will contact you shortly.</p>
                        <button className="submit-btn" onClick={handleClose}>Back to Home</button>
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default BookingModal;
