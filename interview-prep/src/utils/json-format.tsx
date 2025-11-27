import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpenDot } from "lucide-react";
import "./json-format.css";

type JsonFormatType = {
  name: string;
  children?: JsonFormatType[];
};

export const NestedChildren = ({ node }: { node: JsonFormatType }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  return (
    <li>
      <span className="node">
        {node.children && node.children.length > 0 && (
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronDown /> : <ChevronRight />}
          </button>
        )}
        {node.children && node.children.length > 0 ? <FolderOpenDot /> : <Folder />}
        {node.name}
      </span>
     
      {node.children && isExpanded && (
        <ol>
          {node.children.map((child, index) => (
            <NestedChildren node={child} key={`${index}-${child.name}`} />
          ))}
        </ol>
      )}
    </li>
  );
};
export const JsonFormat = () => {
  const nodes: JsonFormatType[] = [
    {
      name: "Home",
      children: [
        {
          name: "Movies",
          children: [
            {
              name: "Action",
              children: [
                {
                  name: "2000s",
                  children: [
                    { name: "Gladiator.mp4" },
                    { name: "The-Dark-Knight.mp4" },
                  ],
                },
                { name: "2010s", children: [] },
              ],
            },
            {
              name: "Comedy",
              children: [
                { name: "2000s", children: [{ name: "Superbad.mp4" }] },
              ],
            },
            {
              name: "Drama",
              children: [
                { name: "2000s", children: [{ name: "American-Beauty.mp4" }] },
              ],
            },
          ],
        },
        {
          name: "Music",
          children: [
            { name: "Rock", children: [] },
            { name: "Classical", children: [] },
          ],
        },
        { name: "Pictures", children: [] },
        {
          name: "Documents",
          children: [],
        },
        { name: "passwords.txt" },
      ],
    },
  ];

  return (
    <ol>
      {nodes.map((node) => (
        <NestedChildren node={node} />
      ))}
    </ol>
  );
};
