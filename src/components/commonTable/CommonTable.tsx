import { Table } from "semantic-ui-react";

import "./CommonTable.scss";

export const CommonTable = ({
  tableHeaderData = [],
  children,
  singleLine = true,
}: any) => {
  return singleLine ? (
    <Table singleLine={singleLine}>
      <Table.Header>
        <Table.Row>
          {tableHeaderData.map((data: any, index: any) => {
            return (
              <Table.HeaderCell
                className="tbleHeader"
                width={data?.col}
                key={index}
              >
                {data?.name || ""}
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>{children}</Table.Body>
    </Table>
  ) : (
    <Table celled structured>
      <Table.Header>
        <Table.Row>
          {tableHeaderData.map((data: any, index: any) => {
            return (
              <Table.HeaderCell
                className="tbleHeader"
                width={data?.col}
                key={index}
              >
                {data?.name || ""}
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>

      <Table.Body>{children}</Table.Body>
    </Table>
  );
};
