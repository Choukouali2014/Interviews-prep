import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpenDot } from "lucide-react";
import "./json-format.css";

type TreeFolderType = {
  name: string;
  tree?: TreeFolderType[];
};

const DisplayTree = ({ node }: { node: TreeFolderType }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <li>
      <span>
        { node.tree && node.tree.length > 0 && <button onClick={()=> setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronDown /> : <ChevronRight/>}
        </button>}
        { node.tree && node.tree.length > 0 ? <FolderOpenDot /> : <Folder /> }
        {node.name}
        </span>
      {node.tree && node.tree.length > 0 && isExpanded && (
        <ul>
          {node.tree.map((child) => (
            <li>
              <DisplayTree node={child} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export const TreeFolder = () => {
  const treeData: TreeFolderType = {
    name: "Home",
    tree: [
      {
        name: "Movies",
        tree: [
          {
            name: "Action",
            tree: [
              {
                name: "2000s",
                tree: [
                  { name: "Gladiator.mp4" },
                  { name: "The-Dark-Knight.mp4" },
                ],
              },
              { name: "2010s", tree: [] },
            ],
          },
          {
            name: "Comedy",
            tree: [{ name: "2000s", tree: [{ name: "Superbad.mp4" }] }],
          },
          {
            name: "Drama",
            tree: [{ name: "2000s", tree: [{ name: "American-Beauty.mp4" }] }],
          },
        ],
      },
      {
        name: "Music",
        tree: [
          { name: "Rock", tree: [] },
          { name: "Classical", tree: [] },
        ],
      },
      { name: "Pictures", tree: [] },
      {
        name: "Documents",
        tree: [],
      },
      { name: "passwords.txt" },
    ],
  };

  return (
    <ul>
      <DisplayTree node={treeData} />
    </ul>
  );
};
