import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCountryCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // (used for initial validation state)
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [touched, setTouched] = useState({}); //

  // Static data for country and city dropdowns
  const countries = [
    { value: '', label: 'Select Country' },
    { value: 'India', label: 'India' },
    { value: 'Bharat', label: 'Bharat' },
  ];

  const citiesByCountry = {
    India: ['Select City', 'Kolkata', 'Jaipur', 'New Jalpai Guri', 'Bangalore'],
    Bharat: ['Select City', 'Noida', 'Pune', 'Patna', 'Hyderabad'],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (!isFormTouched) {
      setIsFormTouched(true);
    }
  };

  // password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          error = `${name.replace(/([A-Z])/g, ' $1').trim()} is required`;
        } else if (value.trim().length < 3) {
          error = `${name.replace(/([A-Z])/g, ' $1').trim()} must be at least 3 characters`;
        }
        break;
      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (value.trim().length < 3) {
          error = 'Username must be at least 3 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
          error = 'Email is invalid';
        } else {
          // Block common temp mail domains
          const tempDomains = [
            'tempmail.com', '10minutemail.com', 'mailinator.com', 'guerrillamail.com',
            'yopmail.com', 'dispostable.com', 'maildrop.cc', 'fakeinbox.com', 'trashmail.com'
          ];
          const emailDomain = value.split('@')[1]?.toLowerCase();
          if (tempDomains.some(domain => emailDomain === domain)) {
            error = 'Temporary email addresses are not allowed';
          }
        }
        break;
      case 'password':
        if (!value.trim()) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters long';
        }
        break;
      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone Number must be 10 digits';
        }
        break;
      case 'country':
        if (!value) {
          error = 'Country is required';
        }
        break;
      case 'city':
        if (!value) {
          error = 'City is required';
        }
        break;
      case 'panNo':
        if (!value.trim()) {
          error = 'PAN Number is required';
        } else if (!/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(value.toUpperCase())) {
          error = 'Invalid PAN Number format (e.g., ABCDE1234F)';
        }
        break;
      case 'aadharNo':
        if (!value.trim()) {
          error = 'Aadhar Number is required';
        } else if (!/^\d{12}$/.test(value)) {
          error = 'Aadhar Number must be 12 digits';
        }
        break;
      default:
        break;
    }
    return error;
  };

  // re-validate form whenever formData changes
  useEffect(() => {
    if (isFormTouched) {
      const newErrors = {};
      Object.keys(formData).forEach((name) => {
        newErrors[name] = validateField(name, formData[name]);
      });
      setErrors(newErrors);
    }
  }, [formData, isFormTouched]);

  // Determine if the form is generally valid
  const isFormValid = () => {
    const newErrors = {};
    Object.keys(formData).forEach((name) => {
      const error = validateField(name, formData[name]);
      if (error) {
        newErrors[name] = error;
      }
    });
    return Object.keys(newErrors).length === 0;
  };


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormTouched(true);

    const formIsValid = isFormValid();

    if (formIsValid) {
      console.log('Form is valid and submitted:', formData);
      navigate('/details', { state: { formData } });
    } else {
      console.log('Form has validation errors:', errors);
      alert('Please correct the errors in the form.');
    }
  };

  // handler
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="max-w-lg mx-auto my-12 p-8 border border-teal-300 rounded-xl shadow-2xl bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-white bg-teal-600 py-3 rounded-lg shadow">Registration Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block mb-1 font-semibold text-teal-700">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
          />
          {touched.firstName && errors.firstName && (
            <span className="text-red-600 text-sm mt-1 block">{errors.firstName}</span>
          )}
        </div>
        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block mb-1 font-semibold text-teal-700">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
          />
          {touched.lastName && errors.lastName && (
            <span className="text-red-600 text-sm mt-1 block">{errors.lastName}</span>
          )}
        </div>
        {/* Username */}
        <div>
          <label htmlFor="username" className="block mb-1 font-semibold text-teal-700">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
          />
          {touched.username && errors.username && (
            <span className="text-red-600 text-sm mt-1 block">{errors.username}</span>
          )}
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-semibold text-teal-700">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
          />
          {touched.email && errors.email && (
            <span className="text-red-600 text-sm mt-1 block">{errors.email}</span>
          )}
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-semibold text-teal-700">Password:</label>
          <div className="flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-2 bg-blue-600 text-white px-3 py-2 rounded"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {touched.password && errors.password && (
            <span className="text-red-600 text-sm mt-1 block">{errors.password}</span>
          )}
        </div>
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block mb-1 font-semibold text-teal-700">Phone No.:</label>
          <div className="flex items-center">
            <select
              name="phoneCountryCode"
              value={formData.phoneCountryCode}
              onChange={handleChange}
              className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
            >
              <option value="+91">+91 (India)</option>
              <option value="+91">+91 (Bharat)</option>
            </select>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g., 9876543210"
              className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
            />
          </div>
          {touched.phoneNumber && errors.phoneNumber && (
            <span className="text-red-600 text-sm mt-1 block">{errors.phoneNumber}</span>
          )}
        </div>
        {/* Country */}
        <div>
          <label htmlFor="country" className="block mb-1 font-semibold text-teal-700">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.label}
              </option>
            ))}
          </select>
          {touched.country && errors.country && (
            <span className="text-red-600 text-sm mt-1 block">{errors.country}</span>
          )}
        </div>
        {/* City */}
        <div>
          <label htmlFor="city" className="block mb-1 font-semibold text-teal-700">City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
            disabled={!formData.country || formData.country === ''}
          >
            {formData.country && citiesByCountry[formData.country] ? (
              citiesByCountry[formData.country].map((city) => (
                <option key={city} value={city === 'Select City' ? '' : city}>
                  {city}
                </option>
              ))
            ) : (
              <option value="">Select City</option>
            )}
          </select>
          {touched.city && errors.city && (
            <span className="text-red-600 text-sm mt-1 block">{errors.city}</span>
          )}
        </div>
        {/* PAN No. */}
        <div>
          <label htmlFor="panNo" className="block mb-1 font-semibold text-teal-700">PAN No.:</label>
          <input
            type="text"
            id="panNo"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., ABCDE1234F"
            className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
          />
          {touched.panNo && errors.panNo && (
            <span className="text-red-600 text-sm mt-1 block">{errors.panNo}</span>
          )}
        </div>
        {/* Aadhar No. */}
        <div>
          <label htmlFor="aadharNo" className="block mb-1 font-semibold text-teal-700">Aadhar No.:</label>
          <input
            type="text"
            id="aadharNo"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g., 123456789012"
            className="w-full p-3 border border-teal-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white text-teal-900"
          />
          {touched.aadharNo && errors.aadharNo && (
            <span className="text-red-600 text-sm mt-1 block">{errors.aadharNo}</span>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg mt-8 self-end font-semibold shadow transition-all duration-300 ${isFormValid() ? 'opacity-100 cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
          disabled={!isFormValid()}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Form;