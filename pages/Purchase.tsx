import { useEffect, useRef, useState } from "react";
import styles from "../styles/Purchase.module.css";

export default function Purchase() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const velocityRef = useRef({ x: 1, y: 1 });
  const angleRef = useRef(0);
  const isCurvingRef = useRef(false);
  const curveTimeRef = useRef(0);
  const nextCurveTimeRef = useRef(Math.random() * 3000 + 2000);

  const handleClick = () => {
    window.open("https://suzuri.jp/biga816", "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const MARGIN = 20;
    const SPEED = 1.5; // Speed when moving straight
    const CURVE_SPEED = 3; // Speed when curving

    const animate = () => {
      const currentSpeed = isCurvingRef.current ? CURVE_SPEED : SPEED;

      // Curve handling
      curveTimeRef.current += 16; // Approximately 16ms per frame
      if (curveTimeRef.current >= nextCurveTimeRef.current) {
        if (isCurvingRef.current) {
          // End curve
          isCurvingRef.current = false;
          nextCurveTimeRef.current = Math.random() * 3000 + 2000; // 2-5 seconds
        } else {
          // Start curve
          isCurvingRef.current = true;
          nextCurveTimeRef.current = Math.random() * 500 + 300; // 0.3-0.8 seconds
        }
        curveTimeRef.current = 0;
      }

      // Add rotation to velocity during curve
      if (isCurvingRef.current) {
        const curveAmount = (Math.random() - 0.5) * 0.7; // -0.35 to 0.35 radians
        const angle = Math.atan2(velocityRef.current.y, velocityRef.current.x);
        const newAngle = angle + curveAmount;
        const speed = Math.sqrt(
          velocityRef.current.x ** 2 + velocityRef.current.y ** 2
        );
        velocityRef.current.x = Math.cos(newAngle) * speed;
        velocityRef.current.y = Math.sin(newAngle) * speed;
      }

      setPosition((prev) => {
        let newX = prev.x + velocityRef.current.x * currentSpeed;
        let newY = prev.y + velocityRef.current.y * currentSpeed;

        const maxX = window.innerWidth - MARGIN;
        const maxY = window.innerHeight - MARGIN;

        // Reverse x-axis when hitting horizontal wall
        if (newX <= MARGIN || newX >= maxX) {
          velocityRef.current.x *= -1;
          newX = newX <= MARGIN ? MARGIN : maxX;
        }

        // Reverse y-axis when hitting vertical wall
        if (newY <= MARGIN || newY >= maxY) {
          velocityRef.current.y *= -1;
          newY = newY <= MARGIN ? MARGIN : maxY;
        }

        // Calculate angle for fly's direction
        angleRef.current =
          (Math.atan2(velocityRef.current.y, velocityRef.current.x) * 180) /
            Math.PI +
          90; // +90 degrees to make head point in direction of movement

        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(animate, 16); // Approximately 60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <button
        ref={buttonRef}
        className={styles.purchase}
        aria-label="Purchase"
        onClick={handleClick}
        style={{
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) rotate(${angleRef.current}deg)`,
        }}
      ></button>
    </div>
  );
}
