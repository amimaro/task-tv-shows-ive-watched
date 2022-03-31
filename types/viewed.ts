export type IMarkAsViewed = {
  viewed: boolean;
  media_type: "movie" | "tv";
  media_id: number;
  media_obj: any;
};
