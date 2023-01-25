import react, { useState, useEffect, FormEvent } from 'react'

const DataTable = (props: any) => {
    const [active, setActive] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const [selected, setSelected] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [sortedData, setSortedData] = useState([]);

    const { rows, headers, onRowSelect, isLoading, showPagination, initialPageSize, keyPrefix } = props;
    useEffect(() => {
        setSortedData(rows);
        setRowsPerPage(initialPageSize);
    }, [rows]);

    const handleSort = (sortKey: any) => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        
        const newSortedData: any = [...sortDirection].sort((a, b) => {
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

    const handleSelect = (item: any, index: any) => {
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

    const handleFilter = (e: any, dataKey: any) => {
        const newSortedData = rows.filter((item: any) => {
            return item[dataKey].toString().toLowerCase().include(e.target.value);
        })
        console.log("newSortedData", newSortedData);
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

    const renderCellValue = (item: any, accessor: any, width: any) => {
        if (accessor === 'subSolutions') {
            if (item.subSolutions === undefined || item.subSolutions.length === 0) {
                return <div>{""}</div>
            }
            return (
                <div>
                    {accessor === 'subSolutions' && item.subSolutions.map((d: any, idx: any) => {
                        return (
                            <li key={idx}>
                                <span>{d.name}</span>
                                <span>{d.subId}</span>
                            </li>
                        )
                    })}
                </div>
            )
        } else if (accessor === 'subSolutionsRow') {
            if (item.subSolutionsRow === undefined || item.subSolutionsRow.length === 0) {
                return <div>{""}</div>
            }
            return (
                <div>
                    {accessor === 'subSolutionRow' && item.subSolutionRow.map((d: any, idx: any) => {
                        return (
                            <li key={idx}>
                                <span>{d.name}</span>
                                <span>{d.subId}</span>
                            </li>
                        )
                    })}
                </div>
            )
        } else if (accessor === 'internalOnly') {
            return <div>{item.internalOnly === true ? "Yes" : "No"} </div>
        } else {
            if (item[accessor] === undefined || item[accessor].length === 0) return (
                <div>{""}</div>
            )
            return (
                <div>
                    <span>{item[accessor]} </span>
                </div>
            );
        };
    };

    return (
        <div className="flex-table-container">
            <div className="RbacTable table-style -striped -highlight">
                <div className="rt-table" role="grid">

                    <div className="rt-thead -header">
                        <div className="rt-tr" role="row">
                            {
                                headers.map((value: any, index: any) => (
                                    <div style={{ maxWidth: value.width }} className="rt-th rt-resizable-header -cursor-pointer" role="columnheader" tabIndex={-1} key={index}>
                                        <div className="rt-resizable-header-content" onClick={() => handleSort(value["accessor"])}>{value.Header}</div>
                                        <div className="rt-resizer"></div>
                                    </div>))
                            }
                        </div>
                    </div>
                    <div className="rt-thead -filters">
                        <div className="rt-tr" role="row">
                            {headers.map((value: any, index: any) => (
                                <div style={{ maxWidth: value.width }} className="rt-th" role="columnheader" tabIndex={-1} key={value["accessor"]}>
                                    <input name={value["accessor"]} type="text" onChange={(e) => handleFilter(e, value["accessor"])} />
                                </div>))}
                        </div>
                    </div>

                    <div className="rt-tbody">
                        {pageRows.map((item, index) => (
                            <div className={((active && selectedIdx === index) && 'rt-tr-group selectedRow') || 'rt-tr-group'} role="rowgroup" key={`${item[keyPrefix]}${index}`}>
                                <div className={(index % 2 && 'rt-tr -even') || 'rt-tr -odd'} role="row" onClick={() => handleSelect(item, index)}>
                                    {headers.map((value: any, index: any) => (
                                        <div style={{ maxWidth: value.width }} className={`rt-td width-${value.width}`} role="gridcell" key={index}>
                                            {renderCellValue(item, value.accessor, value.width)}
                                        </div>))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {
                    showPagination && (<div className="pagination-bottom">
                        <div className="-pagination">
                            <div className="-previous">
                                <button type="button" disabled={page === 0} className="-btn" onClick={() => handleChangePage(page - 1)}>Previous</button>
                            </div>
                            <div className="-center"><span className="-pageInfo">Page <div className="-pageJump">
                                <input aria-label="jump to page" value={page + 1} readOnly />
                            </div>
                                <span>of</span>

                                <span className="-totalPages">{Math.ceil(sortedData.length / rowsPerPage)}</span>
                            </span><span className="select-wrap -pageSizeOptions">
                                    <select value={rowsPerPage} aria-label="rows per page" onChange={(e: FormEvent<HTMLSelectElement>) => handleChangeRowsPerPage((e.target as any).value)}>
                                        <option value="5">5 rows</option>
                                        <option value="10">10 rows</option>
                                        <option value="20">20 rows</option>
                                        <option value="25">25 rows</option>
                                        <option value="50">50 rows</option>
                                        <option value="100">100 rows</option>
                                    </select></span></div>
                            <div className="-next"><button disabled={page === Math.floor(sortedData.length / rowsPerPage)} type="button" className="-btn" onClick={() => handleChangePage(page + 1)}>Next</button></div>
                        </div>
                    </div>)
                }
                {
                    pageRows.length === 0 && (<div className='rt-noData'>No rows found.</div>)
                }
                <div className={isLoading ? '-loading -active' : '-loading'}>
                    <div className="-loading-inner">Loading...</div>
                </div>
            </div>
        </div>
    )
}

export default DataTable;