"use client";

import { List, Luggage, Plane } from "lucide-react";

export default function Logo() {
  return (
    <div class="absolute top-0 flex gap-1 p-6">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
        <Plane className="h-5 w-5 flex-shrink-0 text-white" strokeWidth={2} />
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
        <Luggage className="h-5 w-5 flex-shrink-0 text-white" strokeWidth={2} />
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
        <List className="h-5 w-5 flex-shrink-0 text-white" strokeWidth={2} />
      </div>
    </div>
  );
}
