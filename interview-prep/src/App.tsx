
import './App.css'
import { PaginationSSR } from './components/pagination-ssr';
import { JsonFormat } from './utils/json-format';
import {TreeFolder } from './utils/tree-folder';
import {JsonViewer } from './utils/json-viewer';
import { ObserverApi } from './components/observer-api';

function App() {

  return (
    <>
     {/* <PaginationSSR /> */}
     {/* <JsonFormat /> */}
     {/* <TreeFolder /> */}
     {/* <JsonViewer /> */}
     <ObserverApi />
    </>
  )
}

export default App
