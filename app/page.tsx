"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const navItems = [
    ["About", "about"],
    ["Skills", "skills"],
    ["Projects", "projects"],
    ["Experience", "experience"],
    ["Certifications", "certifications"],
    ["Contact", "contact"],
  ] as const;

  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const marker = window.scrollY + 140;
      let current = "";

      for (const [, id] of navItems) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) {
          current = id;
        }
      }

      // Make sure Contact becomes active when the user reaches the bottom.
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (nearBottom) current = "contact";

      setActiveSection(current);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const skillGroups = [
    {
      icon: "AI",
      title: "AI, ML & Computer Vision",
      subtitle: "Machine intelligence and visual perception",
      technologies: ["Python","PyTorch","TensorFlow","Machine Learning","Deep Learning","CNN","RNN","OpenCV","YOLO","OCR"],
    },
    {
      icon: "LLM",
      title: "LLMs, RAG & AI Automation",
      subtitle: "Local AI, retrieval and intelligent workflows",
      technologies: ["LangChain","Ollama","RAG","ChromaDB","Embeddings","Vector Search","AI Agents","n8n","Tool Calling","Prompt Engineering","Webhooks","APIs"],
    },
    {
      icon: "ROS",
      title: "Robotics, Embedded & Systems",
      subtitle: "Connecting intelligent software with hardware",
      technologies: ["ROS2","Arduino","NVIDIA Jetson","Embedded Systems","Sensors","Servo Control","Linux","C / C++","Edge-Cloud Integration"],
    },
    {
      icon: "</>",
      title: "Software & Data",
      subtitle: "Development, integration and data handling",
      technologies: ["JavaScript","TypeScript","SQL","MySQL","Git","GitHub","Docker","JSON","REST APIs","Testing","Debugging","Technical Documentation"],
    },
  ];

  const featuredProjects = [
    {
      number: "01",
      title: "Local Multi-Document RAG Assistant",
      description: "Fully local multi-document RAG application with document ingestion, chunking, embeddings, vector retrieval, local LLM answering, and evaluation.",
      technologies: ["RAG","LangChain","Ollama","ChromaDB","Streamlit"],
      github: "https://github.com/MohammadElayyan117/local-multi-document-rag-assistant",
      image: "/projects/rag-showcase-v5-purple.jpg",
      imageAlt: "Local Multi-Document RAG Assistant interface",
    },
    {
      number: "02",
      title: "Noor — AI Arabic Tutor",
      description: "AI-powered Arabic language tutor for autistic children combining speech, computer vision, animated interaction, embedded hardware, and hybrid edge-cloud AI.",
      technologies: ["AI","Computer Vision","NVIDIA Jetson","Embedded","Edge-Cloud"],
      github: "https://github.com/MohammadElayyan117/noor-ai-arabic-tutor",
      image: "/projects/noor-showcase.jpg",
      imageAlt: "Noor AI Arabic Tutor prototype",
    },
    {
      number: "03",
      title: "AI Invoice OCR & Validation",
      description: "AI workflow that extracts invoice data from images, converts it into structured JSON, and validates totals, tax, currency, and item values.",
      technologies: ["OCR","Vision AI","n8n","JavaScript","Automation"],
      github: "https://github.com/MohammadElayyan117/ai-invoice-ocr-validation",
      image: "/projects/invoice-showcase.jpg",
      imageAlt: "AI invoice OCR and validation workflow with invoice result",
    },
    {
      number: "04",
      title: "Local AI English Speaking Coach",
      description: "Local conversational English coach using browser speech recognition, Ollama, conversation memory, text-to-speech, and configurable correction modes.",
      technologies: ["LLM","Ollama","n8n","Speech","AI Agent"],
      github: "https://github.com/MohammadElayyan117/local-ai-english-speaking-coach",
      image: "/projects/coach-showcase.jpg",
      imageAlt: "Local AI English Speaking Coach interface",
    },
  ];

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-[#070b14]/90 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-4 py-3.5 sm:px-7 sm:py-4 lg:px-10 xl:px-12 2xl:max-w-none 2xl:px-[5vw]">
          <a href="#" className="flex min-w-0 items-center gap-2 text-sm font-bold sm:text-lg">
            <span className="truncate">Mohammad Elayyan</span>
            <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500 sm:h-2.5 sm:w-2.5" />
          </a>

          <div className="hidden items-center gap-8 text-sm md:flex">
            {navItems.map(([label, id]) => {
              const isActive = activeSection === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setActiveSection(id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? "font-semibold text-violet-400"
                      : "text-zinc-300 hover:text-violet-400"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-violet-400 transition-all duration-200 ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <details className="relative md:hidden">
              <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-zinc-200 transition hover:border-violet-400/40 hover:bg-violet-500/10">
                ☰
              </summary>
              <div className="absolute right-0 top-12 w-52 overflow-hidden rounded-2xl border border-white/10 bg-[#0b111e]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
                {navItems.map(([label, id]) => {
                  const isActive = activeSection === id;

                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => {
                        setActiveSection(id);
                        e.currentTarget
                          .closest("details")
                          ?.removeAttribute("open");
                      }}
                      className={`block rounded-xl px-4 py-3 text-sm transition ${
                        isActive
                          ? "bg-violet-500/10 font-semibold text-violet-300"
                          : "text-zinc-300 hover:bg-violet-500/10 hover:text-violet-300"
                      }`}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            </details>

            <a
              href="https://wa.me/962770376117?text=Hi%20Mohammad%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2 text-[11px] font-semibold shadow-lg shadow-violet-600/20 transition hover:scale-105 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Let&apos;s Talk →
            </a>
          </div>
        </nav>
      </header>

      <section className="relative overflow-hidden pb-7 pt-20 sm:pb-7 sm:pt-28 lg:pb-7 lg:pt-24 xl:pb-6 xl:pt-20">
        <div className="absolute left-[15%] top-[20%] h-72 w-72 rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[25%] h-96 w-96 rounded-full bg-blue-700/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 rounded-full bg-cyan-700/10 blur-[150px]" />

        <div className="relative mx-auto grid w-full max-w-[1680px] items-center gap-6 px-5 py-4 sm:px-7 sm:py-7 md:gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:px-10 lg:py-7 xl:px-12 2xl:max-w-none 2xl:px-[5vw] 2xl:py-4">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-zinc-300 backdrop-blur sm:mb-6 sm:px-4 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Intelligent Systems Engineer
            </div>

            <p className="mb-2 text-2xl font-semibold text-zinc-200 sm:text-3xl md:text-4xl">Hi, I&apos;m</p>

            <h1 className="max-w-4xl bg-gradient-to-r from-violet-400 via-purple-400 to-blue-500 bg-clip-text text-4xl font-extrabold leading-tight text-transparent sm:text-5xl md:text-6xl xl:text-7xl">
              Mohammad Elayyan
            </h1>

            <p className="mt-5 text-base font-semibold leading-7 text-zinc-200 sm:text-lg md:text-xl">
              AI/ML <span className="text-violet-400">•</span> RAG & LLMs{" "}
              <span className="text-violet-400">•</span> AI Automation{" "}
              <span className="text-violet-400">•</span> Computer Vision{" "}
              <span className="text-violet-400">•</span> Robotics
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base md:text-lg">
              I build practical intelligent systems that connect AI, automation, computer vision,
              robotics, and embedded technologies — from local RAG applications and AI agents to
              vision-enabled and edge-cloud intelligent systems.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-7 sm:flex sm:flex-wrap">
              <a href="#projects" className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 text-center text-sm font-semibold shadow-xl shadow-violet-600/20 transition hover:-translate-y-1 sm:px-6 sm:py-3.5 sm:text-base">
                View My Projects →
              </a>
              <a href="mailto:mohamadelayyan84@gmail.com" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-zinc-200 transition hover:border-violet-500/50 hover:bg-white/10 sm:px-6 sm:py-3.5 sm:text-base">
                Contact Me
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-400">
              <a href="https://github.com/MohammadElayyan117" target="_blank" rel="noreferrer" className="transition hover:text-white">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/mohammadelayyan1" target="_blank" rel="noreferrer" className="transition hover:text-[#0A66C2]">LinkedIn ↗</a>
              <a href="mailto:mohamadelayyan84@gmail.com" className="transition hover:text-violet-400">Email ↗</a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg 2xl:max-w-xl">
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-violet-600/20 via-blue-600/10 to-transparent blur-3xl" />

            {/* Mobile: compact system snapshot */}
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-4 shadow-2xl backdrop-blur-xl sm:hidden">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400">Building</p>
                  <h2 className="mt-2 text-xl font-bold">Practical AI Systems</h2>
                </div>
                <div className="h-10 w-10 shrink-0 rounded-full border border-violet-500/20 bg-violet-500/[0.04]" />
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                AI • Local LLMs • Automation • Vision • Robotics • Edge
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["RAG","AI Agents","Computer Vision","Robotics"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-zinc-300">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Tablet/Desktop: preserve the approved card */}
            <div className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:block 2xl:p-5">
              <div className="absolute right-6 top-6 h-24 w-24 rounded-full border border-violet-500/20" />
              <div className="absolute right-12 top-12 h-12 w-12 rounded-full border border-blue-500/20" />

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">Building</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">Practical AI Systems</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400 sm:mt-4 sm:text-base sm:leading-7">
                Turning AI, software, robotics, and embedded technologies into working prototypes
                and real-world intelligent systems.
              </p>

              <div className="mt-6 grid gap-2.5 2xl:mt-5">
                {["AI & LLM Applications","RAG & Local AI Systems","Automation & AI Agents","Computer Vision","Robotics & Embedded Systems"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-zinc-200">
                    <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-blue-400" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm text-zinc-500">Current focus</p>
                <p className="mt-1 font-medium text-zinc-200">RAG • Local LLMs • AI Agents • Robotics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative scroll-mt-20 border-t border-white/5 bg-[#090e19] py-7 sm:py-10 lg:py-11 xl:py-10">
        <div className="absolute left-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-violet-700/10 blur-[130px]" />

        <div className="relative mx-auto grid w-full max-w-[1680px] items-center gap-8 px-5 sm:px-7 md:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 xl:px-12 2xl:max-w-none 2xl:px-[5vw]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">About Me</p>

            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Intelligent Systems Engineering
              <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                Built Around Real Projects
              </span>
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-400 sm:mt-7 sm:space-y-5 sm:text-base sm:leading-8">
              <p>
                I&apos;m an Intelligent Systems Engineering graduate focused on building practical systems that combine artificial intelligence, automation, computer vision, robotics, and embedded technologies.
              </p>
              <p>
                My work includes <span className="font-medium text-violet-300">Retrieval-Augmented Generation (RAG)</span>, local LLM applications, AI agents, n8n automation workflows, OCR pipelines, ROS2 robotics systems, and hybrid edge-cloud AI solutions.
              </p>
              <p>
                I enjoy taking ideas from concept to working prototype — connecting software, AI models, APIs, hardware, and automation into complete intelligent systems.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              {["AI / ML","RAG","LLMs","AI Agents","Computer Vision","ROS2","Embedded Systems","Automation"].map((item) => (
                <span key={item} className="rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs text-zinc-300 sm:px-4 sm:py-2 sm:text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-600/10 via-blue-600/10 to-cyan-500/5 blur-3xl" />

            {/* Mobile: same idea, much shorter */}
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d1423]/90 p-4 shadow-2xl sm:hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Intelligent Systems</p>
                  <h3 className="mt-1 text-lg font-bold">From AI to Physical Systems</h3>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">⚡</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ["AI + LLM","RAG • Agents","text-violet-300"],
                  ["Automation","n8n • APIs","text-blue-300"],
                  ["Vision + ROS","OpenCV • ROS2","text-cyan-300"],
                  ["Embedded","Jetson • Arduino","text-emerald-300"],
                ].map(([title, sub, color]) => (
                  <div key={title} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className={`text-xs font-semibold ${color}`}>{title}</p>
                    <p className="mt-1 text-[10px] leading-4 text-zinc-500">{sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet/Desktop: preserve approved layout */}
            <div className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1423]/90 p-6 shadow-2xl sm:block">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Intelligent Systems</p>
                  <h3 className="mt-2 text-2xl font-bold">From AI to Physical Systems</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-xl">⚡</div>
              </div>

              <div className="space-y-3">
                {[
                  ["AI & LLM Layer","RAG • LLMs • AI Agents • Machine Learning","text-violet-300","bg-violet-400"],
                  ["Automation & Software","n8n • APIs • Webhooks • Python","text-blue-300","bg-blue-400"],
                  ["Vision & Robotics","OpenCV • YOLO • ROS2 • Robot Control","text-cyan-300","bg-cyan-400"],
                  ["Embedded & Edge","Arduino • NVIDIA Jetson • Linux • Sensors","text-emerald-300","bg-emerald-400"],
                ].map(([title, sub, textColor, dotColor], index) => (
                  <div key={title}>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-3 sm:rounded-2xl sm:p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`font-semibold ${textColor}`}>{title}</p>
                          <p className="mt-1 hidden text-sm text-zinc-500 sm:block">{sub}</p>
                        </div>
                        <span className={`h-3 w-3 rounded-full ${dotColor}`} />
                      </div>
                    </div>
                    {index < 3 && <div className="ml-5 h-5 w-px bg-gradient-to-b from-violet-500 to-blue-500" />}
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-zinc-500">Approach</p>
                  <p className="mt-1 font-semibold text-zinc-200">Build & Integrate</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-zinc-500">Focus</p>
                  <p className="mt-1 font-semibold text-zinc-200">Practical AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="relative scroll-mt-20 border-t border-white/5 bg-[#070b14] py-7 sm:py-10 lg:py-11 xl:py-10">
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-700/10 blur-[150px]" />

        <div className="relative mx-auto w-full max-w-[1680px] px-5 sm:px-7 lg:px-10 xl:px-12 2xl:max-w-none 2xl:px-[5vw]">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">My Skills</p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Core Technologies</h2>
            <p className="mt-4 leading-7 text-zinc-400">
              Technologies I use across AI, local LLM applications, automation, computer vision, robotics, embedded systems, and software development.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group, index) => (
              <div key={group.title} className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0c1321] p-3 transition duration-300 hover:-translate-y-1 hover:border-violet-500/30 sm:rounded-[1.75rem] sm:p-6 2xl:p-5">
                <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[80px] ${
                  index === 0 ? "bg-violet-600/20" : index === 1 ? "bg-blue-600/20" : index === 2 ? "bg-cyan-600/20" : "bg-emerald-600/20"
                }`} />

                <div className="relative">
                  <div className="flex items-start gap-2 sm:gap-4">
                    <div className={`flex h-10 min-w-10 items-center justify-center rounded-xl border text-xs font-bold sm:h-14 sm:min-w-14 sm:rounded-2xl sm:text-base ${
                      index === 0
                        ? "border-violet-500/20 bg-violet-500/10 text-violet-300"
                        : index === 1
                          ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                          : index === 2
                            ? "border-cyan-500/20 bg-cyan-500/10 text-cyan-300"
                            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                    }`}>
                      {group.icon}
                    </div>

                    <div>
                      <h3 className="text-sm font-bold leading-5 text-zinc-100 sm:text-xl">{group.title}</h3>
                      <p className="mt-1 hidden text-sm text-zinc-500 sm:block">{group.subtitle}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
                    {group.technologies.map((technology) => (
                      <span key={technology} className="rounded-md border border-white/10 bg-black/20 px-2 py-1 text-[9px] leading-4 text-zinc-300 transition group-hover:border-white/15 sm:rounded-lg sm:px-2.5 sm:py-1.5 sm:text-sm">
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 hidden h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent sm:block" />

                  <div className="mt-4 hidden items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-zinc-600 sm:flex sm:text-xs">
                    <span className={`h-2 w-2 rounded-full ${
                      index === 0 ? "bg-violet-400" : index === 1 ? "bg-blue-400" : index === 2 ? "bg-cyan-400" : "bg-emerald-400"
                    }`} />
                    Practical Project Experience
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-[#080d17] py-7 sm:py-10 lg:py-11 xl:py-10"
      >
        <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute right-[5%] top-[45%] h-80 w-80 rounded-full bg-cyan-600/10 blur-[160px]" />

        <div className="relative mx-auto w-full max-w-[1680px] px-5 sm:px-7 lg:px-10 xl:px-12 2xl:max-w-none 2xl:px-[5vw]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-10 bg-violet-400" />
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
                  Featured Projects
                </p>
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Selected Work
                <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent sm:ml-3 sm:inline">
                  That Ships
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Real projects spanning local RAG, multimodal AI, automation,
                computer vision, speech interfaces, robotics, and embedded systems.
              </p>
            </div>

            <a
              href="https://github.com/MohammadElayyan117?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-violet-400/50 hover:bg-violet-500/10"
            >
              View All Projects
              <span className="transition group-hover:translate-x-1">↗</span>
            </a>
          </div>

          {/* Row 1 — RAG + Noor: equal visual weight */}
          <div className="mt-7 grid gap-4 lg:grid-cols-2">
            {/* RAG */}
            <article className="group overflow-hidden rounded-[1.75rem] border border-violet-400/20 bg-[#0c1321] shadow-[0_25px_80px_-55px_rgba(139,92,246,0.8)]">
              <div className="relative h-44 overflow-hidden sm:h-64 xl:h-72">
                <Image
                  src={featuredProjects[0].image}
                  alt={featuredProjects[0].imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1321] via-[#0c1321]/10 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-200 backdrop-blur-xl">
                  <span className="h-2 w-2 rounded-full bg-violet-400" />
                  Flagship • Local AI
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <span className="text-xs font-bold tracking-[0.28em] text-violet-400/75">
                  01 / RAG
                </span>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight lg:text-3xl">
                  {featuredProjects[0].title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {featuredProjects[0].description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredProjects[0].technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-2.5 py-1 text-[11px] font-medium text-violet-100"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                      Focus
                    </p>
                    <p className="mt-1 text-xs font-medium text-zinc-300">
                      Retrieval • Local LLMs • Evaluation
                    </p>
                  </div>

                  <a
                    href={featuredProjects[0].github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 text-violet-200 transition hover:bg-violet-500/20"
                    aria-label="View RAG project"
                  >
                    ↗
                  </a>
                </div>
              </div>
            </article>

            {/* Noor — same size / hierarchy as RAG */}
            <article className="group overflow-hidden rounded-[1.75rem] border border-blue-400/20 bg-[#0c1321] shadow-[0_25px_80px_-55px_rgba(59,130,246,0.65)]">
              <div className="relative h-44 overflow-hidden sm:h-64 xl:h-72">
                <Image
                  src={featuredProjects[1].image}
                  alt={featuredProjects[1].imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1321] via-[#0c1321]/10 to-transparent" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200 backdrop-blur-xl">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  Graduation Project • Multimodal AI
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <span className="text-xs font-bold tracking-[0.28em] text-blue-400/75">
                  02 / MULTIMODAL AI
                </span>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight lg:text-3xl">
                  {featuredProjects[1].title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {featuredProjects[1].description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredProjects[1].technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-2.5 py-1 text-[11px] font-medium text-blue-100"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                      Focus
                    </p>
                    <p className="mt-1 text-xs font-medium text-zinc-300">
                      Speech • Vision • Embedded • Edge-Cloud
                    </p>
                  </div>

                  <a
                    href={featuredProjects[1].github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-200 transition hover:bg-blue-500/20"
                    aria-label="View Noor project"
                  >
                    ↗
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Row 2 — OCR is intentionally larger than Coach and More Work */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-[1.45fr_0.9fr_0.7fr]">
            {/* OCR — strongest card on row 2 */}
            <article className="group overflow-hidden rounded-[1.75rem] border border-cyan-400/20 bg-[#0c1321] shadow-[0_20px_70px_-55px_rgba(34,211,238,0.7)] lg:col-span-2 xl:col-span-1">
              <div className="grid h-full md:grid-cols-[1.15fr_0.85fr] xl:block 2xl:grid 2xl:grid-cols-[1.15fr_0.85fr]">
                <div className="relative h-44 min-h-0 overflow-hidden sm:h-auto sm:min-h-[280px] xl:h-48 xl:min-h-0 2xl:h-auto 2xl:min-h-[300px]">
                  <Image
                    src={featuredProjects[2].image}
                    alt={featuredProjects[2].imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1321] via-transparent to-black/10 2xl:bg-gradient-to-r 2xl:from-transparent 2xl:via-transparent 2xl:to-[#0c1321]" />
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-200 backdrop-blur-xl">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Vision + Validation
                  </div>
                </div>

                <div className="flex flex-col justify-center p-5 sm:p-6">
                  <span className="text-[11px] font-bold tracking-[0.22em] text-cyan-400/80">
                    03 / AI AUTOMATION
                  </span>
                  <h3 className="mt-2 text-2xl font-bold">
                    {featuredProjects[2].title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {featuredProjects[2].description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {featuredProjects[2].technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[10px] text-zinc-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <a
                    href={featuredProjects[2].github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-cyan-100"
                  >
                    View Workflow ↗
                  </a>
                </div>
              </div>
            </article>

            {/* English Coach — smaller than OCR */}
            <article className="group overflow-hidden rounded-[1.75rem] border border-emerald-400/15 bg-[#0c1321]">
              <div className="relative h-32 overflow-hidden sm:h-40">
                <Image
                  src={featuredProjects[3].image}
                  alt={featuredProjects[3].imageAlt}
                  fill
                  sizes="(max-width: 1280px) 50vw, 28vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1321] via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-black/55 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-200 backdrop-blur-xl">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Local Conversational AI
                </div>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-400/75">
                  04 / SPEECH + LLM
                </span>
                <h3 className="mt-2 text-xl font-bold">
                  {featuredProjects[3].title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {featuredProjects[3].description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {featuredProjects[3].technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[10px] text-zinc-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <a
                  href={featuredProjects[3].github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
                >
                  Open Project →
                </a>
              </div>
            </article>

            {/* More Work — intentionally smallest card */}
            <aside className="flex min-h-0 flex-col justify-between rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-4 sm:min-h-[260px] sm:rounded-[1.75rem] sm:p-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-400">
                  More Engineering Work
                </p>
                <h3 className="mt-3 text-xl font-bold">
                  Beyond the Featured Four
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  OpenSooq AI Agent, ROS2 obstacle avoidance, autonomous robotics,
                  CNN transfer learning, NLP applications, and smart systems.
                </p>
              </div>

              <a
                href="https://github.com/MohammadElayyan117?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-violet-300 transition hover:text-violet-200"
              >
                Explore repositories →
              </a>
            </aside>
          </div>
        </div>
      </section>

      {/* Experience / Freelance */}
      <section
        id="experience"
        className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-[#090e19] py-7 sm:py-10 lg:py-11 xl:py-10"
      >
        <div className="absolute left-[4%] top-1/3 h-80 w-80 rounded-full bg-violet-700/10 blur-[150px]" />
        <div className="absolute right-[5%] bottom-0 h-96 w-96 rounded-full bg-blue-700/10 blur-[170px]" />

        <div className="relative mx-auto w-full max-w-[1680px] px-5 sm:px-7 lg:px-10 xl:px-12 2xl:max-w-none 2xl:px-[5vw]">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-violet-400" />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
                Experience & Freelance
              </p>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Applied Engineering
              <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent sm:ml-3 sm:inline">
                Experience
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:mt-5 sm:text-base sm:leading-8">
              Hands-on experience building AI automation workflows, IoT and embedded
              prototypes, RAG systems, computer vision solutions, and integrated
              software-hardware systems.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-[1.35fr_0.65fr] xl:grid-cols-[1fr_1fr_0.72fr]">
            {/* Main experience timeline */}
            <div className="space-y-5 xl:col-span-2 xl:grid xl:grid-cols-2 xl:gap-4 xl:space-y-0">
              {/* Freelance */}
              <article className="group relative overflow-hidden rounded-[1.5rem] border border-violet-400/15 bg-[#0c1321] p-4 shadow-[0_30px_100px_-60px_rgba(139,92,246,0.6)] sm:rounded-[2rem] sm:p-6 md:p-7 2xl:p-5">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-600/10 blur-[90px]" />

                <div className="relative">
                  <div className="relative flex flex-col justify-between gap-3 md:flex-row md:items-start md:gap-5">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-200">
                        <span className="h-2 w-2 rounded-full bg-violet-400" />
                        Freelance • Project-Based
                      </div>

                      <h3 className="mt-5 pr-8 text-xl font-bold leading-tight sm:text-2xl md:pr-0 md:text-3xl">
                        AI Automation, IoT & Intelligent Systems
                      </h3>

                      <p className="mt-2 text-sm font-medium text-zinc-500">
                        Independent Engineering Work
                      </p>
                    </div>

                    <span className="absolute right-0 top-0 text-xs font-bold tracking-[0.25em] text-violet-400/70 md:static md:text-sm">
                      01
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3 md:grid-cols-2">
                    {[
                      {
                        title: "AI Automation",
                        text: "Built multi-step workflows with n8n, APIs, webhooks, JSON, tool integrations, and LLM-based processing.",
                      },
                      {
                        title: "RAG & Local AI",
                        text: "Developed retrieval pipelines, document processing, embeddings, vector search, and local LLM applications.",
                      },
                      {
                        title: "OCR & Data Validation",
                        text: "Created OCR workflows for structured extraction, validation, and reliable machine-readable output.",
                      },
                      {
                        title: "IoT & Embedded Prototyping",
                        text: "Built and integrated embedded prototypes using microcontrollers, sensors, hardware control, and software connectivity.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-xl border border-white/10 bg-black/20 p-3 transition group-hover:border-white/15 sm:rounded-2xl sm:p-5"
                      >
                        <p className="text-sm font-semibold text-zinc-100 sm:text-base">
                          {item.title}
                        </p>
                        <p className="mt-1.5 text-[11px] leading-5 text-zinc-500 sm:mt-2 sm:text-sm sm:leading-6">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Python",
                      "n8n",
                      "RAG",
                      "LLMs",
                      "AI Agents",
                      "APIs",
                      "Webhooks",
                      "OCR",
                      "IoT",
                      "Embedded Systems",
                      "JSON",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>

              {/* Graduation project */}
              <article className="group relative overflow-hidden rounded-[1.5rem] border border-blue-400/15 bg-[#0c1321] p-4 sm:rounded-[2rem] sm:p-6 md:p-7 2xl:p-5">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-600/10 blur-[90px]" />

                <div className="relative">
                  <div className="relative flex flex-col justify-between gap-3 md:flex-row md:items-start md:gap-5">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-400/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        Major Engineering Project
                      </div>

                      <h3 className="mt-5 pr-8 text-xl font-bold leading-tight sm:text-2xl md:pr-0 md:text-3xl">
                        Noor — AI-Powered Arabic Tutor
                      </h3>

                      <p className="mt-2 text-sm font-medium text-zinc-500">
                        Graduation Project • Intelligent Systems Engineering
                      </p>
                    </div>

                    <span className="absolute right-0 top-0 text-xs font-bold tracking-[0.25em] text-blue-400/70 md:static md:text-sm">
                      02
                    </span>
                  </div>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:mt-7 sm:text-base sm:leading-8">
                    Designed and integrated a multimodal Arabic learning system
                    combining speech, computer vision, animated interaction,
                    embedded hardware, and a hybrid edge-cloud architecture.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-7 sm:gap-3">
                    {[
                      "Speech + AI interaction",
                      "Computer vision & tracking",
                      "NVIDIA Jetson edge processing",
                      "Arduino & servo integration",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 text-[11px] leading-5 text-zinc-300 sm:items-center sm:gap-3 sm:px-4 sm:py-3 sm:text-sm"
                      >
                        <span className="h-2 w-2 rounded-full bg-blue-400" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {[
                      "Python",
                      "OpenCV",
                      "NVIDIA Jetson",
                      "Arduino",
                      "Computer Vision",
                      "Speech AI",
                      "Edge-Cloud",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            {/* Side panel */}
            <aside className="relative self-start overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-[#11182a] to-[#0b111e] p-4 sm:rounded-[2rem] sm:p-6">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/15 blur-[100px]" />

              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
                  How I Work
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  Build → Integrate → Validate
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  I focus on turning ideas into working systems by connecting AI
                  models, software, APIs, automation, and hardware.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:block sm:space-y-3">
                  {[
                    ["01", "Build", "Prototype the core solution"],
                    ["02", "Integrate", "Connect tools, APIs & hardware"],
                    ["03", "Validate", "Test outputs and system behavior"],
                    ["04", "Document", "Make the system understandable"],
                  ].map(([number, title, text]) => (
                    <div
                      key={number}
                      className="rounded-xl border border-white/10 bg-black/20 p-3 sm:rounded-2xl sm:p-4"
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-violet-400">
                          {number}
                        </span>

                        <div>
                          <p className="font-semibold text-zinc-100">{title}</p>
                          <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">{text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                    Hands-On Domains
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {[
                      "AI",
                      "Automation",
                      "RAG",
                      "Vision",
                      "IoT",
                      "Robotics",
                      "Embedded",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-violet-400/15 bg-violet-400/[0.05] px-3 py-1.5 text-xs text-violet-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>


      {/* Certifications / Courses */}
      <section
        id="certifications"
        className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-[#070b14] py-7 sm:py-10 lg:py-11 xl:py-10"
      >
        <div className="absolute left-[10%] top-20 h-72 w-72 rounded-full bg-violet-700/10 blur-[140px]" />
        <div className="absolute right-[5%] bottom-10 h-80 w-80 rounded-full bg-blue-700/10 blur-[160px]" />

        <div className="relative mx-auto w-full max-w-[1680px] px-5 sm:px-7 lg:px-10 xl:px-12 2xl:max-w-none 2xl:px-[5vw]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-10 bg-violet-400" />
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
                  Certifications & Courses
                </p>
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Continuous Learning
                <span className="ml-3 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Applied in Practice
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                Technical training across AI, machine learning, LLM automation,
                robotics, ROS2, IoT, embedded systems, and software development.
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-400">
              7 certificates & workshops
            </div>
          </div>

          {/* Three main certifications */}
          <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:mt-7 lg:grid-cols-3 lg:gap-4">
            {[
              {
                title: "AI Automation: Build LLM Apps & AI-Agents with n8n & APIs",
                issuer: "Udemy • Instructor: Arnold Oberleiter",
                meta: "14.5 hours • 2026",
                image: "/certifications/ai-automation-n8n.webp",
                badge: "AI / LLM Automation",
                accent: "text-violet-300",
                border: "border-violet-400/20",
                badgeStyle: "border-violet-400/20 bg-violet-400/[0.07] text-violet-200",
                description: "Practical training in LLM applications, AI agents, workflow automation, n8n, and API-based integrations.",
              },
              {
                title: "Python • Machine Learning • AI",
                issuer: "The Hope International Company",
                meta: "60 hours • 2025",
                image: "/certifications/python-ml-ai.webp",
                badge: "AI / Machine Learning",
                accent: "text-emerald-300",
                border: "border-emerald-400/15",
                badgeStyle: "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-200",
                description: "A 60-hour technical program focused on Python, machine learning, and applied artificial intelligence.",
              },
              {
                title: "Introduction to Robotic Operating System (ROS 2)",
                issuer: "Jordan Engineers Association • 15 training hours",
                meta: "Robotics / ROS2",
                image: "/certifications/ros2-jea.webp",
                badge: "Robotics / ROS2",
                accent: "text-blue-300",
                border: "border-blue-400/15",
                badgeStyle: "border-blue-400/20 bg-blue-400/[0.07] text-blue-200",
                description: "Formal ROS2 fundamentals training through the Young Engineers Committee — Electrical Engineering Division.",
              },
            ].map((certificate) => (
              <article
                key={certificate.title}
                className={`group min-w-[84%] snap-start overflow-hidden rounded-[1.5rem] border bg-[#0c1321] md:min-w-0 md:rounded-[1.75rem] ${certificate.border}`}
              >
                <a
                  href={certificate.image}
                  target="_blank"
                  rel="noreferrer"
                  className="relative block h-40 overflow-hidden bg-white sm:h-52 xl:h-48"
                >
                  <Image
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain p-2 transition duration-500 group-hover:scale-[1.015]"
                  />
                </a>

                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] ${certificate.badgeStyle}`}>
                      {certificate.badge}
                    </span>
                    <span className="text-xs text-zinc-500">{certificate.meta}</span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold leading-7">{certificate.title}</h3>
                  <p className="mt-2 text-xs text-zinc-500">{certificate.issuer}</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{certificate.description}</p>

                  <a
                    href={certificate.image}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition hover:text-white ${certificate.accent}`}
                  >
                    View Certificate ↗
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Additional technical training */}
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-zinc-200">Additional Technical Training</h3>
              <span className="hidden text-xs text-zinc-600 sm:block">Workshops & short courses</span>
            </div>

            <div className="flex snap-x snap-mandatory items-start gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
              {[
                {
                  title: "Robotics & Autonomous Systems",
                  issuer: "Handasa Bbaseta",
                  meta: "2 hours • 15 August 2026",
                  image: "/certifications/robotics-autonomous.webp",
                  accent: "text-cyan-300",
                },
                {
                  title: "Introduction Embedded Systems & IoT",
                  issuer: "Handasa Bbaseta",
                  meta: "2 hours • 5 September",
                  image: "/certifications/embedded-iot.webp",
                  accent: "text-emerald-300",
                },
                {
                  title: "Introduction to the World of Mobile App Development",
                  issuer: "Flasha Academy",
                  meta: "7 August 2026",
                  image: "/certifications/mobile-app-development.webp",
                  accent: "text-blue-300",
                },
                {
                  title: "Introduction to ASP.NET Core Back-End Development",
                  issuer: "Flasha Academy",
                  meta: "14 August 2026",
                  image: "/certifications/aspnet-backend.webp",
                  accent: "text-violet-300",
                },
              ].map((certificate) => (
                <article
                  key={certificate.title}
                  className="group min-w-[72%] snap-start overflow-hidden rounded-[1.3rem] border border-white/10 bg-[#0c1321] sm:min-w-0"
                >
                  <a
                    href={certificate.image}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block h-28 overflow-hidden bg-white"
                  >
                    <Image
                      src={certificate.image}
                      alt={`${certificate.title} certificate`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain p-2 transition duration-500 group-hover:scale-[1.02]"
                    />
                  </a>
                  <div className="p-4">
                    <p className={`text-[9px] font-bold uppercase tracking-[0.15em] ${certificate.accent}`}>
                      Technical Training
                    </p>
                    <h4 className="mt-2 min-h-[40px] text-sm font-bold leading-5 text-zinc-100">
                      {certificate.title}
                    </h4>
                    <p className="mt-2 text-xs text-zinc-500">{certificate.issuer}</p>
                    <p className="mt-1 text-[10px] text-zinc-600">{certificate.meta}</p>
                    <a
                      href={certificate.image}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex text-xs font-semibold text-zinc-300 transition hover:text-white"
                    >
                      View ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What I’m Building Toward */}
      <section
        className="relative overflow-hidden border-t border-white/5 bg-[#090e19] py-7 sm:py-10 lg:py-11 xl:py-10"
      >
        <div className="absolute left-[6%] top-24 h-80 w-80 rounded-full bg-violet-700/10 blur-[150px]" />
        <div className="absolute right-[4%] bottom-0 h-96 w-96 rounded-full bg-cyan-700/10 blur-[170px]" />

        <div className="relative mx-auto w-full max-w-[1680px] px-5 sm:px-7 lg:px-10 xl:px-12 2xl:max-w-none 2xl:px-[5vw]">
          <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="xl:sticky xl:top-24">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-10 bg-violet-400" />
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
                  What I&apos;m Building Toward
                </p>
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                From Strong Prototypes
                <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  to Production AI Systems
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
                My focus is growing deeper across intelligent applications that
                combine AI, retrieval, automation, perception, robotics, and
                edge-connected systems.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-zinc-300 sm:mt-6 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Build • Integrate • Validate • Improve
              </div>
            </div>

            <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:gap-4">
              {[
                {
                  number: "01",
                  title: "Production-Ready RAG & LLM Applications",
                  text: "Building stronger retrieval pipelines, evaluation workflows, local AI applications, and reliable LLM-powered user experiences.",
                  accent: "text-violet-300",
                  dot: "bg-violet-400",
                },
                {
                  number: "02",
                  title: "AI Agents & Intelligent Automation",
                  text: "Designing multi-step agents and automation systems that connect tools, APIs, structured data, and real operational workflows.",
                  accent: "text-blue-300",
                  dot: "bg-blue-400",
                },
                {
                  number: "03",
                  title: "Computer Vision & Multimodal AI",
                  text: "Combining visual perception, OCR, speech, and language models into systems that understand and respond to real-world inputs.",
                  accent: "text-cyan-300",
                  dot: "bg-cyan-400",
                },
                {
                  number: "04",
                  title: "Robotics, IoT & Edge Intelligence",
                  text: "Connecting AI software with embedded hardware, sensors, robotics, and edge devices for practical intelligent systems.",
                  accent: "text-emerald-300",
                  dot: "bg-emerald-400",
                },
              ].map((item) => (
                <article
                  key={item.number}
                  className="group relative min-w-[84%] snap-start overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0c1321] p-4 transition duration-300 hover:-translate-y-1 hover:border-violet-400/25 sm:min-w-0 sm:rounded-[1.6rem] sm:p-5 md:p-6 2xl:p-4"
                >
                  <div className="flex gap-5">
                    <div className="pt-1">
                      <span className={`block h-2.5 w-2.5 rounded-full ${item.dot}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-5">
                        <h3 className={`text-xl font-bold ${item.accent}`}>
                          {item.title}
                        </h3>

                        <span className="font-mono text-xs font-bold tracking-[0.18em] text-zinc-600">
                          {item.number}
                        </span>
                      </div>

                      <p className="mt-3 leading-7 text-zinc-400">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative scroll-mt-20 overflow-hidden border-t border-white/5 bg-[#070b14] py-7 sm:py-10 lg:py-11 xl:py-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/10 blur-[180px]" />

        <div className="relative mx-auto w-full max-w-[1680px] px-5 sm:px-7 lg:px-10 xl:px-12 2xl:max-w-none 2xl:px-[5vw]">
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#11172a] via-[#0d1423] to-[#09111e] shadow-[0_35px_120px_-70px_rgba(139,92,246,0.8)] sm:rounded-[2.2rem]">
            <div className="grid gap-5 p-5 sm:p-6 md:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:p-7 2xl:p-6">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-10 bg-violet-400" />
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
                    Contact
                  </p>
                </div>

                <h2 className="max-w-full break-words text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:max-w-3xl sm:text-4xl md:text-5xl">
                  Let&apos;s Build
                  <span className="block">Something</span>
                  <span className="block bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent sm:ml-3 sm:inline">
                    Intelligent
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:mt-6 sm:text-base sm:leading-8">
                  Open to opportunities across AI, machine learning, RAG,
                  automation, computer vision, robotics, IoT, and intelligent
                  systems engineering.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4">
                  <a
                    href="mailto:mohamadelayyan84@gmail.com"
                    className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 text-center font-semibold shadow-xl shadow-violet-600/20 transition hover:-translate-y-1 sm:px-6"
                  >
                    Send Me an Email →
                  </a>

                  <a
                    href="https://www.linkedin.com/in/mohammadelayyan1"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 text-center font-semibold text-zinc-200 transition hover:border-blue-400/40 hover:bg-white/[0.07] sm:px-6"
                  >
                    LinkedIn ↗
                  </a>
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  {
                    label: "Email",
                    value: "mohamadelayyan84@gmail.com",
                    href: "mailto:mohamadelayyan84@gmail.com",
                    accent: "text-violet-300",
                  },
                  {
                    label: "GitHub",
                    value: "MohammadElayyan117",
                    href: "https://github.com/MohammadElayyan117",
                    accent: "text-blue-300",
                  },
                  {
                    label: "LinkedIn",
                    value: "mohammadelayyan1",
                    href: "https://www.linkedin.com/in/mohammadelayyan1",
                    accent: "text-cyan-300",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "Email" ? undefined : "_blank"}
                    rel={item.label === "Email" ? undefined : "noreferrer"}
                    className="group rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-white/20 hover:bg-black/30 sm:rounded-2xl sm:p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-600">
                          {item.label}
                        </p>
                        <p className={`mt-2 min-w-0 break-all text-sm font-semibold sm:text-base ${item.accent}`}>
                          {item.value}
                        </p>
                      </div>

                      <span className="text-lg text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white">
                        ↗
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 border-t border-white/10 px-5 py-4 text-[11px] leading-5 text-zinc-600 sm:px-8 sm:py-5 sm:text-sm md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
              <p>© 2026 Mohammad Elayyan. Built with Next.js & Tailwind CSS.</p>
              <p>AI • RAG • Automation • Vision • Robotics • IoT</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
