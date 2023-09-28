import { useEffect } from "react";

export default function useOutsideClick(ref, exeptionId, cb) {
  useEffect(() => {
    function handleoutsideClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exeptionId
      ) {
      }
      cb();
    }
    document.addEventListener("mousedown", handleoutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleoutsideClick);
    };
  }, [ref, cb]);
}
