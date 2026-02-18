import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// generic mutation hook
export function useGenericMutation(
  mutationFunc,
  queryKeysToInvalidate = [],
  successMsg = "Operation successful",
  errorMsg = "Something went wrong",
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFunc,
    onSuccess: () => {
      queryKeysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries([key]),
      );
      toast.success(successMsg);
    },
    onError: () => {
      toast.error(errorMsg);
    },
  });

  return mutation;
}

