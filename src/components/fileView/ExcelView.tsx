import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
    Table,
    TableCaption,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    Button,
} from '@chakra-ui/react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { File } from '@/types/file';

export default function ExcelView({ file }: { file: File }) {
    const [excelData, setExcelData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (file.mimeType.length > 0) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file.content);
            reader.onloadend = (e) => {
                const bufferArray = e.target?.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                setExcelData(data);
                setLoading(false); // Mark loading as complete
            };
        }
    }, [file]);

    const filteredData = excelData
        .filter((row) => {
            if (searchTerm === '') return true;
            return Object.values(row).some((value) =>
                value
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        })
        .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    useEffect(() => {
        setTotalPages(Math.ceil(excelData.length / rowsPerPage));
    }, [excelData, rowsPerPage]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        type="text"
                        value={searchTerm}
                    />
                    {filteredData.length > 0 ? ( // Check if there are search results
                        <>
                            <Table colorScheme="teal" variant="striped">
                                <TableCaption>{file.name}</TableCaption>
                                <Thead>
                                    <Tr>
                                        {Object.keys(filteredData[0]).map(
                                            (key) => (
                                                <Th key={key}>{key}</Th>
                                            )
                                        )}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {filteredData.map((row, i) => (
                                        <Tr key={i}>
                                            {Object.values(row).map(
                                                (value, j) => (
                                                    <Td key={j}>{value}</Td>
                                                )
                                            )}
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                            <div>
                                {currentPage !== 1 ? (
                                    <Button
                                        className="pagination-btn"
                                        colorScheme="teal"
                                        size={'sm'}
                                        onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                        }
                                    >
                                        <FaAngleLeft />
                                    </Button>
                                ) : (
                                    // eslint-disable-next-line react/jsx-no-useless-fragment
                                    <></>
                                )}
                                <span>
                                    {currentPage} of {totalPages}
                                </span>
                                {currentPage !== totalPages ? (
                                    <Button
                                        className="pagination-btn"
                                        size={'sm'}
                                        colorScheme="teal"
                                        onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                        }
                                    >
                                        <FaAngleRight />
                                    </Button>
                                ) : (
                                    // eslint-disable-next-line react/jsx-no-useless-fragment
                                    <></>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>No results found.</p>
                    )}
                </>
            )}
        </div>
    );
}
