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
        <div className="flex justify-between text-[#968469]">
          <div>
            <span>Total : {totalRecords} </span>
          </div>
          <Stack spacing={2} className="flex items-end">
            <Pagination
                siblingCount={0}
                page={currentPage}
                count={totalPage}
                variant="outlined"
                shape="rounded"
                color='secondary'           
                onChange={(e,page) => {navigate(`?page=${page}`)
                  console.log(e);
                }}
                sx= {
                  {
                    "& .MuiPaginationItem-root": {
                      color: "#968469",
                    }
                  }
                }
                size="small"

            />
        </Stack>
        </div>
        
    );
};
