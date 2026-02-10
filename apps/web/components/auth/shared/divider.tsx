export function Divider({ text }: Readonly<{ text: string }>) {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center">
        <div className="border-border w-full border-t" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background text-muted-foreground px-4 text-xs tracking-wider uppercase">{text}</span>
      </div>
    </div>
  );
}
