import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  if (!formData) {
    // If no formData, redirect back to the form or show a message
    return (
      <div style={containerStyle}>
        <button onClick={() => navigate('/')} style={buttonStyle}>Go Back to Form</button>
      </div>
    );
  }

  // Helper to format keys for display
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase()); 
  };

  // formData object into an array of [key, value] pairs for easy mapping
  const formDataEntries = Object.entries(formData);

  return (
    <div style={containerStyle}>
      <h2 className='bg-black'>Submitted Details</h2>
      <div style={detailsGridStyle}>
        {formDataEntries.map(([key, value]) => (
          
          key !== 'password' && key !== 'phoneCountryCode' && (
            <React.Fragment key={key}>
              <div style={detailLabelStyle}>{formatKey(key)}:</div>
              <div style={detailValueStyle}>
                {key === 'phoneNumber' ? `${formData.phoneCountryCode} ${value}` : value}
              </div>
            </React.Fragment>
          )
        ))}
      </div>
      <button onClick={() => navigate('/')} style={buttonStyle}>Go Back to Form</button>
    </div>
  );
};

const containerStyle = {
  maxWidth: '600px',
  margin: '50px auto',
  padding: '30px',
  border: '1px solid #e0e0e0',
  borderRadius: '10px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',

  fontFamily: 'Arial, sans-serif',
};

const detailsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '15px 20px',
  marginBottom: '30px',
};

const detailLabelStyle = {
  fontWeight: 'bold',
  color: '#555',
  textAlign: 'right',
};

const detailValueStyle = {
  color: '#333',
  wordBreak: 'break-word',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '12px 25px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1em',
  marginTop: '20px',
  display: 'block',
  width: 'fit-content',
  margin: '20px auto 0',
  transition: 'background-color 0.3s ease',
};

export default Details;