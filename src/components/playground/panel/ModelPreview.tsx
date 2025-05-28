import { Model } from "@/lib/core/IModel";
import { SquareArrowOutUpRight } from "lucide-react";
import { providerLogo } from "@/lib/definitions";
import Image from "next/image";

export function ModelPreview({ model }: { model: Model }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-8/12 min-w-11/12 mx-auto border border-gray-200 rounded-md">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Image 
              src={providerLogo[model.provider as keyof typeof providerLogo]} 
              alt={model.provider} 
              width={16}
              height={16}
            />
            <div className="text-sm font-semibold text-gray-900">{model.displayName}</div>
          </div>
          <p className="text-xs text-gray-500 mb-4">{model.description}</p>
          <div className="text-xs bg-white dark:bg-black divide-y">
            <div className="flex items-start py-3">
              <div className="font-medium w-28">Context</div>
              <div className="flex-1 text-zinc-600 dark:text-zinc-400">{model.contextWindow.toLocaleString()} tokens</div>
            </div>
            <div className="flex items-start py-3">
              <div className="font-medium w-28">Input Pricing</div>
              <div className="flex-1 text-zinc-600 dark:text-zinc-400">${model.pricing?.inputPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 20 })} / million tokens</div>
            </div>
            <div className="flex items-start py-3">
              <div className="font-medium w-28">Output Pricing</div>
              <div className="flex-1 text-zinc-600 dark:text-zinc-400">${model.pricing?.outputPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 20 })} / million tokens</div>
            </div>
          </div>
        </div>
        <div className="p-4 px-6 bg-gray-100 flex justify-between">
          <div className="flex items-center gap-4">
            <a href={model.modelPageUrl} target="_blank" rel="noopener noreferrer">
              <div className="cursor-pointer flex items-center gap-0.5">
                <span className="text-xs font-medium ">
                  Model Page 
                </span> <SquareArrowOutUpRight className="w-3 h-3" />
              </div>
            </a>
            <a href={model.pricingUrl} target="_blank" rel="noopener noreferrer">
              <div className="cursor-pointer flex items-center gap-0.5">
                <span className="text-xs font-medium ">
                  Pricing 
                </span> <SquareArrowOutUpRight className="w-3 h-3" />
              </div>
            </a>
          </div>
          {model.websiteUrl && (
            <a href={model.websiteUrl} target="_blank" rel="noopener noreferrer">
              <div className="cursor-pointer flex items-center gap-0.5">
                <span className="text-xs font-semibold">
                  Website
              </span> <SquareArrowOutUpRight className="w-3 h-3" />
            </div>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
