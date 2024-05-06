import { useNavigate } from "react-router-dom";
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';






type Props = {
    classes?: {
        [key: string]: string;
    };
    currentPage: number;
    totalPage: number;
    totalRecords: number;
};
export const PaginationActivity: React.FC<Props> = ({
    currentPage,
    totalPage,
    totalRecords,
}) => {
    const navigate = useNavigate()
    console.log("current page ",currentPage)
    return (
        <div className="flex justify-between text-[#968469] pl-3 pr-3">
          <div>
            <span>Total {totalRecords} results</span>
          </div>
          <Stack spacing={2} className="flex items-end">
            <Pagination
                page={currentPage}
                count={totalPage}
                variant="outlined"
                shape="rounded"
                color='secondary'           
                onChange={(event, page) => navigate(`?page=${page}`)}
                sx= {
                  {
                    "& .MuiPaginationItem-root": {
                      color: "#968469",
                    }
                  }
                }
            />
        </Stack>
        </div>
        
    );
};
