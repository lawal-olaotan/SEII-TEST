
export type SubdivisionType = {
            id: number,
            code:string,
            name:string,
            longitude:number,
            latitude: number,
            fieldSurveyTerritoryId: number ,
            marketId: number,
            subdivisionStatusId: number,
            surveyMethodId: number,
            activeSections:number,
            futureSections: number,
            builtOutSections:number,
            totalLots: number,
            fieldSurveyTerritoryName: string,
            marketName:string,
            marketAbbreviation: string,
            subdivisionStatusCode: string,
            surveyMethodCode: string,
            county: string,
            community: null,
            zoom17Date: string,
            zoom18Date: string,
            subdivisionGeometryId: null,
            subdivisionGeometryBoundingBoxId: null,
            subdivisionGeometryBoundaryId: null,
            subdivisionGeometryIntelligenceBoundaryId: number,
            subdivisionGeometryIntelligenceBoundaryStatusId: number,
            subdivisionGeometryIntelligenceBoundaryStatusCode: string,
            subdivisionGeometryIntelligenceBoundaryStatusChangeDate: string,
            nearMapImageDate: string,
            imageBoxId: number,
            mostRecentIPointBatchDate: string,
            iPoints: null,
            validatediPoints: null,
            subdivisionSpecificStatus: string
}


export interface subDivisionProps {
    subdivisions: SubdivisionType[];
    tableSorting: (
      sortKey: string,
      sortingDirection: string
    ) => Promise<void> | undefined;
    tableFilter: (event: any) => Promise<void>;
  }

