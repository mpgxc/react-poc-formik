export const distinctByKey = ({
  key,
  arr,
}: {
  key: string;
  arr: Array<Record<string, any>>;
}) => [...new Map(arr.map((item) => [item[key], item])).values()];
