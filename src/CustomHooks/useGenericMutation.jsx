import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";


export function useGenericMutation(
  mutationFunc,
  queryKeysToInvalidate = [],
  successMsg,
  errorMsg,
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: mutationFunc,
    onSuccess: () => {
      queryKeysToInvalidate.forEach((key) =>
        queryClient.invalidateQueries([key]),
      );
      !!successMsg && toast.success(successMsg);
    },
    onError: () => {
       !!errorMsg && toast.error(errorMsg);
    },
  });

  return mutation;
}
