import { Skeleton } from "@/components/ui/skeleton";

export type CardProps = {
  showSkeleton: boolean;
  title?: string;
  text?: string;
  children?: React.ReactNode;
}

export default function Card({ showSkeleton, title, text, children }: CardProps) {
  return (
    <>
      {showSkeleton && <Skeleton className="max-w-3xl m-4 sm:mx-auto shadow rounded-lg p-6" />}

      {/* Tree Details */}
      {
        !showSkeleton && <div className="max-w-3xl m-4 sm:mx-auto bg-white shadow rounded-lg">
          <div className="bg-emerald-500 p-4 rounded-t-md">
            <h2 className="text-orange-100 text-xl font-semibold text-gray-800">{title}</h2>
          </div>
          <div className="p-4 bg-orange-50">
            {children}
            {<p className="text-justify">{text}</p>}
          </div>
        </div>
      }
    </>


  )
}

