import { useEffect, useRef } from "react";
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
export const ObserverApi = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
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
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elt = entry.target;
     
          console.log(elt.innerHTML);
        }
      });
    }, options);

    
    const trigger = document.querySelector(".trigger");
    observer.observe(trigger);

    // cleanup
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="container" ref={ref}>
      <ol>
        {/* Render tree structure here */}
        {quotes.map((quote, index) => (
          <li key={index} className="list-item">
            {quote}
          </li>
        ))}
        <li className="trigger">Load more...</li>
      </ol>
    </div>
  );
};
