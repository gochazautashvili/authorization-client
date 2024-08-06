import { z } from "zod";

export const search_schema = z.object({
  location: z.string().optional(),
  check_in: z.date().optional(),
  check_out: z.date().optional(),
  guests: z.string().optional(),
});

export type search_value_type = z.infer<typeof search_schema>;
