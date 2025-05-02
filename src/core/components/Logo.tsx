interface Logo {
  className?: string;
}

export function Logo ({ className }: Logo) {
  return (
    <img
      src="/logo.png"
      alt="Logo de Biblioclase"
      className={`h-auto w-auto object-contain ${className}`}
      draggable={false}
    />
  );
};
