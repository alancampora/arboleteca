import { Tree } from "@/lib/types";
import { useEffect, useState } from "react";
import { AmountByType, countByTreeType } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatisticsProps = {
  trees?: Tree[]; // Mark trees as optional
};

export default function Statistics({ trees = [] }: StatisticsProps) {

  const [amountsByType, setAmountByType] = useState<Array<AmountByType>>([]);
  const [totalTrees, setTotalTrees] = useState<number>(0);

  useEffect(() => {
    setAmountByType(countByTreeType(trees));

  }, [trees]);

  useEffect(() => {

    const total = amountsByType.reduce((acc: number, amount: AmountByType) => acc + amount.count, 0);

    setTotalTrees(total);

  }, [amountsByType]);





  return (
    <Card className="w-full m-10 rounded overflow-hidden">
      <CardHeader className="bg-emerald-500 text-white">
        <CardTitle className="text-xl font-bold">Estadisticas</CardTitle>
      </CardHeader>
      <CardContent className="p-8 bg-orange-200">
        <ul>
          <li className="mb-2">
            <strong>Tipo más común:</strong> {amountsByType[0]?.scientific_name}
          </li>
          <li>
            <strong>Total de árboles:</strong> {totalTrees}
          </li>
        </ul>


      </CardContent>
    </Card>
  )
}

