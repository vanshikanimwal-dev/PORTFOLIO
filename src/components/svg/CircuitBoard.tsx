export function CircuitBoard({ hot, sent }: { hot: string | null; sent: boolean }) {
  const classFor = (id: string) => {
    if (sent) return "trace is-sent";
    return hot === id ? "trace is-hot" : "trace";
  };

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
      <path className={classFor("name")} d="M40 80 H280 V180 H460" />
      <path className={classFor("email")} d="M40 200 H220 V300 H460" />
      <path className={classFor("subject")} d="M40 340 H300 V420 H460" />
      <path className={classFor("message")} d="M40 500 H260 V560 H700" />
      <circle cx="460" cy="180" r="4" fill="#FF2E9A" />
      <circle cx="460" cy="300" r="4" fill="#8B2CFF" />
      <circle cx="700" cy="560" r="5" fill="#00F0FF" />
    </svg>
  );
}
