import { StyleSheet, Text, View ,Image , Button} from "react-native";
import React from "react";
import { BottomContainer, Container, EfirdaWord, Efirlar, MainView, MainWords, Name, PlayIcon, ScrollDiv, Tab, TabWrapper, TimeName, VideoContainer } from "./style";
import MainBG from "./../../images/mainbg.png";
import Ozb24 from "./../../images/ozb24.png";
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Video, AVPlaybackStatus } from 'expo-av';
import Play_Icon from '../../images/play-button.png'
import {EfirlarDAta} from '../../data/efirlar'
import {fontConfig } from './../../constants/index'

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
};



const BizTv = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [Show, setShow] = React.useState(false);
  const [category, setcategory] = React.useState('480')
  const [cat_data, setcat_data] = React.useState(['480','720','1080']);

  return (
    <Container source={MainBG} resizeMode="repeat">
      <View style={styles.shadowProp}>
        <PlayIcon source={Play_Icon} 
          //  title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }

        /> 
        <Video
          ref={video}
          style={{width:'100%',height:'90%'}}
          source={{
            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <Image style={{marginBottom:-10}} source={Ozb24} />
      </View>
      
      <BottomContainer>
         <TabWrapper>
            {
              cat_data.map((item,ind)=>(
                <Tab
                 key={ind}
                 bg={item===category ? true : false}
                 onPress={()=>setcategory(item)}
                >
                    {item}
                  </Tab>
              ))
            }
         </TabWrapper>
         <Efirlar>
             <Name>Hozir efirda</Name>
             <ScrollDiv>
               {
                 EfirlarDAta.map((p,i)=>{
                   return (
                      <MainView key={i} bg={p.is_efir}>
                        <TimeName>{p.time}</TimeName>
                        <View>
                          <MainWords style={{fontFamily:'Roboto'}}>{p.title}</MainWords>
                          {p.is_efir ? <EfirdaWord>{'\u2022'}&nbsp;HOZIR EFIRDA</EfirdaWord> : null}
                        </View>
                      </MainView>
                   )
                 })
               }
             </ScrollDiv>
         </Efirlar>
      </BottomContainer>
    </Container>
  );
};

export default BizTv;

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 22,
    },
    shadowOpacity: 0.98,
    shadowRadius: 25.00,
    elevation: 24,
    marginTop: 80,
    padding: 0,
    paddingBottom:21,
    overflow: "hidden",
    height: 250,
    width: "93%",
    borderRadius: 15,
    display: "flex",
    alignItems:'center',
    justifyContent:'space-between',
    backgroundColor:'white',
    
  },
  backgroundVideo: {
    position: 'absolute',
    top: '-20px',
    left: 0,
    bottom: 0,
    right: 0,
  },
});
