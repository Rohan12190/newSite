import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Index() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 right-0 z-50 px-8 py-6 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <ul className="flex gap-8 text-sm font-medium tracking-wide">
          <li>
            <a href="#about" className="hover:text-accent transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-accent transition-colors">
              Projects
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className="hover:text-accent transition-colors"
            >
              Experience
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-accent transition-colors">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-10" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10" />
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            poster="/placeholder.svg"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center space-y-6">
          <div className="space-y-2">
            <p
              className="text-sm uppercase tracking-widest font-sans opacity-0 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Fashion Designer
            </p>
            <h1
              className="text-7xl md:text-8xl font-serif font-bold text-white opacity-0 animate-zoom-fade"
              style={{ animationDelay: "0.4s" }}
            >
              KHUSHI LOHCHAB
            </h1>
          </div>
        </div>

        {/* CTA Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-pulse-soft cursor-pointer">
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section id="about" className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
          {/* Portrait */}
          <div
            className="h-96 md:h-[500px] bg-muted rounded-lg overflow-hidden opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-secondary to-primary/20 flex items-center justify-center">
              <span className="text-muted-foreground text-sm">
                Portrait Image
              </span>
            </div>
          </div>

          {/* Philosophy Text */}
          <div className="space-y-8">
            <h2
              className="text-5xl md:text-6xl font-serif font-bold opacity-0 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Design Philosophy
            </h2>

            <div
              className="space-y-6 text-base md:text-lg leading-relaxed opacity-0 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <p>
                My approach to fashion design merges meticulous technical
                craftsmanship with bold creative vision. Every piece tells a
                story through intentional silhouettes, innovative construction,
                and thoughtful material selection.
              </p>
              <p>
                I believe in designing for the present while honoring textile
                traditions, creating pieces that celebrate individuality and
                empower the wearer. Fashion is not just about aesthetics—it's a
                medium for self-expression and cultural conversation.
              </p>
            </div>
          </div>
        </div>

        {/* Core Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Technical Mastery",
              skills: [
                "Pattern Drafting",
                "Draping",
                "Garment Construction",
              ],
            },
            {
              title: "Creative Expression",
              skills: [
                "Couture Conceptualisation",
                "Editorial Styling",
                "Trend Forecasting",
              ],
            },
            {
              title: "Digital Fluency",
              skills: ["CLO 3D", "Adobe Illustrator", "Photoshop", "Procreate"],
            },
          ].map((skill, idx) => (
            <div
              key={idx}
              className="space-y-4 opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
            >
              <h3 className="text-xl font-serif font-bold text-primary">
                {skill.title}
              </h3>
              <ul className="space-y-2">
                {skill.skills.map((item, i) => (
                  <li key={i} className="text-base text-foreground/80">
                    <span className="font-semibold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 md:py-32 px-6 md:px-12 bg-muted/30"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-16 opacity-0 animate-fade-up">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {[
              {
                name: "The Florentine Hourglass",
                color: "florentine",
                offset: "md:translate-y-0",
              },
              {
                name: "Flying Shark",
                color: "shark",
                offset: "md:translate-y-12",
              },
              {
                name: "Raymond Collection",
                color: "raymond",
                offset: "md:translate-y-0",
              },
              {
                name: "Aquadia",
                color: "aquadia",
                offset: "md:translate-y-12",
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className={`group opacity-0 animate-fade-up ${project.offset}`}
                style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              >
                <div
                  className={`relative h-96 md:h-[450px] bg-gradient-to-br from-${project.color} to-${project.color}/50 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105`}
                >
                  <div className="absolute inset-0 flex items-end justify-start p-8">
                    <h3
                      className={`text-2xl md:text-3xl font-serif font-bold text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300`}
                    >
                      {project.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-16 opacity-0 animate-fade-up">
            Professional Experience
          </h2>

          <div className="space-y-12">
            {[
              {
                role: "Design Apprentice",
                company: "Bhawna Rao",
                description: "Advanced pattern making and couture techniques",
              },
              {
                role: "Jewellery Intern",
                company: "Sangha Collectives",
                description: "Design and curation of contemporary jewellery",
              },
              {
                role: "Retail & Client Liaison",
                company: "Tara Global",
                description:
                  "Client relations and retail strategy development",
              },
            ].map((exp, idx) => (
              <div
                key={idx}
                className="opacity-0 animate-fade-up space-y-2"
                style={{
                  animationDelay: `${0.1 + idx * 0.1}s`,
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <h3 className="text-2xl font-serif font-bold text-primary">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-right">
                    {exp.company}
                  </p>
                </div>
                <p className="text-base text-foreground/70">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer & Contact */}
      <footer
        id="contact"
        className="bg-primary text-primary-foreground py-20 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Contact Info */}
            <div className="space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Contact
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="opacity-70">Email: </span>
                  <a href="mailto:khushi@example.com" className="hover:underline">
                    khushi@example.com
                  </a>
                </p>
                <p>
                  <span className="opacity-70">Phone: </span>
                  <a href="tel:+919876543210" className="hover:underline">
                    +91 98765 43210
                  </a>
                </p>
                <p>
                  <span className="opacity-70">Location: </span>
                  Mumbai, India
                </p>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Education
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">NIFT Mumbai</span>
                  <br />
                  <span className="opacity-70">B.Des 2022-2026</span>
                </p>
                <p>
                  <span className="font-semibold">Royal International School</span>
                  <br />
                  <span className="opacity-70">Higher Secondary 2021</span>
                </p>
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="space-y-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Portfolio
              </h3>
              <a
                href="https://www.behance.net/gallery/221695531/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm hover:underline opacity-90 hover:opacity-100 transition-opacity"
              >
                View Full Portfolio on Behance →
              </a>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-70">
            <p>© 2024 Khushi Lohchab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
