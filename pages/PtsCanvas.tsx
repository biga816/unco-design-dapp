import { CanvasSpace, Create, Group, Pt } from "pts";
import { useEffect, useRef } from "react";
import styles from "../styles/PtsCanvas.module.css";

const draw = (space: CanvasSpace) => {
  const form = space.getForm();

  const chain = new Group();
  let stretch = false;

  // line
  space.add({
    animate: () => {
      // shorten the line when it's not stretching
      if (chain && chain.length > (stretch ? 100 : 10)) {
        chain.shift();
      }

      form.strokeOnly("#123", 3).line(chain);
      form.fillOnly("#123").point(space.pointer, 10, "circle");
    },

    action: (type: string, px: number, py: number) => {
      // stretch the line when mouse is down
      if (type === "down") {
        stretch = true;
      }
      if (type === "up") {
        stretch = false;
      }

      // add a point to the line when mouse moves
      if (type === "move") {
        chain.push(new Pt(px, py));
      }
    },
  });

  let noiseLine: any = [];

  // wave
  space.add({
    start: () => {
      // Create a line and a grid, and convert them to `Noise` points
      const ln = Create.distributeLinear(
        [
          new Pt(0, space.center.y * 1.5),
          new Pt(space.width, space.center.y * 1.5),
        ],
        20
      );
      noiseLine = Create.noisePts(ln, 0.1, 0.1);
    },

    animate: () => {
      // Use pointer position to change speed
      const speed = space.pointer
        .$subtract(space.center)
        .divide(space.center)
        .abs();

      // Generate noise in a line
      let nps = noiseLine.map((p: any) => {
        p.step(0.01 * (1 - speed.x), 0.03 * speed.y);
        return p.$add(0, p.noise2D() * (space.size.y / 5));
      });

      // Draw wave
      nps = nps.concat([space.size, new Pt(0, space.size.y)]);
      form.fillOnly("rgba(0,140,255,.65)").polygon(nps);
      form.fill("#fff").points(nps, 2, "circle");
    },
  });

  setTimeout(() => space.bindMouse().bindTouch().play(), 0);
};

export default function PtsCanvas() {
  const ptsElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const space = new CanvasSpace("#pts").setup({
      bgcolor: "#fe3",
      resize: true,
      retina: true,
    });

    draw(space);

    return () => {
      ptsElement.current?.children?.[0].remove();
    };
  }, []);

  return <div className={styles.pts} id="pts" ref={ptsElement}></div>;
}
