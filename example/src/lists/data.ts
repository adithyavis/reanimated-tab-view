import converter from 'number-to-words';

export type ListItemData = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  height: number;
};

const COLORS = [
  'hsl(210,70%,88%)',
  'hsl(150,60%,86%)',
  'hsl(35,80%,88%)',
  'hsl(320,60%,90%)',
  'hsl(265,60%,90%)',
];

export const createListData = (
  routeKey: string,
  count: number
): ListItemData[] =>
  [...Array(count).keys()].map((index) => ({
    id: `${routeKey}-${index}`,
    title: `${routeKey} item ${converter.toWords(index + 1)}`,
    subtitle: `Row ${index + 1} of ${count}`,
    color: COLORS[index % COLORS.length] as string,
    height: 72 + (index % 5) * 24,
  }));
