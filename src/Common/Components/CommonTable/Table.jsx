import React, {useMemo} from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import {Table, TableBody, TableHead, TableCell, TableRow} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import './table.css';

export const CommonTable = ({COLUMNS, ROWS}) => {
  const columns = useMemo(()=> COLUMNS, [])
  const data = useMemo(() => ROWS, []);

  const tableInstance = useTable({columns, data}, useGlobalFilter, useSortBy,)

  const {
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    // footerGroups,
    state,
    setGlobalFilter,
    rows, 
    prepareRow
  } = tableInstance

  const {globalFilter} = state
  return(
   <React.Fragment>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
    <Table sx={{width:'98%', margin:'auto', border: '1px solid #15133C'}} {...getTableProps()}>
      <TableHead sx={{backgroundColor: '#15133C'}}>
        {
          headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map( column => (
                <TableCell sx={{color: '#F1EEE9', textAlign:'center', fontWeight:'Bold'}} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? <ArrowDropDownIcon fontSize='small'/> : <ArrowDropUpIcon fontSize='small'/>) : ''}
                  </span>
                </TableCell>
              ))}

            </TableRow>
          ))
        }
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {
                  row.cells.map( cell => {
                    return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  })
                }
              </TableRow>
            )
          })
        }
      </TableBody>
      {/* <tfoot>
        { footerGroups.map(footerGroup => (
          <tr {...footerGroup.getFooterGroupProps()}>
            {
              footerGroup.headers.map(column => (
                <td {...column.getFooterProps()}>
                  {column.render('footer')}
                </td>
              ))
            }
          </tr>
        ))}
      </tfoot> */}
    </Table>
   </React.Fragment>
  )
}


const GlobalFilter = ({filter, setFilter}) => {
  return(
    <React.Fragment>
      <span>
        Search: {''}
        <input value={filter || ''} onChange={(e) => setFilter(e.target.value)}/> 
      </span>
    </React.Fragment>
  )
}