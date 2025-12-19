import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useVendor = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isVendor, isPending: isVendorLoading } = useQuery({
    queryKey: [user?.email, "isVendor"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/vendor/${user.email}`);
      return res.data?.vendor;
    },
  });
  return [isVendor, isVendorLoading];
};

export default useVendor;
