import React from 'react';
import DocumentTitle from '../utils/DocumentTitle';

const About = () => {
  return (
    <DocumentTitle title="About Us">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">About NexShop</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2023, NexShop is a premier e-commerce platform dedicated to providing 
            high-quality products to customers throughout Nepal. What started as a small online 
            store has quickly grown into one of the region's most trusted shopping destinations.
          </p>
          <p className="text-gray-600">
            Our mission is to make online shopping accessible, affordable, and enjoyable for all 
            Nepali consumers, bringing the best products directly to your doorstep with just a 
            few clicks.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Our Values</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li><span className="font-medium text-indigo-600">Customer First:</span> We prioritize your satisfaction above all else.</li>
            <li><span className="font-medium text-indigo-600">Quality Assurance:</span> Every product undergoes rigorous quality checks.</li>
            <li><span className="font-medium text-indigo-600">Transparency:</span> Clear pricing with no hidden fees or charges.</li>
            <li><span className="font-medium text-indigo-600">Local Focus:</span> Supporting Nepali businesses and entrepreneurs.</li>
            <li><span className="font-medium text-indigo-600">Innovation:</span> Constantly improving our platform and services.</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Our Team</h2>
          <p className="text-gray-600 mb-4">
            NexShop is powered by a passionate team of technology enthusiasts, customer service 
            specialists, and e-commerce experts dedicated to creating the best shopping experience 
            for you.
          </p>
          <p className="text-gray-600">
            From our developers who maintain and improve our platform to our customer support team 
            that's always ready to help, we work together with a shared goal: your satisfaction.
          </p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Contact Us</h2>
          <p className="text-gray-600">
            Have questions, suggestions, or feedback? We'd love to hear from you! Visit our Contact 
            page to get in touch with our team.
          </p>
        </div>
      </div>
    </DocumentTitle>
  );
};

export default About;
