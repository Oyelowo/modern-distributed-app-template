import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormProps, useForm } from "react-hook-form";
import { ZodType, z } from "zod";



// TODO: Extract into shared ui package
export function useFormCustom<T extends ZodType<any, any, any>>(
  ZodSchema: T,
  props: UseFormProps<T, unknown>
) {
  const formValues = useForm<z.infer<typeof ZodSchema>>({
    reValidateMode: "onChange",
    // mode: "all",
    resolver: zodResolver(ZodSchema),
    ...props,
  });

  return formValues;
}
