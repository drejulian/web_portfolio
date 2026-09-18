'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function About() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document
      .querySelectorAll('[data-animate]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: '/svg/web.svg',
      title: 'Web Development',
      description: 'Responsive web apps focused on usability',
    },
    {
      icon: '/svg/mobile.svg',
      title: 'Mobile Development',
      description: 'Flutter applications built for real-world use.',
    },
    {
      icon: '/svg/iot.svg',
      title: 'IoT Development',
      description: 'Connected systems & sensors',
    },
    {
      icon: '/svg/uiux.svg',
      title: 'UI/UX Design',
      description: 'Clean & intuitive interfaces',
    },
  ];

  const skillCategories = [
    {
      category: 'DEVELOPMENT',
      skills: [
        { name: 'Next.js', icon: '/svg/nextjs.svg' },
        { name: 'Flutter', icon: '/svg/flutter.svg' },
        { name: 'Vue', icon: '/svg/vue.svg' },
        { name: 'Node.js', icon: '/svg/node.svg' },
      ],
    },
    {
      category: 'DATABASE',
      skills: [
        { name: 'Firebase', icon: '/svg/firebase.svg' },
        { name: 'MongoDB', icon: '/svg/mongo.svg' },
        { name: 'PostgreSQL', icon: '/svg/postgresql.svg' },
        { name: 'Supabase', icon: '/svg/supabase.svg' },
      ],
    },
    {
      category: 'IoT',
      skills: [
        { name: 'MQTT', icon: '/svg/mqtt.svg' },
        { name: 'Arduino', icon: '/svg/arduino.svg' },
        { name: 'IoT', icon: '/svg/iot.svg' },
      ],
    },
    {
      category: 'Design',
      skills: [
        { name: 'Figma', icon: '/svg/figma.svg' },
        { name: 'Adobe Illustrator', icon: '/svg/ai.svg' },
        { name: 'Canva', icon: '/svg/canva.svg' },
      ],
    },
  ];

  return (
    <div className="mt-10 md:mt-20">
      <div className="grid gap-6 md:gap-9">
        <div
          data-animate
          className="grid justify-center relative gap-4 md:gap-6 transition-all duration-1000"
          style={{ opacity: 0, transform: 'translateY(50px)' }}
        >
          <h1 className="font-futura font-bold text-[30px] sm:text-[38px] md:text-[48px] text-primary text-center">
            About
          </h1>
          <p className="text-black font-futura font-book text-base sm:text-lg md:text-xl lg:text-2xl text-center px-4 md:px-0 max-w-full mx-auto">
            I'm a Web & Mobile Developer with a background in Informatics
            Engineering and a passion for creating meaningful digital
            experiences. I enjoy turning ideas and real-world problems into
            functional, intuitive, and user-friendly solutions. My experience
            includes developing web and mobile applications, working with
            IoT-based systems, conducting Reverse Vending Machine (RVM)
            research, web scraping, and creating UI/UX designs. I'm interested
            in combining technology, functionality, and design to build products
            that are not only visually appealing but also practical and easy to
            use. I'm always eager to learn, explore new technologies, and
            improve my skills through new projects and challenges.
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 mt-8">
          <h1
            data-animate
            className="font-futura font-bold text-[30px] sm:text-[38px] md:text-[48px] text-primary text-center transition-all duration-1000"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            What I Do
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 px-4 md:px-0 max-w-full mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                data-animate
                className="flex flex-col items-center gap-4 transition-all duration-1000"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="bg-white border border-gray-100 rounded-full w-[100px] h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center shadow-sm">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={60}
                    height={60}
                    className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-futura font-bold text-lg md:text-xl text-black mb-1">
                    {service.title}
                  </h3>
                  <p className="font-futura font-book text-sm md:text-base text-black leading-tight">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 mt-6">
          <h1
            data-animate
            className="font-futura font-bold text-[30px] sm:text-[38px] md:text-[48px] text-primary text-center transition-all duration-1000"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            Skills
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0 max-w-6xl mx-auto">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                data-animate
                className="flex flex-col items-center gap-3 transition-all duration-1000"
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transitionDelay: `${categoryIndex * 100}ms`,
                }}
              >
                <h3 className="font-futura font-bold text-sm md:text-base text-black uppercase">
                  {category.category}
                </h3>
                <div className="bg-white border border-gray-100 rounded-3xl px-6 py-4 flex items-center justify-center gap-4 shadow-sm">
                  {category.skills.map((skill, skillIndex) => (
                    <Image
                      key={skillIndex}
                      src={skill.icon}
                      alt={skill.name}
                      width={40}
                      height={40}
                      className="w-[35px] h-[35px] md:w-[40px] md:h-[40px]"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
