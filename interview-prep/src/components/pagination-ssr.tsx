import { useState, useEffect } from "react";
import "./pagination.css";

type Payload = {
  id: string;
  userId: string;
  title: string;
  body: string;
};
export const PaginationSSR = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Payload[]>([]);
  const [totalPage, setTotalPage] = useState<number[]>([]);
  const [initialPage, setInitialPage] = useState(1);
  const initialLimit = 10;

  const fetchData = async (currPage: number, limit: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${currPage}&_limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Please try again later");
      }
      const res = await response.json();
      const totalPosts = response.headers.get("X-Total-Count");
      setTotalPage(
        Array.from(
          { length: Number(totalPosts) / initialLimit },
          (_, index) => index + 1
        )
      );

      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(initialPage, initialLimit);
  }, [initialPage, initialLimit]);

  const handlePages = (num: number) => {
    setInitialPage(num);
    // fetchData(num, initialLimit);
  };

  if (isLoading) {
    return "Loading...";
  }
  return (
    <div className="container">
      {data.map((info, index) => (
        <div className="card" key={`${info.userId}-${index}`}>
          <div className="title">{info.title}</div>
          <div className="body">{info.body}</div>
        </div>
      ))}

      <div className="pages">
        {totalPage.map((num) => (
          <button
            onClick={() => handlePages(num)}
            disabled={num === initialPage}
            className={num === initialPage ? "selected" : ""}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};
