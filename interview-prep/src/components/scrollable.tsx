import { useState, useRef, useEffect } from "react";
import "./pagination.css";

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

export const Scrollable = () => {
  const trigger = useRef<HTMLDivElement | null>(null);
  const root = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!trigger.current || !root.current) return;

    const options = {
      root: root.current,
      rootMargin: "0px",
      threshold: 1,
    };
    const obsever = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const elt = entry.target;
            if(elt.className.includes('hidden')){
                console.log('got here');
            }
          console.log(entry.target.innerHTML);
        }
      });
    }, options);
    const listItems = document.querySelectorAll(".list-items");
    listItems.forEach((item)=>{
         obsever.observe(item);
    });
    obsever.observe(trigger.current);
   

    return () => {
      obsever.disconnect();
    };
  }, []);

  return (
    <div className="container" ref={root}>
      <ol>
        {quotes.map((quote, index) => (
          <li key={index} className="list-items">
            {quote}
          </li>
        ))}
      </ol>
      <div ref={trigger} className="hidden">Load more ...</div>
    </div>
  );
};
