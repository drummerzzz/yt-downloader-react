import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Input,
  Button,
  theme,
  RadioGroup,
  Stack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Container
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { FaDownload } from "react-icons/fa"
import axios from 'axios'

import {  } from '@chakra-ui/react'
import { VideoInfo } from "./models/video"

//https://chakra-ui.com/docs/

export const App = () => { 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [urlVideo, setUrlVideo] = React.useState<string>('')
    const [videos, setData] = React.useState<VideoInfo>({
      title: '',
      thumbnail_url: '',
      resolutions: []
    })

    const getVideoDownloadOptions = async () => {
      setIsLoading(true)
      //const expression = /http[s]?:\/\/youtube.*/i
      //if (!expression.test(urlVideo)) {
      //  alert('Url inválida')
      //  setIsLoading(false)
      //  return
      //}
      const baseUrl = 'https://brtools-backend.vercel.app'
      //const baseUrl = 'http://localhost:5000'
      const url = baseUrl + '/api/tools/ytdownload'
      axios.post<VideoInfo>(url, {
        url: urlVideo
      }).then(({ data }) => {
        setData(data)
        onOpen()
      }).catch(() => {
        alert('Não foi possível obter o video!')
      }).finally(() => {
        setIsLoading(false)
      })
    }
    
    const ModalDownloader = () => (
      <Modal scrollBehavior="inside" isCentered isOpen={isOpen} onClose={onClose} size="xl">
            <ModalContent>
              <ModalHeader>
                  <Stack textAlign="center" align="center">
                    <Text fontSize="xl" fontWeight="bold">{videos.title}</Text>
                    <img src={videos.thumbnail_url} width="300vw" />
                  </Stack>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                  <Container textAlign="center" flexWrap="wrap-reverse" flexDirection="row">
                  {videos.resolutions.map((item, index) => (
                    <Button key={index} leftIcon={<FaDownload/>} 
                      margin={2} width="8em" height='6em' onClick={() => {
                        const a = document.createElement('a')
                        a.href = item.url
                        a.target = '_blank'
                        a.download = `${item.title}.${item.extention}`
                        a.click()
                      }}>
                        {item.resolution} <br />
                        {item.size}MB <br /> {item.extention}
                    </Button>
                  ))}
                  </Container>
              </ModalBody>
            </ModalContent>
          </Modal>
    )

    return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" >
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="20vmin" pointerEvents="none" />
            <Input autoFocus={true} onInput={(event) => setUrlVideo(event.currentTarget.value)} w="70vw"
              placeholder='Paste here: https://www.youtube.com/watch?v=JxKyS_UWTIA' size='lg' />
            <Button
              isLoading={isLoading}
              loadingText='Obtendo...'
              disabled={!urlVideo || isLoading}
              width="10rem"
              height="48px"
              onClick={getVideoDownloadOptions}
              colorScheme="white" variant='outline' rightIcon={<FaDownload />}>Download</Button>

          </VStack>
        </Grid>
        <ModalDownloader/>
      </Box>
    </ChakraProvider>
  )
}
