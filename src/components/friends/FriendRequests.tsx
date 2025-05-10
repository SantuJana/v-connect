import React, { useEffect, useState } from "react";
import GirlIcon from "../../assets/female/icons8-female-90.svg";
import { IoIosSearch } from "react-icons/io";
import SearchContainer from "./SearchContainer";
import NoResult from "./NoResult";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptRequest,
  getFriendRequestList,
  rejectRequest,
} from "../../service/friend.service";
import {
  LoaderContextType,
  useLoaderContext,
} from "../../context/loaderContext";
import getProfileImageName from "../../utils/getProfileImageName";
import { imagekitEndpoint } from "../../constants";

interface RequestInterface {
  _id: string;
  name: string;
  image: string | null;
  mutualFriends: number;
}

export default function FriendRequests() {
  const { showLoader, hideLoader } = useLoaderContext() as LoaderContextType;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["friendRequestList"],
    queryFn: getFriendRequestList,
  });

  const acceptRequestMutation = useMutation({
    mutationKey: ["acceptRequest"],
    mutationFn: (id: string) => acceptRequest(id),
    onSuccess: (data: any, id: string) => {
      queryClient.setQueryData(["friendRequestList"], (curElem: any) => {
        return {
          ...curElem,
          data: {
            ...curElem?.data,
            data: curElem?.data?.data?.filter(
              (element: RequestInterface) => element._id !== id
            ),
          },
        };
      });
    },
  });

  const rejectRequestMutation = useMutation({
    mutationKey: ["acceptRequest"],
    mutationFn: (id: string) => rejectRequest(id),
    onSuccess: (data: any, id: string) => {
      queryClient.setQueryData(["friendRequestList"], (curElem: any) => {
        return {
          ...curElem,
          data: {
            ...curElem?.data,
            data: curElem?.data?.data?.filter(
              (element: RequestInterface) => element._id !== id
            ),
          },
        };
      });
    },
  });

  useEffect(() => {
    if (isLoading) showLoader();
    else hideLoader();
  }, [isLoading, showLoader, hideLoader]);

  return (
    <>
      <SearchContainer
        title="Friend Request"
        badgeCount={data?.data?.data?.length}
      />
      {data?.data?.data?.length ? (
        <>
          <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-3">
            {data?.data?.data?.map((request: RequestInterface) => (
              <div
                key={request._id}
                className="flex flex-row gap-3 items-center w-full md:w-[400px] md:p-3 md:bg-slate-100 md:shadow md:rounded"
              >
                <div className="flex justify-center items-center flex-shrink-0">
                  {request.image ? (
                    <img
                      src={`${imagekitEndpoint}${request.image}?tr=h-100,w-100`}
                      alt=""
                      className="object-contain w-16 h-16 rounded-full bg-slate-300"
                    />
                  ) : (
                    <div className="rounded-full w-16 h-16 bg-violet-200 flex justify-center items-center text-violet-700 text-lg font-bold">
                      {getProfileImageName(request.name)}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="mb-1 text-lg/5 text-slate-700 font-bold line-">
                    {request.name}
                  </p>
                  <p className="mb-1 text-sm text-slate-500">
                    {request.mutualFriends || 0} mutual friends
                  </p>
                  <div className="flex gap-2 justify-end">
                    <div
                      className="rounded-full bg-blue-600 text-white text-sm px-2 py-1 cursor-pointer"
                      onClick={() => acceptRequestMutation.mutate(request._id)}
                    >
                      Accept
                    </div>
                    <div
                      className="rounded-full bg-red-400 text-white text-sm px-2 py-1 cursor-pointer"
                      onClick={() => rejectRequestMutation.mutate(request._id)}
                    >
                      Reject
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <NoResult message="No request found" />
      )}
    </>
  );
}
