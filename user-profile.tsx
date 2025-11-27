import { useState, useEffect } from "react";

interface Payload {
  id: number;
  name: string;
  email: string;
  status: string;
}
export const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Payload>({});
  // simulate the data fetching

  const mock_data: Payload = {
    id: 101,
    name: "Alex Metron",
    email: " alex@metron.com",
    status: "Active",
  };

  useEffect(() => {
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(mock_data);
        }, 1000);
      });
    };

    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const toggleStatus = () =>{
    setData((prev)=> ({...prev, status: prev.status==='Active'? 'Inactive' : 'Active'}));
  }

  if (isLoading) {
    return <> Loading ....</>;
  }

  return (
    <div>
      <div> {data.name}</div>
      <div> {data.email}</div>
      <div>{data.status}</div>
      <button onClick={()=> toggleStatus()}> Toggle Status</button>
    </div>
  );
};
