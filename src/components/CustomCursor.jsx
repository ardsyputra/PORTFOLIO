import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (reduceMotion || isTouch) return;

    const cursor = document.createElement("div");
    Object.assign(cursor.style, {
      position: "fixed",
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "#f97316",
      boxShadow: "0 0 16px rgba(249, 115, 22, 0.8)",
      pointerEvents: "none",
      zIndex: "999999",
      transform: "translate(-50%, -50%)",
      transition: "width 0.2s cubic-bezier(0.23, 1, 0.32, 1), height 0.2s cubic-bezier(0.23, 1, 0.32, 1), background 0.2s ease, opacity 0.2s ease",
      willChange: "left, top",
    });
    document.body.appendChild(cursor);

    const outline = document.createElement("div");
    Object.assign(outline.style, {
      position: "fixed",
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      border: "1.5px solid rgba(249, 115, 22, 0.6)",
      boxShadow: "0 0 20px rgba(249, 115, 22, 0.2)",
      pointerEvents: "none",
      zIndex: "999998",
      transform: "translate(-50%, -50%)",
      transition: "width 0.28s cubic-bezier(0.23, 1, 0.32, 1), height 0.28s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.2s ease, transform 0.15s ease",
      willChange: "left, top",
    });
    document.body.appendChild(outline);

    let targetX = -100;
    let targetY = -100;
    let outlineX = -100;
    let outlineY = -100;
    let animId;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursor.style.left = `${targetX}px`;
      cursor.style.top = `${targetY}px`;
    };

    const render = () => {
      // Smooth outline lag
      outlineX += (targetX - outlineX) * 0.18;
      outlineY += (targetY - outlineY) * 0.18;
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    const onHover = () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
      cursor.style.background = "rgba(37, 99, 235, 0.8)";
      cursor.style.boxShadow = "0 0 20px rgba(37, 99, 235, 0.9)";
      outline.style.width = "64px";
      outline.style.height = "64px";
      outline.style.borderColor = "rgba(37, 99, 235, 0.8)";
      outline.style.boxShadow = "0 0 24px rgba(37, 99, 235, 0.35)";
    };

    const onLeave = () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.background = "#f97316";
      cursor.style.boxShadow = "0 0 16px rgba(249, 115, 22, 0.8)";
      outline.style.width = "42px";
      outline.style.height = "42px";
      outline.style.borderColor = "rgba(249, 115, 22, 0.6)";
      outline.style.boxShadow = "0 0 20px rgba(249, 115, 22, 0.2)";
    };

    const handleMouseDown = () => {
      outline.style.transform = "translate(-50%, -50%) scale(0.65)";
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    };

    const handleMouseUp = () => {
      outline.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const attach = (el) => {
      el.addEventListener("mouseenter", onHover);
      el.addEventListener("mouseleave", onLeave);
    };

    const selector = "a, button, [role=button], input, select, textarea, label, .cursor-interactive, [data-interactive]";
    document.querySelectorAll(selector).forEach((el) => {
      el.dataset.cursorBound = "1";
      attach(el);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.dataset.cursorBound) {
          el.dataset.cursorBound = "1";
          attach(el);
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
      if (document.body.contains(cursor)) document.body.removeChild(cursor);
      if (document.body.contains(outline)) document.body.removeChild(outline);
    };
  }, [reduceMotion]);

  return null;
}
