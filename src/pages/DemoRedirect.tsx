import { useEffect } from "react";

const DEMO_URL = "https://sarah-speaks-direct.lovable.app";

export default function DemoRedirect() {
  useEffect(() => {
    window.location.replace(DEMO_URL);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <p className="text-sm text-zinc-400">Abriendo la demo de Sarah...</p>
    </main>
  );
}
