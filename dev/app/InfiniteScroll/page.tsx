// https://dummyjson.com/posts?limit=10&skip=10

"use client";

import { useEffect, useRef, useState } from "react";

const Index = () => {
  const [post, setPost] = useState<any>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(null);

  async function fetchPost() {
    if (!hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://dummyjson.com/posts?limit=10&skip=${skip}`,
      );

      const responses = await res.json();

      if (responses?.posts?.length === 0) {
        console.log("no more data");
        setHasMore(false);
        return;
      }
      setPost((prev: any) => [...prev, ...responses?.posts]);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loadingRef.current) {
      const obs = new IntersectionObserver(
        ([entries]) => {
          if (entries?.isIntersecting) {
            if (hasMore) {
              setSkip((prev) => prev + 10);
            }
          }
        },
        { threshold: 1 },
      );

      obs.observe(loadingRef.current);
      return () => {
        if (loadingRef.current) {
          obs.unobserve(loadingRef.current);
        }
      };
    }
  }, [post]);

  useEffect(() => {
    fetchPost();
  }, [skip]);

  return (
    <div className="w-full">
      {post?.map((ele: any) => {
        return (
          <div
            className="w-[500px] border rounded-[12px] border-gray-300 my-4 p-2 mx-auto"
            key={ele?.id}
          >
            <p className="font-bold text-sm"> {ele?.title}</p>
            <p className="text-xs leading-[24px]"> {ele?.body}</p>
          </div>
        );
      })}
      {hasMore ? (
        <div ref={loadingRef}>
          <div className="min-w-[500px] border border-gray-300 shadow rounded-md p-2 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-2 py-1">
                <div className="h-2 bg-slate-200 rounded"></div>
                <div className="space-y-3">
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Index;
