import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink, Sparkles, Home, User, Briefcase, Mail } from "lucide-react";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import { Timeline } from "@/components/ui/timeline";
import { FloatingNav } from "@/components/ui/floating-navbar";

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
        className={`fixed top-0 right-0 z-50 px-8 py-6 transition-all duration-500 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <ul className="flex gap-8 text-sm font-semibold tracking-wider">
          <li>
            <a
              href="#about"
              className="hover:text-accent transition-colors duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="hover:text-accent transition-colors duration-300"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#experience"
              className="hover:text-accent transition-colors duration-300"
            >
              Experience
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-accent transition-colors duration-300"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Bento Hero Section */}
      <section className="relative pt-20 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px] md:auto-rows-[350px]">
          {/* Main Hero Box - Spans 2 cols x 2 rows */}
          <div
            className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group cursor-pointer relative opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&h=800&fit=crop"
              alt="Khushi Lohchab"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 z-20">
              <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
                Fashion Designer
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-white">
                KHUSHI
              </h1>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-accent">
                LOHCHAB
              </h1>
            </div>
          </div>

          {/* Top Right - Small accent box */}
          <div
            className="rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-md border border-primary/30 p-6 flex flex-col justify-between opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Sparkles className="w-8 h-8 text-accent" />
            <div>
              <p className="text-accent text-xs uppercase tracking-widest font-semibold">
                Specialty
              </p>
              <h3 className="text-lg font-serif font-bold mt-2">
                Couture Design
              </h3>
            </div>
          </div>

          {/* Middle Right - Image box */}
          <div
            className="rounded-2xl overflow-hidden opacity-0 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <img
              src="https://images.unsplash.com/photo-1595777712933-a3f0b06755c9?w=600&h=350&fit=crop"
              alt="Fashion Design"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Bottom Left - Stats */}
          <div
            className="rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-md border border-secondary/30 p-6 flex flex-col justify-between opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div>
              <p className="text-accent text-xs uppercase tracking-widest font-semibold">
                Experience
              </p>
              <h3 className="text-3xl font-serif font-bold mt-3">5+</h3>
            </div>
            <p className="text-sm text-foreground/70">Years in Fashion</p>
          </div>

          {/* Bottom Middle - CTA Box */}
          <div
            className="rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-md border border-accent/30 p-6 flex items-center justify-center opacity-0 animate-fade-up hover:border-accent/60 transition-colors duration-300 cursor-pointer group"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="text-center">
              <ChevronDown className="w-6 h-6 text-accent mx-auto mb-2 group-hover:translate-y-1 transition-transform duration-300" />
              <p className="text-sm font-semibold">Scroll to explore</p>
            </div>
          </div>

          {/* Bottom Right - Another image */}
          <div
            className="rounded-2xl overflow-hidden opacity-0 animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <img
              src="https://images.unsplash.com/photo-1578689327459-bda7361f54a5?w=600&h=350&fit=crop"
              alt="Elegant Fashion"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section
        id="about"
        className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-16">
          {/* Portrait */}
          <div
            className="h-96 md:h-[500px] rounded-2xl overflow-hidden opacity-0 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src="https://images.unsplash.com/photo-1549887534-7197a03d3fdc?w=600&h=700&fit=crop"
              alt="Portrait"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Philosophy Text */}
          <div className="space-y-8">
            <div>
              <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-4">
                About Me
              </p>
              <h2
                className="text-5xl md:text-6xl font-serif font-bold opacity-0 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Design Philosophy
              </h2>
            </div>

            <div
              className="space-y-6 text-base md:text-lg leading-relaxed opacity-0 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-foreground/90">
                My approach to fashion design merges meticulous technical
                craftsmanship with bold creative vision. Every piece tells a
                story through intentional silhouettes, innovative construction,
                and thoughtful material selection.
              </p>
              <p className="text-foreground/90">
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
                "Couture Design",
                "Editorial Styling",
                "Trend Forecasting",
              ],
            },
            {
              title: "Digital Fluency",
              skills: ["CLO 3D", "Adobe Suite", "Procreate"],
            },
          ].map((skill, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-accent/50 transition-colors duration-300 opacity-0 animate-fade-up"
              style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
            >
              <h3 className="text-xl font-serif font-bold text-accent mb-6">
                {skill.title}
              </h3>
              <ul className="space-y-3">
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

      {/* Portfolio Gallery Section */}
      <div id="projects">
        <PortfolioGallery
          title="Complete Portfolio Gallery"
          archiveButton={{
            text: "View all works",
            href: "#contact",
          }}
          className="mb-0"
        />
      </div>

      {/* Experience Section */}
      <section id="experience">
        <Timeline
          data={[
            {
              title: "Design Apprentice",
              content: (
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-accent">
                    Bhawna Rao
                  </p>
                  <p className="text-base text-foreground/80">
                    Advanced pattern making and couture techniques. Worked
                    extensively on bespoke garment construction, learning
                    intricate hand stitching methods and precision in draping.
                  </p>
                </div>
              ),
            },
            {
              title: "Jewellery Intern",
              content: (
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-accent">
                    Sangha Collectives
                  </p>
                  <p className="text-base text-foreground/80">
                    Design and curation of contemporary jewellery. Collaborated
                    on sustainable design practices and created pieces that
                    blended traditional craftsmanship with modern aesthetics.
                  </p>
                </div>
              ),
            },
            {
              title: "Retail & Client Liaison",
              content: (
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-accent">
                    Tara Global
                  </p>
                  <p className="text-base text-foreground/80">
                    Client relations and retail strategy development. Managed
                    customer interactions, understood market dynamics, and
                    contributed to business growth through strategic retail
                    partnerships.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Footer & Contact */}
      <footer
        id="contact"
        className="bg-gradient-to-b from-card to-background py-20 px-6 md:px-12 border-t border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-accent text-xs uppercase tracking-widest font-semibold mb-4">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Let's Create Something Beautiful
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Contact Info */}
            <div
              className="space-y-6 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Contact
              </h3>
              <div className="space-y-3">
                <p className="text-sm">
                  <span className="text-muted-foreground">Email: </span>
                  <a
                    href="mailto:khushi@example.com"
                    className="text-accent hover:underline"
                  >
                    khushi@example.com
                  </a>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Phone: </span>
                  <a
                    href="tel:+919876543210"
                    className="text-accent hover:underline"
                  >
                    +91 98765 43210
                  </a>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Location: </span>
                  <span>Mumbai, India</span>
                </p>
              </div>
            </div>

            {/* Education */}
            <div
              className="space-y-6 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Education
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold">NIFT Mumbai</p>
                  <p className="text-muted-foreground">B.Des 2022-2026</p>
                </div>
                <div>
                  <p className="font-semibold">Royal International School</p>
                  <p className="text-muted-foreground">Higher Secondary 2021</p>
                </div>
              </div>
            </div>

            {/* Portfolio Link */}
            <div
              className="space-y-6 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-lg font-semibold uppercase tracking-wide">
                Portfolio
              </h3>
              <a
                href="https://www.behance.net/gallery/221695531/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all text-sm font-semibold"
              >
                View Full Portfolio
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Khushi Lohchab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
