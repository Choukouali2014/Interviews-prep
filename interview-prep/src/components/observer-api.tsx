import { useEffect, useRef, useState, useCallback } from "react";
import "./observer.css";

const quotes: string[] = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
  "In the middle of every difficulty lies opportunity. - Albert Einstein",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
  "The best way to predict the future is to invent it. - Alan Kay",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "The harder I work, the luckier I get. - Gary Player",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
];

type Payload = {
  id: string;
  body: string;
  userId: string;
  title: string;
};

const fetchQuotes = async (page: number = 1): Promise<Payload[]> => {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
  ).then((r) => r.json());
};

export const ObserverApi = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLLIElement | null>(null);
  const [quoteList, setQuoteList] = useState<Payload[]>([]);
  const page = useRef<number>(1);
  const hasMore = useRef<boolean>(true);
  const isFetching = useRef<boolean>(false);


  const fetchNext = useCallback(async () => {
    if (isFetching.current || !hasMore.current) {
      return;
    }
    isFetching.current = true;
    
    const data = await fetchQuotes(page.current);
    setQuoteList((quoteList) => [...quoteList, ...data]);
    const currTotal = page.current * 5;
    if (currTotal <= 100) {
      page.current = page.current + 1;
    }

    hasMore.current = (currTotal <= 100);
    isFetching.current = false;
  }, []);

  useEffect(() => {
    fetchNext();
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const options = {
      root: ref.current as HTMLDivElement,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore.current) {
        fetchNext();
      }
    }, options);

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    // cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container" ref={ref}>
      <ol>
        {/* Render tree structure here */}
        {quoteList.map((quote, index) => (
          <li key={index} className="list-item">
            {quote.title} - {quote.body}
          </li>
        ))}
        <li className="trigger" ref={triggerRef}>
          Load more...
        </li>
      </ol>
    </div>
  );
};
