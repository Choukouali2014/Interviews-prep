import { useEffect, useState } from "react";
import "./pagination.css";
type Payload = {
  id: string;
  body: string;
  userId: string;
  title: string;
};

export const Pagination = () => {
  const [data, setData] = useState<Payload[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const numberByPage = 10;
  const totalPages = Math.ceil(data.length / numberByPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; +i++) {
    pageNumbers.push(i);
  }

  // fetch the endpoint
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePage = (num: number, e: any) => {
    e.preventDefault();
    setCurrentPage(num);
  };
  const indexOfLastPost = numberByPage * currentPage;
  const indexOfFirstPost = indexOfLastPost - 10;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return "Loading...";
  }

  return (
    <div className="container">
      {currentPost.map((info, index) => {
        return (
          <div className="card" key={`${info.userId}-${index}`}>
            <div className="title"> {info.title}</div>
            <div className="body">{info.body}</div>
          </div>
        );
      })}
      <div className="pages">
        {pageNumbers.map((num) => (
          <button
            disabled={currentPage === num}
            className={currentPage === num ? "selected" : ""}
            onClick={(e) => handlePage(num, e)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};
