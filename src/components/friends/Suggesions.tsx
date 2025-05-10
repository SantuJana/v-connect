import React, { useCallback, useEffect, useState } from "react";
import SearchContainer from "./SearchContainer";
import GirlIcon from "../../assets/female/icons8-female-90.svg";
import NoResult from "./NoResult";
import { imagekitEndpoint } from "../../constants";
import getProfileImageName from "../../utils/getProfileImageName";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSuggestions,
  sendFriendRequest,
} from "../../service/friend.service";
import {
  NotificationContext,
  useNotification,
} from "../../context/notificationContext";
import {
  LoaderContextType,
  useLoaderContext,
} from "../../context/loaderContext";

interface RequestInterface {
  _id: string;
  name: string;
  image: string | null;
  mutualFriends: number;
  alreadySent: boolean;
}

export default function Suggestions() {
  const { failed } = useNotification() as NotificationContext;
  const { showLoader, hideLoader } = useLoaderContext() as LoaderContextType;
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState<string>("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["suggestions", searchText],
    queryFn: () => getSuggestions(searchText),
  });

  const sendRequestMutation = useMutation({
    mutationFn: (id: string) => sendFriendRequest(id),
    onSuccess: (data: any, id: string) => {
      queryClient.setQueryData(["suggestions", searchText], (curElem: any) => {
        return {
          ...curElem,
          data: {
            ...curElem?.data,
            data: curElem?.data?.data?.map((element: RequestInterface) =>
              element._id === id ? { ...element, alreadySent: true } : element
            ),
          },
        };
      });
    },
  });

  const handleSearchChange = useCallback(
    (val: string) => {
      setSearchText(val);
    },
    [setSearchText]
  );

  useEffect(() => {
    if (isError) {
      failed((error as any)?.response?.error);
    }
  }, [isError, error, failed]);

  useEffect(() => {
    if (isLoading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [isLoading, showLoader, hideLoader]);

  return (
    <>
      <SearchContainer
        title="Friend Suggestions"
        enableSearch
        handleSearchChange={handleSearchChange}
      />
      {data?.data?.data?.length ? (
        <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-3">
          {data?.data?.data?.map((request: RequestInterface) => (
            <div className="flex flex-row gap-3 items-center w-full md:w-[400px] md:p-2 md:bg-slate-100 md:shadow md:rounded">
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
                  {request.alreadySent ? (
                    <div className="rounded-full bg-slate-400 text-white text-sm px-2 py-1">
                      Already sent
                    </div>
                  ) : (
                    <div
                      className="rounded-full bg-blue-600 text-white text-sm px-2 py-1 cursor-pointer"
                      onClick={() => sendRequestMutation.mutate(request._id)}
                    >
                      Send request
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoResult message="No suggestion found" />
      )}
    </>
  );
}
