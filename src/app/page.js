import Home from '@/app/home/page';
import About from '@/app/about/page';
import Project from '@/app/project/page';
import Contact from '@/app/contact/page';

export default function Page() {
  return (
    <main>
      <section id="home">
        <Home />
      </section>

      <section id="about" className="scroll-mt-32">
        <About />
      </section>

      <section id="project" className="scroll-mt-32">
        <Project />
      </section>

      <section id="contact" className="scroll-mt-32">
        <Contact />
      </section>
    </main>
  );
}