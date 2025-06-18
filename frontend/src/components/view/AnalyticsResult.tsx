import { Box, Typography } from "@mui/material"
import { AnalyticsResponse } from "../../types/analitycs/AnalitycsResponse"

export type Props ={
  result:AnalyticsResponse|null
}

const AnalyticsResult:React.FC<Props> = ({result }) => {
 
  if (!result) return null;   
    
return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Analytics:</Typography>
      <Typography>Count redirect: {result.clickCount}</Typography>
      {result.recentIps.length > 0 && <Typography>Last ip:</Typography>}
      {result.recentIps.map((ip, index) => (
          <Typography key={index}>IP address: {ip}</Typography>
      ))}
    </Box>
  );
}

export default AnalyticsResult