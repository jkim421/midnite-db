import { FilterSelectionsStateType } from "./filterTypes";

type FetchShowsDataArgs = {
  selections: FilterSelectionsStateType;
  page: number;
  areSelectionsCleaned?: boolean;
};

export type FetchShowsDataType = (args: FetchShowsDataArgs) => void;

type FilterPanelsFetchArgs = {
  resetPage?: boolean;
  resetFilters?: boolean;
};

export type FilterPanelsFetchType = (args?: FilterPanelsFetchArgs) => void;

