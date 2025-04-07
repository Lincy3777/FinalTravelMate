import { safeUser } from "../types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, MouseEvent } from "react";
import { toast } from "react-toastify";
import useLoginModal from "./useLoginModal";

type Props = {
  listingId: string;
  currentUser?: safeUser | null;
};

function useFavorite({ listingId, currentUser }: Props) {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        if (hasFavorite) {
          await axios.delete(`/api/favorites/${listingId}`);
        } else {
          await axios.post(`/api/favorites/${listingId}`);
        }

        router.refresh();
        toast.success("Success");
      } catch {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorite, listingId, loginModal, router]
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
}

export default useFavorite;
