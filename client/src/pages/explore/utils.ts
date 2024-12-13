import { Tree } from "@/lib/types";

export type AmountByType = {
    scientific_name: string;
    count: number;
  };

export function countByTreeType(trees: Tree[]) {
    const counts: Record<string, number> = trees.reduce((acc, tree: Tree) => {
    const name = tree.scientific_name;
    acc[name] = (acc[name] || 0) + 1; // Increment count for the name
    return acc;
  }, {} as Record<string, number>);

  const result: AmountByType[] = Object.entries(counts).map(([name, count]) => ({
    scientific_name: name,
    count,
  }));


  const sortedResult = result.sort((a, b) => b.count - a.count);


  return sortedResult;


}
