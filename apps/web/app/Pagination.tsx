import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface Props {
  numProducts: number;
}

export default function PaginationButtons({ numProducts }: Props) {
  const numPages = Math.ceil(numProducts / 20);
  return (
    <Stack spacing={2}>
      <Pagination count={numPages} showFirstButton showLastButton />
    </Stack>
  );
}

// const [page, setPage] = React.useState(1);
//   const [rowsPerPage, setRowsPerPage] = React.useState(20);

//   const handleChangePage = (
//     event: React.MouseEvent<HTMLButtonElement> | null,
//     newPage: number,
//   ) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <TablePagination
//       component="div"
//       count={100}
//       page={page}
//       onPageChange={handleChangePage}
//       rowsPerPage={rowsPerPage}
//       onRowsPerPageChange={handleChangeRowsPerPage}
//     />
//   );
