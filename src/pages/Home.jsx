import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#ffffff] text-gray-800 pt-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[#e6f2fb]">
        <h2 className="text-4xl md:text-5xl font-bold text-[#225082] mb-4">
          Explore Medical Gallery
        </h2>
        <p className="text-gray-700 max-w-2xl mb-6">
          Discover categorized medical images and reports including X-rays, MRI,
          CT scans, and more in a modern, clean interface.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/gallery")}
            className="bg-[#2490EB] text-white px-6 py-3 rounded-xl text-lg hover:bg-[#225082] transition"
          >
            Explore Features
          </button>
          <button
            onClick={() => navigate("/gallery")}
            className="border-2 border-[#2490EB] text-[#2490EB] px-6 py-3 rounded-xl text-lg hover:bg-[#225082] hover:text-white transition"
          >
            See Gallery
          </button>
        </div>
      </section>

      {/* Banner Section 1 */}
      <section className="flex flex-col md:flex-row items-center justify-between py-20 px-8 bg-[#2490EB] text-white rounded-2xl mx-6 my-12 gap-8">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/070/572/692/small/doctor-reviewing-patient-medical-records-online-using-laptop-digital-healthcare-and-telemedicine-concept-photo.jpeg"
          alt="Medical files"
          className="w-full md:w-[500px] md:h-[300px] rounded-2xl shadow-lg"
        />
        <div className="md:w-1/2">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Organize Your Medical Files
          </h3>
          <p className="text-white max-w-lg">
            Easily manage and categorize all your medical images in a single
            secure platform, improving workflow and accessibility.
          </p>
        </div>
      </section>

      {/* Banner Section 2 */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-between py-20 px-8 bg-[#225082] text-white rounded-2xl mx-6 my-12 gap-8">
        <img
          src="https://www.akratech.in/wp-content/uploads/2023/12/Access-records-online-scaled.webp"
          alt="Access anywhere"
          className="w-full md:w-1/2 rounded-2xl shadow-lg"
        />
        <div className="md:w-1/2">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Access Anywhere, Anytime
          </h3>
          <p className="text-white max-w-lg">
            View your medical gallery on any device with a responsive and
            fast-loading interface, keeping your files at your fingertips.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-8 mt-12 bg-[#f0f4f8]">
        <h3 className="text-3xl font-bold text-[#225082] mb-12 text-center">
          Our Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {[
            {
              title: "Categorized Images",
              desc: "X-rays, MRIs, CT scans sorted by category",
              icon: "🖼",
              color: "#2490EB",
            },
            {
              title: "Secure Uploads",
              desc: "Admin can safely upload and manage medical files",
              icon: "🔒",
              color: "#225082",
            },
            {
              title: "Responsive Design",
              desc: "Works perfectly on desktop and mobile",
              icon: "📱",
              color: "#2490EB",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-8 rounded-3xl hover:shadow-lg bg-white text-center`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold`}
                style={{ backgroundColor: feature.color }}
              >
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-[#225082] mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#225082] text-white py-12 px-6 mt-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#2490EB] flex items-center justify-center text-white font-bold text-lg">
                MG
              </div>
              <span className="font-bold text-xl">MedGallery</span>
            </div>
            <p className="text-gray-300">
              MedGallery helps you manage and explore categorized medical images
              securely and efficiently.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-[#2490EB]">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-[#2490EB]">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-[#2490EB]">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-[#2490EB]">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2490EB]">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2490EB]">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2490EB]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2490EB]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-[#2490EB]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2490EB]">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2490EB]">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#2490EB]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-300">
              123 Medical St.
              <br />
              Health City, HC 45678
            </p>
            <p className="text-gray-300 mt-2">Email: support@medgallery.com</p>
            <p className="text-gray-300">Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          © 2026 MedGallery. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
