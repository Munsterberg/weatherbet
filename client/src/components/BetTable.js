import React from 'react';
import { Table } from 'semantic-ui-react';

function BetTable() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Tempature</Table.HeaderCell>
          <Table.HeaderCell>Size</Table.HeaderCell>
          <Table.HeaderCell>Odds</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default BetTable;
