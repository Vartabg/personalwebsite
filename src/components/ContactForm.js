import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your server
    console.log('Form submitted:', formData);
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {formStatus.submitted ? (
          <div className={`p-6 mb-6 rounded-md ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} flex items-start`}>
            <div className="mr-4 text-2xl">
              {formStatus.success ? (
                <i className="fas fa-check-circle"></i>
              ) : (
                <i className="fas fa-exclamation-circle"></i>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">
                {formStatus.success ? 'Message Sent!' : 'Error'}
              </h3>
              <p>{formStatus.message}</p>
              {formStatus.success && (
                <button 
                  onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                  className="mt-4 text-blue-600 underline hover:text-blue-800"
                >
                  Send another message
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Get in Touch</h2>
              <p className="text-gray-600">I'd love to hear from you! Fill out the form below to send me a message.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold">Connect With Me</h3>
          <p className="text-gray-600">Find me on these platforms</p>
        </div>
        
        <div className="flex justify-center space-x-6">
          <a href="#" className="group">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-blue-600 transition-colors">
              <i className="fab fa-linkedin-in text-gray-600 group-hover:text-white transition-colors"></i>
            </div>
            <span className="block text-center mt-2 text-sm text-gray-600 group-hover:text-blue-600">LinkedIn</span>
          </a>
          
          <a href="#" className="group">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-gray-800 transition-colors">
              <i className="fab fa-github text-gray-600 group-hover:text-white transition-colors"></i>
            </div>
            <span className="block text-center mt-2 text-sm text-gray-600 group-hover:text-gray-800">GitHub</span>
          </a>
          
          <a href="#" className="group">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-blue-400 transition-colors">
              <i className="fab fa-twitter text-gray-600 group-hover:text-white transition-colors"></i>
            </div>
            <span className="block text-center mt-2 text-sm text-gray-600 group-hover:text-blue-400">Twitter</span>
          </a>
          
          <a href="mailto:example@email.com" className="group">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-red-500 transition-colors">
              <i className="fas fa-envelope text-gray-600 group-hover:text-white transition-colors"></i>
            </div>
            <span className="block text-center mt-2 text-sm text-gray-600 group-hover:text-red-500">Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
