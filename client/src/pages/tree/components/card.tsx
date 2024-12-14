import { Skeleton } from "@/components/ui/skeleton";

export type CardProps = {
  showSkeleton: boolean;
  title: string;
  text: string;
}

export default function Card({ showSkeleton, title, text }: CardProps) {
  return (
    <>
      {showSkeleton && <Skeleton className="max-w-3xl mx-auto mt-8 shadow rounded-lg p-6" />}

      {/* Tree Details */}
      {
        !showSkeleton && <div className="max-w-3xl mx-auto mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-justify">{text}</p>
        </div>
      }
    </>


  )
}

