import React from 'react';

import MaterialTable from 'material-table';

import { TablePagination } from '@material-ui/core';

function CrudTable({
  size,
  onAdd,
  onUpdate,
  onDelete,
  page,
  total,
  onPageChange,
  editable,
  rowStyle,
  ...props
}) {
  const editOptions = editable
    ? { onRowAdd: onAdd, onRowUpdate: onUpdate, onRowDelete: onDelete }
    : null;
  return (
    <div>
      <MaterialTable
        options={{
          sorting: false,
          search: false,
          pageSize: size,
          pageSizeOptions: [size],
          addRowPosition: 'first',
          paging: false,
          rowStyle,
          toolbarButtonAlignment: 'left',
        }}
        editable={editOptions}
        {...props}
      />
      <TablePagination
        component="div"
        rowsPerPage={size}
        rowsPerPageOptions={[size]}
        page={page}
        count={total}
        onChangePage={onPageChange}
      />
    </div>
  );
}

CrudTable.defaultProps = {
  size: 10,
};

export default CrudTable;
