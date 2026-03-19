import React, { useEffect, useRef } from "react";

const GlowCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const speed = 0.15; // lower = smoother

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      posX += (mouseX - posX) * speed;
      posY += (mouseY - posY) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveCursor);
    animate();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "rgba(255, 165, 0, 0.7)", // orange glow
        boxShadow: "0 0 20px rgba(255,165,0,0.8), 0 0 40px rgba(255,165,0,0.6)",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default GlowCursor;