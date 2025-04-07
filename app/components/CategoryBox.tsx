"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs, { ParsedQuery } from "query-string";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery: ParsedQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: ParsedQuery = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/listing",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } 
        ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <Icon size={25} />
      <div className="font-medium text-xs">{label}</div>
    </div>
  );
};

export default CategoryBox;
