import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { journeyType, stationType } from '../types';
import { BsSortDownAlt, BsSortDown  } from "react-icons/bs";

const DataTable = (props: any) => {
    const [active, setActive] = useState<boolean>(false);
    const [selectedIdx, setSelectedIdx] = useState<number>(-1);
    const [selected, setSelected] = useState<journeyType | stationType | null>(null);
    const [sortDirection, setSortDirection] = useState<string>('asc');
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);
    const [sortedData, setSortedData] = useState([]);

    const { rows, headers, onRowSelect, isLoading, showPagination, initialPageSize, keyPrefix } = props;

    useEffect(() => {
        setSortedData(rows);
        setRowsPerPage(initialPageSize);
    }, [rows]);  // eslint-disable-line react-hooks/exhaustive-deps

    const handleSort = (sortKey: string) => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');

        const newSortedData = [...sortedData].sort((a, b) => {
            if (sortDirection === 'asc') {
                if (a[sortKey] < b[sortKey]) {
                    return -1;
                }
                if (a[sortKey] > b[sortKey]) {
                    return 1;
                }
                return 0;
            } else {
                if (a[sortKey] > b[sortKey]) {
                    return -1;
                }
                if (a[sortKey] < b[sortKey]) {
                    return 1;
                }
                return 0;
            }
        });
        setSortedData(newSortedData);

    };

    const handleSelect = (item: journeyType | stationType, index: number) => {
        if (selected === null) {
            setSelected(item);
            setSelectedIdx(index);
            setActive(true);
            onRowSelect(item);

        } else if (selected !== null && selectedIdx !== index) {
            setSelected(item);
            setSelectedIdx(index);
            setActive(true);
            onRowSelect(item);
        } else {
            setSelected(null);
            setSelectedIdx(-1);
            setActive(false);
            onRowSelect(null);
        };
    };

    const handleFilter = (e: ChangeEvent<HTMLInputElement>, dataKey: string) => {
        const newSortedData = rows.filter((item: any) => {
            return item[dataKey].toString().toLowerCase().includes(e.target.value.toLowerCase());
        })
        setSortedData(newSortedData);
        setPage(0);
    };

    const handleChangePage = (pageSize: number) => {
        setPage(Number(pageSize));
    };

    const handleChangeRowsPerPage = (pageSize: number) => {
        setRowsPerPage(Number(pageSize));
        setPage(0);
    }

    const pageRows = sortedData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const renderCellValue = (item: any, accessor: string, width: number) => {
        if (item[accessor] === undefined) return (
            <div>{''}</div>
        )
        if (accessor === 'coveredDistanceInMeter') {
            return (
                <div>
                    {(item.coveredDistanceInMeter / 1000).toFixed(3)}
                </div>
            )
        } else if (accessor === 'durationInSecond') {
            return (
                <div>
                    {(item.durationInSecond / 60).toFixed(2)}
                </div>
            )
        } else {
            return (
                <div>
                    <span>{item[accessor]} </span>
                </div>
            );
        };
    };

    return (
        <div className='table striped'>
            <div className='rt-table' role='grid'>
                <div className='table-head header'>
                    <div className='table-row' role='row'>
                        {
                            headers.map((value: any, index: number) => (
                                <div
                                    style={{ maxWidth: value.width }}
                                    className='column-header'
                                    role='columnheader'
                                    tabIndex={-1}
                                    key={index}
                                    onClick={() => handleSort(value['accessor'])}
                                >
                                    <div
                                        className='header-content'
                                    >
                                        {value.Header}
                                    
                                        {
                                            sortDirection === 'desc' &&
                                                <BsSortDownAlt
                                                    className='sort-icon'
                                             />
                                        }
                                        {
                                            sortDirection === 'asc' &&
                                                <BsSortDown
                                                    className='sort-icon'
                                                />
                                        }                                       
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='table-head filters'>
                    <div className='table-row' role='row'>
                        {headers.map((value: any, index: number) => (
                            <div
                                style={{ maxWidth: value.width }}
                                className='column-header'
                                role='columnheader'
                                tabIndex={-1}
                                key={value['accessor']}
                            >
                                <input
                                    name={value['accessor']}
                                    type='text'
                                    onChange={(e) => handleFilter(e, value['accessor'])}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='table-body'>
                    {pageRows.map((item, index) => (
                        <div
                            className={((active && selectedIdx === index) && 'row-group selected-row') || 'row-group'}
                            role='rowgroup'
                            key={`${item[keyPrefix]}${index}`}
                        >
                            <div
                                className={(index % 2 && 'table-row -even') || 'table-row -odd'}
                                role='row'
                                onClick={() => handleSelect(item, index)}
                            >
                                {headers.map((value: any, index: number) => (
                                    <div
                                        style={{ maxWidth: value.width }}
                                        className={`table-cell width-${value.width}`}
                                        role='gridcell'
                                        key={index}
                                    >
                                        {renderCellValue(item, value.accessor, value.width)}
                                    </div>))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {
                showPagination && (<div className='pagination-bottom'>
                    <div className='pagination'>
                        <div className='previous'>
                            <button
                                type='button'
                                disabled={page === 0}
                                className='btn'
                                onClick={() => handleChangePage(page - 1)}
                            >
                                Previous
                            </button>
                        </div>
                        <div className='center'>
                            <span className='page-info'>
                                Page
                                <div className='page-jump'>
                                    <span>{page + 1}</span>
                                </div>
                                <span>of</span>

                                <span className='total-pages'>
                                    {Math.ceil(sortedData.length / rowsPerPage)}
                                </span>
                            </span>
                            <span className='page-size-options'>
                                <select
                                    value={rowsPerPage}
                                    aria-label='rows per page'
                                    onChange={(e: FormEvent<HTMLSelectElement>) => handleChangeRowsPerPage((e.target as any).value)}
                                >
                                    <option value='5'>5 rows</option>
                                    <option value='10'>10 rows</option>
                                    <option value='20'>20 rows</option>
                                    <option value='25'>25 rows</option>
                                    <option value='50'>50 rows</option>
                                    <option value='100'>100 rows</option>
                                </select>
                            </span>
                        </div>
                        <div className='next'>
                            <button
                                disabled={page === Math.floor(sortedData.length / rowsPerPage)}
                                type='button'
                                className='btn'
                                onClick={() => handleChangePage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>)
            }
            {pageRows.length === 0 && (<div className='no-data'>No rows found.</div>)}
            <div className={isLoading ? 'loading active' : 'loading'}>
                <div>Loading...</div>
            </div>
        </div>
    )
}

export default DataTable;