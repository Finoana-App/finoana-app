import { VerseOfTheDay as VerseOfTheDayType } from '@workspace/types';
import { Card } from '@workspace/ui/components/card';

export function VerseOfTheDay({ title, verse }: Readonly<{ title: string; verse: VerseOfTheDayType }>) {
  console.log(verse)

  return (
    <Card className="from-primary/5 to-accent/10 border-primary/10 shadow-soft mb-6 bg-linear-to-br p-5">
      <p className="text-primary mb-3 text-xs font-medium tracking-wider uppercase">{title}</p>
      <p className="text-foreground mb-3 font-serif text-base leading-relaxed italic">&quot;{verse.passage}&quot;</p>
      <p className="text-primary text-sm font-medium">
        {verse.citation} | {verse.version}
      </p>
    </Card>
  );
}
