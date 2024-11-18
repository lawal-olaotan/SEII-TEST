import subdivisionData from '../data/subdivision.json' assert { type: 'json' };

export const subDivisionController = (url) => {
    const sortBy = url.searchParams.get('sort');
    const sortOrder = url.searchParams.get('order');
    const filterkey = url.searchParams.get('filter'); 

    if(sortBy){
        return sortSubDivisions(sortBy.split(','),sortOrder)
    }else if(filterkey){
        return filterByStatusCode(filterkey);
    }else{
        return sortSubDivisions();
    }  
}

// check if array of object is returned
const filterByStatusCode = (filterKey) => {
    const { subdivisions } = subdivisionData
    const filteredSubdivisions  = subdivisions.filter(subdivision => subdivision.subdivisionStatusCode.toLowerCase() === filterKey.toLowerCase());
    return  filteredSubdivisions
}


const sortSubDivisions = 
(sortkeys = ['name', 'nearMapImageDate'], sortOrder = 'asc') => sortCompareFunction(sortkeys,sortOrder); 

// TODO: 
// to improve date and string function by data type
const sortCompareFunction = (sortKeys,sortOrder) => {
        // original value
        const { subdivisions } = subdivisionData

        return subdivisions.sort((firstElement, secondElement)=> {

            let comparism = 0;
            for (let compareIndex=0; compareIndex < sortKeys.length; compareIndex++){
                const currentSortKey = sortKeys[compareIndex];
                comparism = firstElement[currentSortKey] < secondElement[currentSortKey] ? -1 : 1
                return sortOrder === 'desc' ? -comparism : comparism
            }
            return comparism
        })
}