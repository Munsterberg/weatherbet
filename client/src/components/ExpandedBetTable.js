import React from 'react';
import {Table} from 'semantic-ui-react';

function ExpandedBetTable() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>City</Table.HeaderCell>
          <Table.HeaderCell>Day</Table.HeaderCell>
          <Table.HeaderCell>Bet</Table.HeaderCell>
          <Table.HeaderCell>Stake ($)</Table.HeaderCell>
          <Table.HeaderCell>Odds</Table.HeaderCell>
          <Table.HeaderCell>To Return ($)</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default ExpandedBetTable;
