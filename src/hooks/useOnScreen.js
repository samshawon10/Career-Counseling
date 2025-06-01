// src/hooks/useOnScreen.js
import { useEffect, useState } from "react";

export default function useOnScreen(ref, rootMargin = "0px") {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, rootMargin]);

  return isVisible;
}
