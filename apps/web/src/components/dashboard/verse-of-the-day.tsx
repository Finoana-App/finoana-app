import { Card } from '@workspace/ui/components/card';

export const verseOfTheDay = {
  text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
  reference: 'Proverbs 3:5-6',
};

export function VerseOfTheDay({ title }: Readonly<{ title: string }>) {
  return (
    <Card className="from-primary/5 to-accent/10 border-primary/10 shadow-soft mb-6 bg-linear-to-br p-5">
      <p className="text-primary mb-3 text-xs font-medium tracking-wider uppercase">{title}</p>
      <p className="text-foreground mb-3 font-serif text-base leading-relaxed italic">
        &quot;{verseOfTheDay.text}&quot;
      </p>
      <p className="text-primary text-sm font-medium">{verseOfTheDay.reference}</p>
    </Card>
  );
}
