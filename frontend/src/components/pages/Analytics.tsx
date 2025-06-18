import { Box, Typography } from "@mui/material";
import GetAnalyticsShortLinkForm from "../forms/GetAnalyticsShortLinkForm";
import { AnalyticsResponse } from "../../types/analitycs/AnalitycsResponse";
import { analyticsService } from "../../instanses/services";
import { useState } from "react";
import AnalyticsResult from "../view/AnalyticsResult";



const Analitics:React.FC = () => {

const [data, setData] = useState<AnalyticsResponse | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


async function getAnalitics(shortUrl:string) {
    setLoading(true);
    setError(null);
    try {
      const result = await analyticsService.getAnalitics(shortUrl);
      setData(result);
    } catch (err) {
      setError('Unable to retrieve analytics');
    } finally {
      setLoading(false);
    }
}

return  <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
                gap: 3, 
            }}>
          <GetAnalyticsShortLinkForm onSubmit={getAnalitics}></GetAnalyticsShortLinkForm>
          <Box>
              {!error && <AnalyticsResult result={data}></AnalyticsResult>}
          </Box>
          <Box>
              {error && <Typography color="error">{error}</Typography>}
          </Box>
          <Box>
              {loading && <Typography color="info">Loading...</Typography>}
          </Box>
        </Box>
};

export default Analitics