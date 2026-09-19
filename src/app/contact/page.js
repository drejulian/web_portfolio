'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
        }
      });
    }, observerOptions);

    document
      .querySelectorAll('[data-animate]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData(e.currentTarget);
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend).toString(),
      });

      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      alert('Unable to send your message. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-full mt-5 md:mt-10 mb-10 md:mb-20">
      <div
        data-animate
        className="bg-white shadow-[0_0_4px_rgba(0,0,0,0.15)] rounded-3xl w-full max-w-full px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 transition-all duration-1000"
        style={{ opacity: 0, transform: 'scale(0.98)' }}
      >
        <div className="flex flex-col justify-between">
          <h1
            data-animate
            className="text-primary font-futura font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] transition-all duration-1000"
            style={{ opacity: 0, transform: 'translateX(-30px)' }}
          >
            Let's Build The <br />
            Future Together
          </h1>

          <div
            data-animate
            className="flex gap-2 items-center mt-12 transition-all duration-1000"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <Image
              src="/svg/gmail.svg"
              alt="gmail"
              width={24}
              height={20}
              className="w-6"
            />
            <p className="font-futura font-book text-primary text-lg md:text-xl border-b border-primary">
              derbitrijulian@gmail.com
            </p>
          </div>
        </div>

        <form
          name="contact"
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 md:gap-10"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div
            data-animate
            className="transition-all duration-1000"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <label className="text-primary font-futura font-book text-xl">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-2 bg-transparent border-b border-primary py-1 font-futura font-book text-lg text-black focus:outline-none"
            />
          </div>

          <div
            data-animate
            className="transition-all duration-1000"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <label className="text-primary font-futura font-book text-xl">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 bg-transparent border-b border-primary py-1 font-futura font-book text-lg text-black focus:outline-none"
            />
          </div>

          <div
            data-animate
            className="transition-all duration-1000"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            <label className="text-primary font-futura font-book text-xl">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="1"
              className="w-full mt-2 bg-transparent border-b border-primary py-1 font-futura font-book text-lg text-black focus:outline-none resize-none "
            />
          </div>

          <div className="mt-4">
            <button
              data-animate
              type="submit"
              className="bg-primary text-white w-full py-3 rounded-full font-futura font-book text-lg hover:bg-opacity-90 transition-all duration-1000"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
