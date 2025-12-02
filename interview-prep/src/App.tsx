
import './App.css'
import { PaginationSSR } from './components/pagination-ssr';
import { JsonFormat } from './utils/json-format';
import {TreeFolder } from './utils/tree-folder';
import {JsonViewer } from './utils/json-viewer';
import { ObserverApi } from './components/observer-api';
import { Scrollable } from './components/scrollable';

function App() {

  return (
    <>
     {/* <PaginationSSR /> */}
     {/* <JsonFormat /> */}
     {/* <TreeFolder /> */}
     {/* <JsonViewer /> */}
     {/* <ObserverApi /> */}
     <Scrollable />
    </>
  )
}

export default App
