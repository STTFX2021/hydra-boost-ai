import { cn } from "@/lib/utils";

/**
 * Logo oficial HydrAI Labs con fondo transparente (WebP).
 * - `tone="light"` (por defecto): marca en blanco, para fondos oscuros/translúcidos.
 * - `tone="dark"`: invierte la marca para fondos claros.
 */
const HYDRAI_LOGO = "/brand/hydrai/hydrai-logo.webp";

interface HydrAILogoProps {
  className?: string;
  alt?: string;
  tone?: "light" | "dark";
}

export const HydrAILogo = ({ className, alt = "HydrAI Labs", tone = "light" }: HydrAILogoProps) => (
  <img
    src={HYDRAI_LOGO}
    alt={alt}
    width={410}
    height={224}
    className={cn("block object-contain", tone === "dark" && "invert", className)}
    loading="eager"
    decoding="async"
  />
);
