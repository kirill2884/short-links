import { Box, Button, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { CreateShortLinkRequest } from "../../types/CreateShortLinkRequest";
import { shortLinkService } from "../../instanses/services";


const CreateShortLinkForm:React.FC = () => {

    const [expired, setExpired] = useState<Dayjs | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  
        const data = new FormData(event.currentTarget);
        const form = event.currentTarget;
        const newShortLink:CreateShortLinkRequest = {
            originalUrl:`${data.get('originalUrl')}`,
            expireAt:new Date(Number.parseFloat(expired + ""))
        }
        const alias = `${data.get('alias')}`
        
        if(alias.trim() !== ''){
            newShortLink.alias = alias
        }

          try {
            await shortLinkService.createShortLink(newShortLink);
            setError(null)
            form.reset();
          } catch (error: any) {
            setError(error.message);
        }

        
        
        shortLinkService.createShortLink(newShortLink);
        event.currentTarget.reset();
      };

    return <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 5 }}>
              <Typography variant="h5" gutterBottom>
                Create new short link
              </Typography>
              <TextField
                fullWidth
                required
                label="Origin URL"
                name="originalUrl"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Alias"
                name="alias"
                margin="normal"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                          <DatePicker sx={{width:"300px"}} label="Expire at" onChange={(value) => setExpired(value)}/>
                      </DemoContainer>
              </LocalizationProvider>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
              </Button>
              <Box>
                {error && <Typography color="error">{error}</Typography>}
              </Box>
            </Box>
}

export default CreateShortLinkForm

