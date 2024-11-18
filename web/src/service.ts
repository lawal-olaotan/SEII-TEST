
import { SubdivisionType } from './interface'


export const subDivisionEndpoint = `http://localhost:8000/subdivision`


/**
 *
 * @desc Gets data from subdivision endpoint
 */
export const subDivisionsApiRoute = async (uri:string=subDivisionEndpoint) : Promise<SubdivisionType[]>  => {
    const response = await fetch(`${uri}`);
    const subDivisionData = await response.json();
    return subDivisionData;
}

/**
 * function sorts Subdivisions by sortkey and order
 * @param sortKey 
 * @param order 
 * @returns an array of subdivision
 */
export const sortSubdivisions = async (sortKey:string,order:string) : Promise<SubdivisionType[]>  => {
    const response = subDivisionsApiRoute(`${subDivisionEndpoint}?sort=${sortKey}&order=${order}`)
    return response
}

/**
 * function filter Subdivisions by Status Code
 * @param filterKey 
 * @returns 
 */
export const filterSubdivisions = async (filterKey:string,) : Promise<SubdivisionType[]>  => {
    const response = subDivisionsApiRoute(`${subDivisionEndpoint}?filter=${filterKey}`)
    return response
}



