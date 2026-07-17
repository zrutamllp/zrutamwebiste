/* shared slide transition classes — replaces the old styled-jsx .slide/.active */
export function slideClasses(active: boolean) {
  return `absolute inset-0 flex items-center justify-center overflow-y-auto p-4 transition-all duration-500 ease-out ${
    active
      ? "z-10 translate-y-0 opacity-100"
      : "pointer-events-none translate-y-5 opacity-0"
  }`;
}
