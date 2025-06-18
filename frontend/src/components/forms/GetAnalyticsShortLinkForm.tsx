import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { AnalyticsResponse } from "../../types/analitycs/AnalitycsResponse";


type Props = {
    onSubmit: (shortUrl: string) => Promise<void>;
}

const GetAnalyticsShortLinkForm:React.FC<Props> = (props) => {

    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (shortUrl.trim()) {
        props.onSubmit(shortUrl.trim());
        }
    };


    return <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 500, mx: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Typography variant="h6" component="h2">
                Get analytics by shortlink
              </Typography>

              <TextField
                label="Short link (alias)"
                variant="outlined"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
                fullWidth
                required
              />

              <Button type="submit" variant="contained" color="primary">
                Get analitics
              </Button>
            </Box>
}

export default GetAnalyticsShortLinkForm