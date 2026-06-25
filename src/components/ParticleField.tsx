"use client";

import { useEffect, useRef } from "react";

type ParticleFieldProps = {
  active?: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  target: number;
  alpha: number;
};

const targetCloud = [
  [0.5, 0.48],
  [0.44, 0.45],
  [0.57, 0.45],
  [0.35, 0.42],
  [0.64, 0.4],
  [0.39, 0.58],
  [0.6, 0.58],
  [0.26, 0.35],
  [0.73, 0.35],
  [0.47, 0.68],
  [0.55, 0.68],
] as const;

export function ParticleField({ active = true }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const fieldCanvas = canvas;
    const ctx = context;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const startedAt = performance.now();

    function resize() {
      const rect = fieldCanvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      fieldCanvas.width = Math.floor(width * pixelRatio);
      fieldCanvas.height = Math.floor(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles = createParticles(width, height);
    }

    function createParticles(fieldWidth: number, fieldHeight: number) {
      const count = Math.round(Math.min(Math.max(fieldWidth / 7, 90), 190));

      return Array.from({ length: count }, (_, index) => ({
        x: Math.random() * fieldWidth,
        y: Math.random() * fieldHeight,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.14,
        radius: Math.random() * 1.7 + 0.35,
        target: index % targetCloud.length,
        alpha: Math.random() * 0.55 + 0.2,
      }));
    }

    function draw(now: number) {
      ctx.clearRect(0, 0, width, height);

      const elapsed = now - startedAt;
      const convergence = active && !reducedMotion ? Math.min(Math.max((elapsed - 900) / 3600, 0), 1) : 0.22;

      for (const particle of particles) {
        const [targetX, targetY] = targetCloud[particle.target];
        const destinationX = targetX * width + Math.sin(elapsed / 1800 + particle.target) * 16;
        const destinationY = targetY * height + Math.cos(elapsed / 2200 + particle.target) * 10;
        const pull = convergence * 0.012;

        if (!reducedMotion) {
          particle.vx += (destinationX - particle.x) * pull;
          particle.vy += (destinationY - particle.y) * pull;
          particle.vx *= 0.94;
          particle.vy *= 0.94;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }

        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;
        if (particle.y < -12) particle.y = height + 12;
        if (particle.y > height + 12) particle.y = -12;

        const glow = convergence * 0.5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(143, 247, 214, ${Math.min(particle.alpha + glow, 0.92)})`;
        ctx.shadowColor = "rgba(143, 247, 214, 0.65)";
        ctx.shadowBlur = 8 + glow * 16;
        ctx.arc(particle.x, particle.y, particle.radius + glow, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      if (!reducedMotion) {
        animationFrame = requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    draw(performance.now());

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [active]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
