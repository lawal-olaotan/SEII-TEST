import React from "react";
import { subDivisionProps } from "../../interface";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Heading,
  Select,
} from "@chakra-ui/react";
import classNames from "classnames/bind";
import { ChevronDown, ChevronUp } from "lucide-react";

import { dummyHeader } from "../subdivision-display/data";
import styles from "./SubdivisionDisplay.css";

const cn = classNames.bind(styles);

export const SubdivisionDisplay: React.FC<subDivisionProps> = (
  subDivisionProps
) => {
  const { subdivisions, tableSorting, tableFilter } = subDivisionProps;
  const { county, marketName } = subdivisions[0];

  const FilterDisplay = () => {
    return (
      <Select width={'100'} onChange={tableFilter}>
        {["Active", "Future", "Builtout"].map((options,index) => (
          <option key={index} value={options}>{options}</option>
        ))}
      </Select>
    );
  };

  return (
    <Stack width="full" gap="5" padding={20}>
      <div className={cn("flex justify-box")}>
        <div>
          <Heading size="xl">Market Name: {marketName}</Heading>
          <Heading size="md">County: {county}</Heading>
        </div>
        <FilterDisplay />
      </div>
      <Table borderWidth="1px" rounded="md">
        <Thead>
          <Tr bg="bg.subtle">
            {dummyHeader.map((header, index) => (
              <Th key={index}>
                <div className={cn("flex")}>
                  <span className={cn("margin-r")}>{header.id}</span>
                  {header.sortable && (
                    <div>
                      <ChevronUp
                        size={14}
                        onClick={() => tableSorting(header.id, "asc")}
                      />
                      <ChevronDown
                        size={14}
                        onClick={() => tableSorting(header.id, "desc")}
                      />
                    </div>
                  )}
                </div>
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {subdivisions.map((item, index) => (
            <Tr key={index}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>
                <div>
                  <h6>lon:{item.longitude}</h6>
                  <h6>lat:{item.latitude}</h6>
                </div>
              </Td>
              <Td>{item.fieldSurveyTerritoryName}</Td>
              <Td>{item.surveyMethodCode}</Td>
              <Td>{item.subdivisionStatusCode}</Td>
              <Td>{item.nearMapImageDate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
};
