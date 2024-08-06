import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, LocateIcon, UserSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { search_schema, search_value_type } from "@/schema";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ className }: { className: string }) => {
  const navigate = useNavigate();
  const form = useForm<search_value_type>({
    resolver: zodResolver(search_schema),
    defaultValues: {
      location: "",
      check_in: undefined,
      check_out: undefined,
      guests: "",
    },
  });

  function onSubmit(data: search_value_type) {
    const { check_in, check_out, guests, location } = data;

    if (!check_out && !check_in && !guests && !location) {
      return navigate("/search");
    }

    navigate(
      `/search?location=${location}&check_in=${check_in}&check_out=${check_out}&guests=${guests}`
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex items-center gap-3 flex-wrap w-full max-w-[1030px] bg-white px-3 py-2 rounded mx-auto min-h-16 shadow-lg",
          className
        )}
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex-1 basis-[200px]">
              <FormControl>
                <div className="flex items-center justify-center relative">
                  <LocateIcon className="size-4 absolute left-3 opacity-50" />
                  <Input
                    {...field}
                    placeholder="Where are you going?"
                    className="pl-9"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="check_in"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-1 basis-[150px]">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > form.getValues().check_out! ||
                      date < new Date() ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="check_out"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-1 basis-[150px]">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < form.getValues().check_in! ||
                      date < new Date() ||
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem className="flex-1 basis-[90px]">
              <FormControl>
                <div className="flex items-center justify-center relative">
                  <UserSquare className="size-4 absolute left-3 opacity-50" />
                  <Input
                    {...field}
                    type="number"
                    placeholder="Guests?"
                    className="pl-9"
                    min={1}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <LoadingButton
          className="flex-1"
          loading={form.formState.isSubmitting}
          type="submit"
        >
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SearchBar;
