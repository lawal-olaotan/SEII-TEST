import {useEffect, useState, useRef, useCallback} from 'react';
import './App.css';
import {Header} from "./components/header/Header";
import {SubdivisionDisplay} from "./components/subdivision-display/SubdivisionDisplay";
import { subDivisionsApiRoute,sortSubdivisions,filterSubdivisions  } from './service';
import { SubdivisionType } from  './interface';


function App() {
  
  const [subdivisions, setSubDivision] = useState<SubdivisionType[]>();
  const [dataInView, setdataInView] = useState<SubdivisionType[]>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    subDivisionsApiRoute().then(data => {
        setSubDivision(data)
        setdataInView(data.slice(0,20));
    }) 
  }, [])

  /**
   * @desc loads the next 20 items from subdivisions array and update index number
   */
  const retrieveMoreSubDivisions = useCallback(() => {
    const nextItems = subdivisions?.slice(currentIndex, currentIndex + 20) as SubdivisionType[];
    setdataInView(prevData => [...prevData as SubdivisionType[], ...nextItems]);
    setCurrentIndex(prevIndex => prevIndex + 20);
  }, [subdivisions, currentIndex]);

  /**
   * handles changes in the intersection of a target element loader
   */
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && currentIndex < (dataInView?.length as number)) {
      retrieveMoreSubDivisions();
    }
  }, [retrieveMoreSubDivisions, currentIndex, dataInView?.length]);
  
  
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };

    const currentLoaderRef = loader.current;
    
    const observer = new IntersectionObserver(handleObserver, option);
    if (currentLoaderRef) observer.observe(currentLoaderRef);

    return () => {
      if (currentLoaderRef) observer.unobserve(currentLoaderRef);
    };
  }, [handleObserver,subdivisions, retrieveMoreSubDivisions]);


/**
 * handles table filtering
 * @param event 
 */
  const handleTableFiltering =  async (event:any):Promise<void> => {
      const value = event.target.value;
      const subdivisions = await filterSubdivisions(value.toLowerCase()); 
      setSubDivision(subdivisions)
      setdataInView(subdivisions.slice(0,20));
  }


 /**
  * 
  * @param sortKey handles table sorting
  * @param sortingDirection 
  */
  const handleTableSorting =  async (sortKey:string,sortingDirection:string):Promise<void> => {
    console.log(sortKey);
    console.log(sortingDirection)
    const subdivisions = await sortSubdivisions(sortKey,sortingDirection);
    setSubDivision(subdivisions)
    setdataInView(subdivisions.slice(0,20));
  }


  return (
    <div className="App">
      <Header/>
      {subdivisions && <SubdivisionDisplay tableFilter={handleTableFiltering} tableSorting={handleTableSorting} subdivisions={dataInView as SubdivisionType[]} />}
      <div ref={loader} />
    </div>
  );
}

export default App;
