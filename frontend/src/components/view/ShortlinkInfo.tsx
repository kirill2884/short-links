import { Box, Typography } from "@mui/material";
import { ShortLinkInfoResponse } from "../../types/ShortLinkInfoResponse";


export type Props ={
  result:ShortLinkInfoResponse|null,
  shortlink:string
}

const ShortLinkInfo:React.FC<Props> = (props) => {
 
  if (!props.result) return null;   
    
return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Info about: {props.shortlink}</Typography>
      <Typography>Count redirect: {props.result?.clickCount}</Typography>
      <Typography>OriginalURL: {props.result.originalUrl}</Typography>
    </Box>
  );
}

export default ShortLinkInfo