import { Mark } from "@/components/brand";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper">
      <div className="text-center">
        <Mark className="mx-auto h-16 w-16" />
        <p className="mt-4 text-xs uppercase tracking-[0.28em] text-muted">AH</p>
      </div>
    </div>
  );
}
