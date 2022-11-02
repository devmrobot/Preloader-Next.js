import React, { useContext, useEffect, useRef, useState } from "react";
import { cursorContext } from "../../context/CursorContext";
import styles from "./Cursor.module.scss";

export default function Cursor() {
  const [mobile, setmobile] = useState(true);
  const Position = useRef({ x: 0, y: 0 });
  const lerpFactor = useRef(0.3);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      updateCursor(e.pageX, e.pageY);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!navigator.userAgent) return;

    if (!isMobile()) setmobile(false);
    else setmobile(true);
  }, []);

  const CURSORCONTEXT = useContext(cursorContext);
  if (!CURSORCONTEXT) return null;
  const { CursorRef } = CURSORCONTEXT;

  function updateCursor(positionX: number, positionY: number) {
    if (!CursorRef?.current || !document) return;

    Position.current.x = lerp(
      Position.current.x,
      positionX,
      lerpFactor.current
    );
    Position.current.y = lerp(
      Position.current.y,
      positionY,
      lerpFactor.current
    );

    CursorRef.current.style.left = `${Position.current.x - 7}px`;
    CursorRef.current.style.top = `${Position.current.y - 8}px`;
  }
  return (
    <>{!mobile && <div ref={CursorRef} className={styles.cursor}></div>}</>
  );
}

function lerp(start: number, end: number, amt: number) {
  return (1 - amt) * start + amt * end;
}

function isMobile() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return true;
  } else if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return true;
  }
  return false;
}
