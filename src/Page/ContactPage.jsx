import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="bg-white min-h-screen py-16 px-6 md:px-12 lg:px-20">
      
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-500 mt-3">
          We'd love to hear from you — get in touch with Vastra.co
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        
        {/* Left - Contact Info */}
        <div className="space-y-8">
          
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <MapPin className="text-orange-500" />
            <div>
              <h3 className="font-semibold text-lg">Address</h3>
              <p className="text-gray-600">
                Ahmedabad, Gujarat, India
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <Phone className="text-orange-500" />
            <div>
              <h3 className="font-semibold text-lg">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm flex items-start gap-4">
            <Mail className="text-orange-500" />
            <div>
              <h3 className="font-semibold text-lg">Email</h3>
              <p className="text-gray-600">support@vastra.co</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                Instagram
              </button>
              <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                Facebook
              </button>
              <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                Twitter
              </button>
            </div>
          </div>

        </div>

        {/* Right - Form */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
          <form className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}