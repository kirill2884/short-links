import { Box } from "@mui/material"
import { ShortLink } from "../../types/model/ShortLink"
import { DataGrid, GridColDef} from "@mui/x-data-grid"



export type Props = {
    columns:GridColDef[]
    result:ShortLink[]
}

const ShortLinksTable:React.FC<Props> = (props) => {

    
    return   <Box sx={{ height: "80vh", width: '100vw', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <DataGrid style={{width:'90vw'}} rows={props.result} columns={props.columns}/>
            </Box>
}

export default ShortLinksTable;