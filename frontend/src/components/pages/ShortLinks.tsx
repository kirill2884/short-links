import { Box, Typography } from "@mui/material"
import ShortLinksTable from "../tables/ShortLinksTable"
import { ReactNode, useEffect, useState } from "react";
import { shortLinkService } from "../../instanses/services";
import { ShortLink } from "../../types/model/ShortLink";
import config  from "../../config/main.json";
import { GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import Confirmation from "../common/Confirmation";
import ModalWindow from "../common/ModalWindow";
import { ShortLinkInfoResponse } from "../../types/ShortLinkInfoResponse";
import ShortLinkInfo from "../view/ShortlinkInfo";

const ShortLinks:React.FC = () => {

    const [links, setLinks] = useState<ShortLink[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [titleConfirm, setTitleConfirm] = useState<string>('')
    const [contentConfirm, setContentConfirm] = useState<string>('')
    const [activeConfirmation, setActiveConfirmation] = useState<boolean>(false)
    const [currShortLink, setCurrShortLink] = useState<ShortLink|null>(null)
    const [activeModalWindow, setActiveModalWindow] = useState<boolean>(false)
    const [infoAboutShortLink, setInfoAboutShortLink] = useState<ReactNode>()

    function getColumns(){
            
        const columns: GridColDef[] = [
            { field: 'id', headerName: 'ID', flex: 0.1, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
            { field: 'originalUrl', headerName: 'ORIGIN', flex: 0.5, headerClassName: 'data-grid-header', align: 'left', headerAlign: 'center'},
            { field: 'shortUrl', headerName: 'SHORT URL' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center', sortable:false},
            { field: 'expireAt', headerName: 'EXPIRE AT', type: 'date',flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'},
            { field: 'alias', headerName: 'ALIAS', type: 'number' ,flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center' },
            { field: 'createdAt', headerName: 'CREATED AT', type: 'date',flex: 0.2, headerClassName: 'data-grid-header', align: 'center', headerAlign: 'center'}, 
            {
                field: 'actions',headerName: '', type: 'actions',flex:0.2,
            getActions: (params:GridRowParams) => [
                <GridActionsCellItem onClick={() => openConfirm(params.row)} icon={<DeleteIcon/>} label="Delete"/>,
                <GridActionsCellItem onClick={() => openInfo(params.row)} icon={<InfoIcon/>} label="Info"/> 
            ]
            } 
        ]
        return columns
    }

    function openConfirm(shortLink:ShortLink){
        try {
            setTitleConfirm(`Remove shortlink ${shortLink.shortUrl} with id: ${shortLink.id} from table`)
            setContentConfirm('Recovering is not possible after deleting a shortlink')
            setCurrShortLink(shortLink)
            setActiveConfirmation(true)
        } catch (error:any) {

        }
       
    }

    async function openInfo(shortLink:ShortLink){
        try {       
            const link:ShortLinkInfoResponse = await shortLinkService.getInfo(shortLink.shortUrl)
            if(link){
              const linkinfo:ReactNode = <ShortLinkInfo result={link} shortlink={shortLink.shortUrl}></ShortLinkInfo>
              setInfoAboutShortLink(linkinfo)
              setActiveModalWindow(true)
            }
        } catch (error:any) {

        }
       
    }

    useEffect(() => {
      async function fetchData() {
        try {
          const result = await shortLinkService.getAll();
          setLinks(result.map(link => ({...link,expireAt: new Date(link.expireAt),createdAt: new Date(link.createdAt)})));         
        } catch (e) {
          setError("Error fetching of links");
        }
      }

      fetchData();
    }, []);

    async function handleDelete() {
      if (!currShortLink) return;
      await shortLinkService.deleteShortLink(currShortLink!.shortUrl)
      
      setLinks(prev => prev.filter(link => link.shortUrl !== currShortLink.shortUrl));
      setActiveConfirmation(false);
      setCurrShortLink(null);
    }

    return <Box   sx={{display: 'flex',flexDirection: 'column',alignItems: 'center', mt: 4 }}>
                {error && <Typography color="error">{error}</Typography>}
                <Box>
                    <Typography >Server URL - {config.serverUrl}</Typography>
                </Box>
                <ShortLinksTable result={links} columns={getColumns()}></ShortLinksTable>
                <Confirmation callbackAgree={handleDelete} active ={activeConfirmation} setActive={setActiveConfirmation} content = {contentConfirm} question = {titleConfirm}></Confirmation>
                <ModalWindow active = {activeModalWindow} element = {infoAboutShortLink} setActive={setActiveModalWindow}></ModalWindow>    
            </Box>

}

export default ShortLinks