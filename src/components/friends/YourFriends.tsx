import React, { useEffect, useState } from "react";
import GirlIcon from "../../assets/female/icons8-female-90.svg";
import SearchContainer from "./SearchContainer";
import NoResult from "./NoResult";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFriendsList, removeFriend } from "../../service/friend.service";
import {
  LoaderContextType,
  useLoaderContext,
} from "../../context/loaderContext";
import { imagekitEndpoint } from "../../constants";
import getProfileImageName from "../../utils/getProfileImageName";

interface RequestInterface {
  _id: string;
  name: string;
  image: string | null;
  mutualFriends: number;
}

export default function YourFriends() {
  const { showLoader, hideLoader } = useLoaderContext() as LoaderContextType;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriendsList,
  });

  const removeFriendMutation = useMutation({
    mutationFn: (id: string) => removeFriend(id),
    onSuccess: (data: any, id: string) => [
      queryClient.setQueryData(["friends"], (curElem: any) => {
        console.log(
          "$$$$$",
          curElem,
          id,
          curElem?.data?.data?.filter(
            (element: RequestInterface) => element._id !== id
          )
        );
        return {
          ...curElem,
          data: {
            ...curElem?.data,
            data: curElem?.data?.data?.filter(
              (element: RequestInterface) => element._id !== id
            ),
          },
        };
      }),
    ],
  });

  useEffect(() => {
    if (isLoading) showLoader();
    else hideLoader();
  }, [isLoading, showLoader, hideLoader]);

  return (
    <>
      <SearchContainer
        badgeCount={data?.data?.data?.length}
        title="Your friends"
      />
      {data?.data?.data?.length ? (
        <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-3">
          {data?.data?.data?.map((request: RequestInterface) => (
            <div
              key={request._id}
              className="flex flex-row gap-3 items-center w-full md:w-[400px] md:p-2 md:bg-slate-100 md:shadow md:rounded"
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
                <p className="mb-1 text-lg text-slate-700 font-bold">
                  {request.name}
                </p>
                <p className="mb-1 text-sm text-slate-500">
                  {request.mutualFriends} mutual friends
                </p>
                <div className="flex gap-2 justify-end">
                  <div
                    className="rounded-full bg-red-400 text-white text-sm px-2 py-1 cursor-pointer"
                    onClick={() => removeFriendMutation.mutate(request._id)}
                  >
                    Remove
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoResult message="No friends yet! send request" />
      )}
    </>
  );
}
