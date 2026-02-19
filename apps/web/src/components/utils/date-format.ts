export function formatFullDate(date: string | Date): string {
  const dateObj = toValidDate(date);
  if (!dateObj) return 'Invalid date';

  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatRelativeJoinDate(date: string | Date): string {
  const dateObj = toValidDate(date);
  if (!dateObj) return 'Unknown date';

  const now = new Date();
  const diffTime = Math.abs(now.getTime() - dateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
}

export function formatJoinDate(date: string | Date | undefined | null): string {
  const dateObj = toValidDate(date);

  if (!dateObj) {
    console.error('Invalid date provided:', date);
    return 'Invalid date';
  }

  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function toValidDate(date: string | Date | undefined | null): Date | null {
  if (date == null) {
    return null;
  }

  const d = typeof date === 'string' ? new Date(date) : date;

  if (!(d instanceof Date) || Number.isNaN(d.getTime())) {
    return null;
  }

  return d;
}
