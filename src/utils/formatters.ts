export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatPoints = (points: number): string => {
  return new Intl.NumberFormat('pt-BR').format(points);
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
};

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

export const getDaysUntil = (date: string | Date): number => {
  const target = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const getTierColor = (tier: string): string => {
  const colors: Record<string, string> = {
    Bronze: '#CD7F32',
    Prata: '#C0C0C0',
    Ouro: '#FFD700',
    Elite: '#B9F2FF',
  };
  return colors[tier] || '#CD7F32';
};

export const getTierProgress = (current: number, target: number): number => {
  return Math.min((current / target) * 100, 100);
};
