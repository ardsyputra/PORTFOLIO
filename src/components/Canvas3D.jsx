import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Multi-Object 3D Interactive Cyber Universe
 * Features:
 * 1. Central 3D Faceted Crystal Icosahedron with Glowing Vertices
 * 2. Gyroscopic 3D Orbital Rings with Independent Axes
 * 3. Satellite Orbiting 3D Octahedrons & Diamonds
 * 4. Interactive 3D Depth Constellation Particles with Dynamic Proximity Beams
 * 5. Direct User Interactivity: Drag to spin, mouse deflection, click shockwave
 * 6. Instantaneous Theme Color Adaptation
 */
export default function Canvas3D({ className = "" }) {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3D Rotation & Physics State
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    // Drag-to-rotate interaction
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    // Shockwave pulse
    let shockwaves = [];

    const handlePointerDown = (e) => {
      isDragging = true;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;

      // Trigger 3D shockwave on click
      shockwaves.push({
        radius: 10,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.8,
        speed: 6,
      });
    };

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;

      if (isDragging) {
        const deltaX = e.clientX - lastPointerX;
        const deltaY = e.clientY - lastPointerY;
        dragVelocityY = deltaX * 0.005;
        dragVelocityX = -deltaY * 0.005;
        targetRotY += dragVelocityY;
        targetRotX += dragVelocityX;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
      } else {
        targetRotY = (x / width) * 1.6;
        targetRotX = -(y / height) * 1.6;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 1. Central 3D Icosahedron Geometry
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseScale = Math.min(width, height) * 0.22;

    const rawIcoVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ].map(([x, y, z]) => {
      const len = Math.hypot(x, y, z);
      return [(x / len) * baseScale, (y / len) * baseScale, (z / len) * baseScale];
    });

    const icoEdges = [];
    const threshold = baseScale * 1.15;
    for (let i = 0; i < rawIcoVertices.length; i++) {
      for (let j = i + 1; j < rawIcoVertices.length; j++) {
        const d = Math.hypot(
          rawIcoVertices[i][0] - rawIcoVertices[j][0],
          rawIcoVertices[i][1] - rawIcoVertices[j][1],
          rawIcoVertices[i][2] - rawIcoVertices[j][2]
        );
        if (d < threshold) icoEdges.push([i, j]);
      }
    }

    // 2. Satellite Orbiting 3D Octahedrons
    const rawOctaVertices = [
      [0, 1, 0], [0, -1, 0], [1, 0, 0], [-1, 0, 0], [0, 0, 1], [0, 0, -1]
    ];
    const octaEdges = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ];

    const satellites = [
      { orbitRadius: baseScale * 1.7, speed: 0.016, angle: 0, tilt: 0.35, size: baseScale * 0.22, colorType: 0 },
      { orbitRadius: baseScale * 2.1, speed: -0.012, angle: (Math.PI * 2) / 3, tilt: -0.45, size: baseScale * 0.18, colorType: 1 },
      { orbitRadius: baseScale * 1.9, speed: 0.014, angle: (Math.PI * 4) / 3, tilt: 0.7, size: baseScale * 0.2, colorType: 0 },
    ];

    // 3. Ambient 3D Constellation Particles
    const particleCount = 48;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * baseScale * 4.2,
      y: (Math.random() - 0.5) * baseScale * 4.2,
      z: (Math.random() - 0.5) * baseScale * 4.2,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 0.006 + 0.003,
      angle: Math.random() * Math.PI * 2,
    }));

    // Math 3D Rotation Projection
    const rotatePoint = (x, y, z, ax, ay, az) => {
      // Rotate X
      const y1 = y * Math.cos(ax) - z * Math.sin(ax);
      const z1 = y * Math.sin(ax) + z * Math.cos(ax);
      // Rotate Y
      const x2 = x * Math.cos(ay) + z1 * Math.sin(ay);
      const z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
      // Rotate Z
      const x3 = x2 * Math.cos(az) - y1 * Math.sin(az);
      const y3 = x2 * Math.sin(az) + y1 * Math.cos(az);
      return [x3, y3, z2];
    };

    const project = (x, y, z) => {
      const fov = 750;
      const distance = 950;
      const factor = fov / (distance + z);
      return [x * factor + width / 2, y * factor + height / 2, factor];
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Inertia & drag physics
      if (!isDragging) {
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
        rotX += (targetRotX - rotX) * 0.05 + dragVelocityX + 0.0025;
        rotY += (targetRotY - rotY) * 0.05 + dragVelocityY + 0.0045;
        rotZ += 0.0018;
      } else {
        rotX = targetRotX;
        rotY = targetRotY;
      }

      // Fast, instantaneous theme colors
      const primaryColor = isDark ? "#38bdf8" : "#2563eb";
      const secondaryColor = isDark ? "#fb923c" : "#f97316";
      const beamColor = isDark ? "rgba(56, 189, 248, 0.18)" : "rgba(37, 99, 235, 0.14)";

      // 1. Draw 3D Interactive Shockwaves
      shockwaves.forEach((sw) => {
        sw.radius += sw.speed;
        sw.alpha *= 0.94;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${sw.alpha})`
          : `rgba(249, 115, 22, ${sw.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      shockwaves = shockwaves.filter((sw) => sw.alpha > 0.02);

      // 2. Draw Ambient Constellation Particles with Dynamic Proximity Beams
      const projectedParticles = particles.map((p) => {
        p.angle += p.speed;
        const px = p.x + Math.sin(p.angle) * 14;
        const py = p.y + Math.cos(p.angle) * 14;
        const [rx, ry, rz] = rotatePoint(px, py, p.z, rotX * 0.6, rotY * 0.6, rotZ * 0.4);
        const [sx, sy, factor] = project(rx, ry, rz);
        return { x: sx, y: sy, factor };
      });

      // Proximity beams between close particles
      for (let i = 0; i < projectedParticles.length; i++) {
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const dx = projectedParticles[i].x - projectedParticles[j].x;
          const dy = projectedParticles[i].y - projectedParticles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 75) {
            ctx.beginPath();
            ctx.moveTo(projectedParticles[i].x, projectedParticles[i].y);
            ctx.lineTo(projectedParticles[j].x, projectedParticles[j].y);
            ctx.strokeStyle = beamColor;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      projectedParticles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.factor * 2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(96, 165, 250, ${0.4 * p.factor})` : `rgba(37, 99, 235, ${0.35 * p.factor})`;
        ctx.fill();
      });

      // 3. Draw Dual Gyroscopic 3D Orbital Rings
      const ringConfigs = [
        { radius: baseScale * 1.5, rotOffset: [0.5, -0.4, 0], color: secondaryColor, dash: [4, 6] },
        { radius: baseScale * 1.85, rotOffset: [-0.6, 0.5, 0.3], color: primaryColor, dash: [2, 5] },
      ];

      ringConfigs.forEach(({ radius, rotOffset, color, dash }) => {
        ctx.beginPath();
        const steps = 44;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const rx0 = Math.cos(theta) * radius;
          const ry0 = Math.sin(theta) * radius * 0.35;
          const rz0 = Math.sin(theta) * radius * 0.95;
          const [rx, ry, rz] = rotatePoint(
            rx0,
            ry0,
            rz0,
            rotX + rotOffset[0],
            rotY + rotOffset[1],
            rotZ + rotOffset[2]
          );
          const [sx, sy] = project(rx, ry, rz);
          if (i === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = isDark ? `${color}35` : `${color}40`;
        ctx.lineWidth = 1.6;
        ctx.setLineDash(dash);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 4. Draw Orbiting Satellite Polyhedrons (Octahedrons)
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        const satX = Math.cos(sat.angle) * sat.orbitRadius;
        const satY = Math.sin(sat.angle) * sat.orbitRadius * Math.sin(sat.tilt);
        const satZ = Math.sin(sat.angle) * sat.orbitRadius * Math.cos(sat.tilt);

        // Project satellite vertices
        const satProj = rawOctaVertices.map(([vx, vy, vz]) => {
          // Internal spin + orbital position
          const [ix, iy, iz] = rotatePoint(
            vx * sat.size,
            vy * sat.size,
            vz * sat.size,
            rotX * 2 + sat.angle,
            rotY * 2,
            rotZ * 2
          );
          const [rx, ry, rz] = rotatePoint(ix + satX, iy + satY, iz + satZ, rotX, rotY, rotZ);
          const [sx, sy, factor] = project(rx, ry, rz);
          return { x: sx, y: sy, z: rz, factor };
        });

        const satColor = sat.colorType === 0 ? secondaryColor : primaryColor;

        // Draw satellite edges
        octaEdges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(satProj[i].x, satProj[i].y);
          ctx.lineTo(satProj[j].x, satProj[j].y);
          ctx.strokeStyle = satColor;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });

        // Glowing center dot for each satellite
        const satCenter = satProj.reduce(
          (acc, p) => ({ x: acc.x + p.x / 6, y: acc.y + p.y / 6, factor: p.factor }),
          { x: 0, y: 0, factor: 1 }
        );
        ctx.beginPath();
        ctx.arc(satCenter.x, satCenter.y, 3 * satCenter.factor, 0, Math.PI * 2);
        ctx.fillStyle = satColor;
        ctx.shadowColor = satColor;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Draw Central Primary 3D Icosahedron
      const projectedIco = rawIcoVertices.map(([vx, vy, vz]) => {
        const [rx, ry, rz] = rotatePoint(vx, vy, vz, rotX, rotY, rotZ);
        const [sx, sy, factor] = project(rx, ry, rz);
        return { x: sx, y: sy, z: rz, factor };
      });

      // Draw edges with depth alpha
      icoEdges.forEach(([i, j]) => {
        const p1 = projectedIco[i];
        const p2 = projectedIco[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.18, Math.min(0.9, (avgZ + baseScale) / (baseScale * 2)));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${alpha * 0.75})`
          : `rgba(37, 99, 235, ${alpha * 0.65})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      // Glowing Vertices with dual neon accents
      projectedIco.forEach((p, idx) => {
        const glowRadius = Math.max(2.5, 5 * p.factor);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        const vertexColor = idx % 3 === 0 ? secondaryColor : primaryColor;
        ctx.fillStyle = vertexColor;
        ctx.shadowColor = vertexColor;
        ctx.shadowBlur = isDark ? 16 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={`select-none cursor-grab active:cursor-grabbing ${className}`}
      aria-label="Interactive 3D Universe"
    />
  );
}
