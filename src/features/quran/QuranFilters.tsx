"use client";
import { JuzIcon, SurahIcon } from "@/components/icons/juz";
import { KaabaIcon, MedinaIcon } from "@/components/icons/mosque";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterIcon } from "lucide-react";
import { useFilter, useOrder, useSort } from "./hooks/useDatafiltersHooks";

export const QuranFilters = () => {
  const [filter, setFilter] = useFilter();
  const [order, setOrder] = useOrder();
  const [sort, setSort] = useSort();
  const handleFilterClick = (filterType: string) => {
    setFilter(filterType);
  };

  const handleSortChange = (sortType: any) => {
    setSort(sortType);
  };

  const handleSortOrderChange = (order: string) => {
    setOrder(order);
  };

  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center m-4">
      <div className="flex flex-col md:flex-row items-center gap-2">
        <Button
          size="sm"
          variant={(filter === "surah" || !filter) ? "default" : "outline"}
          onClick={() => handleFilterClick("surah")}
        >
          <SurahIcon className="w-4 h-4 mr-2" />
          Surahs
        </Button>
        <Button
          size="sm"
          variant={filter === "juz" ? "default" : "outline"}
          onClick={() => handleFilterClick("juz")}
        >
          <JuzIcon className="w-4 h-4 mr-2" />
          Juz
        </Button>
        <Button
          size="sm"
          variant={filter === "mecca" ? "default" : "outline"}
          onClick={() => handleFilterClick("mecca")}
        >
          <KaabaIcon className="w-4 h-4 mr-2" />
          Mecca
        </Button>
        <Button
          size="sm"
          variant={filter === "medina" ? "default" : "outline"}
          onClick={() => handleFilterClick("medina")}
        >
          <MedinaIcon className="w-4 h-4 mr-2" />
          Medina
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <FilterIcon className="w-4 h-4 mr-2" />
            Sort by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sort}
            onValueChange={handleSortChange}
          >
            <DropdownMenuRadioItem value="number">
              Number
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name">
              Name
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="last-read">
              Last Read
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bookmarked">
              Bookmarked
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={order}
            onValueChange={handleSortOrderChange}
          >
            <DropdownMenuRadioItem value="asc">Ascending</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc">Descending</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
