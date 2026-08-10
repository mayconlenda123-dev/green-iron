import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroAthlete from "@/assets/hero-athlete.jpg";
import gymWeights from "@/assets/gym-weights.jpg";
import gymCardio from "@/assets/gym-cardio.jpg";
import gymFunctional from "@/assets/gym-functional.jpg";
import gymReception from "@/assets/gym-reception.jpg";
import gymLocker from "@/assets/gym-locker.jpg";
import gymWoman from "@/assets/gym-woman.jpg";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

// ---------- Hooks ----------
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.14 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setP(Math.min(1, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function useScrolled(threshold = 40) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const on = () => setS(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return s;
}

function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setV(Math.floor(eased * to));
            if (t < 1) requestAnimationFrame(step);
            else setV(to);
          };
          requestAnimationFrame(step);
        }
      }
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {v.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

// ---------- Sections ----------
function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const items = [
    ["Início", "#inicio"],
    ["Estrutura", "#estrutura"],
    ["Planos", "#planos"],
    ["Benefícios", "#beneficios"],
    ["Depoimentos", "#depoimentos"],
    ["Contato", "#contato"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2 glass" : "py-4 bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-neon text-primary-foreground shadow-neon transition-transform group-hover:rotate-6">
            <span className="font-display text-lg font-bold">G</span>
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            GREEN<span className="text-neon">IRON</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {items.map(([label, href]) => (
            <a key={href} href={href} className="story-link text-sm text-white/80 hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#planos"
            className="btn-neon hidden sm:inline-flex items-center gap-2 rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Começar Agora
            <i aria-hidden className="fa-solid fa-arrow-right" />
          </a>
          <button
            aria-label="Abrir menu"
            className="lg:hidden grid h-10 w-10 place-items-center rounded-lg glass"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden mx-5 mt-3 rounded-2xl glass p-5">
          <div className="flex flex-col gap-3">
            {items.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-white/85 hover:bg-white/5"
              >
                {label}
              </a>
            ))}
            <a
              href="#planos"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-neon px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Começar Agora
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen w-full overflow-hidden pt-28 pb-16">
      {/* Background image + overlays */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroAthlete}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full radial-glow blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-[520px] w-[520px] rounded-full radial-glow blur-3xl" />
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-0 h-1 w-1 rounded-full bg-neon/60"
              style={{
                left: `${(i * 53) % 100}%`,
                animation: `particle ${8 + (i % 5) * 2}s linear ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="relative">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-neon">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-neon" />
            Nova Unidade Aberta
          </div>

          <h1 className="reveal font-display mt-6 text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-[88px]">
            Forje a<br />
            <span className="text-neon">Melhor Versão</span>
            <br />
            <span className="text-stroke">de Você.</span>
          </h1>

          <p className="reveal mt-7 max-w-xl text-base text-white/70 sm:text-lg">
            Treine em uma academia preparada para transformar seu corpo, sua disciplina e sua qualidade de vida.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#planos"
              className="btn-neon inline-flex items-center gap-2 rounded-full bg-neon px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-neon"
            >
              Começar Agora
              <i aria-hidden className="fa-solid fa-arrow-right" />
            </a>
            <a
              href="#estrutura"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Conhecer Estrutura
            </a>
          </div>

          <div className="reveal mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["+2.5K", "Alunos"],
              ["24/7", "Disponível"],
              ["4.9", "Avaliação"],
            ].map(([k, v]) => (
              <div key={v}>
                <div className="font-display text-2xl font-bold text-white">{k}</div>
                <div className="text-xs uppercase tracking-widest text-white/50">{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal-right relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Big faded number */}
          <div className="absolute -top-16 -right-4 font-display text-[220px] leading-none text-white/[0.04] select-none pointer-events-none">
            01
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-neon-lg">
            <img
              src={heroAthlete}
              alt="Atleta treinando na Green Iron"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            {/* Diagonal lines */}
            <div className="absolute inset-0 diag-lines opacity-40" />
            {/* Floating stat card */}
            <div className="animate-float absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-neon text-primary-foreground font-bold">
                <i aria-hidden className="fa-solid fa-arrow-trend-up" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">Progresso semanal</div>
                <div className="font-display text-lg font-bold text-white">+18% de performance</div>
              </div>
            </div>
          </div>

          {/* Corner geometric detail */}
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl border border-neon/40" />
          <div className="absolute -top-4 -left-4 h-6 w-24 rounded-full bg-neon/80 shadow-neon" />
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 border-y border-white/5 py-5 overflow-hidden">
        <div className="flex animate-marquee gap-14 whitespace-nowrap font-display text-2xl font-bold uppercase tracking-widest text-white/30">
          {Array.from({ length: 2 }).map((_, r) => (
            <div key={r} className="flex gap-14">
              {["Força", "•", "Disciplina", "•", "Tecnologia", "•", "Performance", "•", "Evolução", "•", "Green Iron", "•"].map(
                (w, i) => (
                  <span key={`${r}-${i}`} className={w === "•" ? "text-neon" : ""}>
                    {w}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Diferenciais() {
  const items = [
    { icon: "fa-solid fa-dumbbell", title: "Equipamentos Premium", text: "Máquinas de última geração das melhores marcas do mundo." },
    { icon: "fa-solid fa-user-tie", title: "Personal Trainers", text: "Profissionais certificados para acelerar sua evolução." },
    { icon: "fa-regular fa-clock", title: "Aberta Todos os Dias", text: "Estrutura completa disponível 24 horas, 7 dias por semana." },
    { icon: "fa-solid fa-apple-whole", title: "Acompanhamento Nutricional", text: "Nutricionistas montam o plano ideal para seus objetivos." },
    { icon: "fa-solid fa-chart-line", title: "Evolução Monitorada", text: "Métricas, avaliações e ajustes de plano contínuos." },
    { icon: "fa-solid fa-fire-flame-curved", title: "Ambiente Motivador", text: "Comunidade forte, disciplinada e focada em resultado." },
  ];
  return (
    <section id="beneficios" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-neon">
            Diferenciais
          </div>
          <h2 className="reveal font-display mt-5 text-4xl font-bold sm:text-5xl">
            Tudo o que você precisa para <span className="text-neon">performar</span>.
          </h2>
          <p className="reveal mt-4 text-white/60">
            Uma experiência de treino desenhada para levar você além dos seus limites — com o cuidado que só uma academia premium entrega.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="reveal tilt-card glass-card group relative rounded-2xl p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-2xl text-neon transition-all group-hover:bg-neon group-hover:text-primary-foreground group-hover:shadow-neon">
                <i className={it.icon} />
              </div>
              <h3 className="font-display mt-6 text-xl font-bold">{it.title}</h3>
              <p className="mt-3 text-sm text-white/60">{it.text}</p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-neon/40 to-transparent" />
              <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                <span>0{i + 1}</span>
                <i aria-hidden className="fa-solid fa-arrow-right text-neon opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Estrutura() {
  return (
    <section id="estrutura" className="relative py-28 bg-gradient-to-b from-background via-onyx to-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="reveal text-xs uppercase tracking-[0.2em] text-neon">Estrutura</div>
            <h2 className="reveal font-display mt-4 text-4xl font-bold sm:text-5xl">
              Cada espaço, pensado para o <span className="text-neon">alto desempenho</span>.
            </h2>
          </div>
          <p className="reveal-right max-w-md text-white/60">
            Mais de 2.000 m² divididos entre musculação, cardio, área funcional, recepção e vestiários de padrão hotel.
          </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-2 auto-rows-[260px] lg:auto-rows-[280px]">
          <div className="gallery-item reveal-scale relative rounded-2xl lg:col-span-2 lg:row-span-2">
            <img src={gymWeights} alt="Área de musculação" loading="lazy" width={1400} height={900} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 z-10 text-white">
              <div className="text-xs uppercase tracking-widest text-neon">01</div>
              <div className="font-display text-2xl font-bold">Musculação</div>
            </div>
          </div>
          <div className="gallery-item reveal-scale relative rounded-2xl">
            <img src={gymCardio} alt="Área de cardio" loading="lazy" width={900} height={900} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-xs uppercase tracking-widest text-neon">02</div>
              <div className="font-display text-xl font-bold">Cardio</div>
            </div>
          </div>
          <div className="gallery-item reveal-scale relative rounded-2xl">
            <img src={gymFunctional} alt="Área funcional" loading="lazy" width={900} height={900} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-xs uppercase tracking-widest text-neon">03</div>
              <div className="font-display text-xl font-bold">Funcional</div>
            </div>
          </div>

          <div className="gallery-item reveal-scale relative rounded-2xl lg:col-span-2">
            <img src={gymReception} alt="Recepção" loading="lazy" width={1400} height={700} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-4 left-5 z-10">
              <div className="text-xs uppercase tracking-widest text-neon">04</div>
              <div className="font-display text-xl font-bold">Recepção Premium</div>
            </div>
          </div>
          <div className="gallery-item reveal-scale relative rounded-2xl">
            <img src={gymLocker} alt="Vestiário" loading="lazy" width={900} height={900} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 z-10">
              <div className="text-xs uppercase tracking-widest text-neon">05</div>
              <div className="font-display text-xl font-bold">Vestiários</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Planos() {
  const plans = [
    {
      name: "Starter",
      price: "129",
      tag: "Para começar",
      features: ["Acesso musculação e cardio", "Avaliação física inicial", "Horário comercial", "App de treino"],
      highlight: false,
    },
    {
      name: "Pro",
      price: "199",
      tag: "Mais popular",
      features: ["Acesso completo 24/7", "Aulas coletivas ilimitadas", "Plano nutricional básico", "1 sessão com personal / mês", "App de treino premium"],
      highlight: true,
    },
    {
      name: "Elite",
      price: "349",
      tag: "Experiência completa",
      features: ["Tudo do Pro", "Personal trainer 2x / semana", "Nutricionista dedicado", "Sala VIP e recovery zone", "Acesso a todas as unidades"],
      highlight: false,
    },
  ];
  return (
    <section id="planos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="reveal text-xs uppercase tracking-[0.2em] text-neon">Planos</div>
          <h2 className="reveal font-display mt-4 text-4xl font-bold sm:text-5xl">
            Escolha o plano da <span className="text-neon">sua evolução</span>.
          </h2>
          <p className="reveal mt-4 text-white/60">
            Sem taxa de matrícula. Cancele quando quiser. Suporte total desde o primeiro dia.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`reveal relative rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] ${
                p.highlight
                  ? "bg-gradient-to-b from-secondary to-onyx border border-neon/40 shadow-neon-lg lg:-mt-6 lg:mb-6"
                  : "glass-card hover:border-neon/40"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-neon px-4 py-1 text-[11px] font-bold uppercase tracking-widest text-primary-foreground shadow-neon">
                  Recomendado
                </div>
              )}
              <div className="text-xs uppercase tracking-[0.2em] text-neon">{p.tag}</div>
              <h3 className="font-display mt-3 text-3xl font-bold">{p.name}</h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-sm text-white/50">R$</span>
                <span className="font-display text-6xl font-bold">{p.price}</span>
                <span className="text-sm text-white/50">/mês</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neon/15 text-neon">
                      <i aria-hidden className="fa-solid fa-check text-[10px]" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className={`btn-neon mt-10 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                  p.highlight
                    ? "bg-neon text-primary-foreground shadow-neon"
                    : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Assinar {p.name}
                <i aria-hidden className="fa-solid fa-arrow-right" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    { to: 2500, suffix: "+", label: "Alunos ativos" },
    { to: 15, suffix: " anos", label: "De experiência" },
    { to: 120, suffix: "+", label: "Equipamentos" },
    { to: 98, suffix: "%", label: "Satisfação" },
  ];
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={gymWoman} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.label} className="reveal-scale text-center border-l border-white/10 first:border-l-0 sm:px-6">
              <div className="font-display text-5xl font-bold text-neon sm:text-6xl">
                <Counter to={it.to} suffix={it.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/60">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Depoimentos() {
  const testimonials = [
    { name: "Rafael Mendes", role: "Aluno há 2 anos", img: t1, text: "A estrutura é insana. Os personal trainers realmente entendem do assunto e a evolução aparece em semanas." },
    { name: "Camila Duarte", role: "Aluna há 1 ano", img: t2, text: "Nunca frequentei uma academia tão bem cuidada. A Green Iron mudou minha rotina e minha autoestima." },
    { name: "Bruno Souza", role: "Aluno há 3 anos", img: t3, text: "Ambiente motivador, equipamentos novos e atendimento impecável. Vale cada centavo." },
    { name: "Ana Beatriz", role: "Aluna há 6 meses", img: t2, text: "O acompanhamento nutricional fez toda a diferença. Nunca me senti tão bem." },
    { name: "Diego Ramos", role: "Aluno há 4 anos", img: t3, text: "Já treinei em várias academias. A Green Iron está em outro nível." },
  ];
  const doubled = [...testimonials, ...testimonials];
  return (
    <section id="depoimentos" className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="reveal text-xs uppercase tracking-[0.2em] text-neon">Depoimentos</div>
            <h2 className="reveal font-display mt-4 text-4xl font-bold sm:text-5xl">
              O que dizem <span className="text-neon">nossos alunos</span>.
            </h2>
          </div>
          <div className="reveal-right flex items-center gap-2 text-sm text-white/60">
            <span className="flex gap-0.5 text-neon">{Array.from({ length: 5 }).map((_, i) => (<i key={i} className="fa-solid fa-star" />))}</span>
            <span>4.9 / 5 · 800+ avaliações</span>
          </div>
        </div>
      </div>

      <div className="mt-14 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-5 px-5">
          {doubled.map((t, i) => (
            <article
              key={i}
              className="glass-card w-[360px] shrink-0 rounded-2xl p-7 sm:w-[420px]"
            >
              <div className="flex gap-1 text-neon text-lg">{Array.from({ length: 5 }).map((_, i) => (<i key={i} className="fa-solid fa-star" />))}</div>
              <p className="mt-5 text-white/85 leading-relaxed">"{t.text}"</p>
              <div className="mt-7 flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  width={56}
                  height={56}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-neon/40"
                />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contato" className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="reveal-scale relative overflow-hidden rounded-3xl border border-neon/25 bg-onyx px-6 py-16 text-center sm:px-16 sm:py-24">
          {/* glow */}
          <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full radial-glow blur-3xl" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
          {/* particles */}
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute bottom-0 h-1 w-1 rounded-full bg-neon/60"
              style={{
                left: `${(i * 67) % 100}%`,
                animation: `particle ${6 + (i % 4) * 2}s linear ${i * 0.3}s infinite`,
              }}
            />
          ))}

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-neon/40 bg-neon/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-neon">
              Vaga limitada
            </div>
            <h2 className="font-display mt-6 text-4xl font-bold leading-tight sm:text-6xl">
              Sua Evolução <br className="sm:hidden" />
              <span className="text-neon">Começa Hoje</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Agende um treino experimental gratuito e conheça a academia que está redefinindo o padrão premium no Brasil.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#"
                className="btn-neon inline-flex items-center gap-2 rounded-full bg-neon px-8 py-4 text-sm font-semibold text-primary-foreground shadow-neon"
              >
                Agende um Treino Experimental
                <i aria-hidden className="fa-solid fa-arrow-right" />
              </a>
              <a
                href="#planos"
                className="story-link text-sm text-white/70"
              >
                Ou ver planos disponíveis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-neon text-primary-foreground shadow-neon">
                <span className="font-display font-bold">G</span>
              </span>
              <span className="font-display text-lg font-bold">
                GREEN<span className="text-neon">IRON</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-white/60">
              Academia premium para quem busca alto desempenho, disciplina e uma experiência de treino sem igual.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { key: "ig", icon: "fa-brands fa-instagram", label: "Instagram" },
                { key: "fb", icon: "fa-brands fa-facebook-f", label: "Facebook" },
                { key: "yt", icon: "fa-brands fa-youtube", label: "YouTube" },
                { key: "tt", icon: "fa-brands fa-tiktok", label: "TikTok" },
                { key: "wa", icon: "fa-brands fa-whatsapp", label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.key}
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-neon hover:text-neon hover:rotate-6"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-display text-sm font-bold uppercase tracking-widest text-white">Navegação</div>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {["Início", "Estrutura", "Planos", "Benefícios", "Depoimentos"].map((i) => (
                <li key={i}>
                  <a href={`#${i.toLowerCase()}`} className="story-link">{i}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display text-sm font-bold uppercase tracking-widest text-white">Contato</div>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li className="flex items-center gap-2"><i className="fa-solid fa-phone text-neon" /> +55 (11) 4000-0000</li>
              <li className="flex items-center gap-2 text-neon"><i className="fa-brands fa-whatsapp" /> (11) 99999-0000</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-envelope text-neon" /> contato@greeniron.com.br</li>
            </ul>
          </div>

          <div>
            <div className="font-display text-sm font-bold uppercase tracking-widest text-white">Endereço</div>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2"><i className="fa-solid fa-location-dot text-neon mt-1" /><span>Av. Paulista, 2000<br />Bela Vista — São Paulo/SP</span></li>
              <li className="flex items-center gap-2"><i className="fa-regular fa-clock text-neon" /> Aberto 24h · Todos os dias</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/40 sm:flex-row">
          <div>© {new Date().getFullYear()} Green Iron. Todos os direitos reservados.</div>
          <div className="flex gap-6">
            <a href="#" className="story-link">Termos</a>
            <a href="#" className="story-link">Privacidade</a>
            <a href="#" className="story-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-neon text-primary-foreground shadow-neon transition-all duration-500 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <i aria-hidden className="fa-solid fa-arrow-up" />
    </button>
  );
}

function ProgressBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-neon shadow-neon transition-[width] duration-150"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}

function Landing() {
  useReveal();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProgressBar />
      <Navbar />
      <Hero />
      <Diferenciais />
      <Estrutura />
      <Planos />
      <Stats />
      <Depoimentos />
      <CTA />
      <Footer />
      <BackToTop />
    </main>
  );
}
