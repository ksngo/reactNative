/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  FlatList,
  SectionList,
  TouchableHighlight,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  RefreshControl,
  BackHandler,
  Alert,
  DrawerLayoutAndroid,
  TouchableNativeFeedback,
  Animated,
  Dimensions,
  Easing,
  LayoutAnimation,
  UIManager,
  Linking,
  PixelRatio,
  Platform,
  Share,
  Vibration,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { sampleData, sectionListData } from './constants' ;


const Stack = createNativeStackNavigator();

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Item = ({data, onPress, backgroundColor})=> {
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={{backgroundColor,margin:5}}>
      <Text>Index: {data.index}</Text>
      <Text>Id: {data.item?.id}</Text>
      <Text>Title: {data.item?.title}</Text>
    </TouchableOpacity>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'welcome'}}
        />
        <Stack.Screen
          name="Second"
          component={Second}
        />
        <Stack.Screen
          name="Third"
          component={Third}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Home: () => Node = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [statusBarVisibility, setStatusBarVisibility] = useState(false)
  const [textOne, setChangeTextOne] = useState('');
  const [textTwo, setChangeTextTwo] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [selectedItemId,setSelectedItemId] = useState();
  const [modalVisible, setDisplayModal] = useState(false);
  const [scrollviewRefreshing, setScrollviewRefreshing] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = StyleSheet.create({
    scrollview: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      padding: 10,
      flex:1,
    },
    contentContainerStyle: {
      margin:2,
      backgroundColor: 'red',
      padding: 10,
    }
  })

  const containerStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    paddingTop: 0,
    height: 800,
  }

  return (
    <View style={containerStyle}>
      <Modal
        visible={modalVisible}
        animationType={"fade"}
        transparent={false}
        onRequestClose={()=> {console.log('for andrioid back button');setDisplayModal(false)}}
        onShow={()=> console.log('onShow')}
      >
        <View style={{backgroundColor: "orange", flexDirection: "row"}}>
          <View style={{flex: 1}}><Text>{String(modalVisible)}</Text></View>
          <View style={{flex: 1}}><Text>2</Text></View>
          <View style={{flex: 1}}><Text>3</Text></View>
          <Button onPress={()=> {setDisplayModal(false);navigation.navigate("Second")}} title={"Go Second"}/>
          <Button onPress={() => {setDisplayModal(false)}} title={"Back to Home"}/>
        </View>
      </Modal>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        hidden={statusBarVisibility}
        animated={true}
        translucent={true}
        showHideTransition={'slide' //only forIOS;
         }/> 
      <TouchableOpacity
        onPress={()=> {
          console.log('something')
          StatusBar.setBackgroundColor(`#${Math.floor(Math.random()*16777215).toString(16)}`);
          StatusBar.setBarStyle('light-content')
          setStatusBarVisibility(!statusBarVisibility)}}
        style={{alignItems:'center', backgroundColor:'yellow', height:50}}
        >
          <Text>Toggle Status Bar of height {StatusBar.currentHeight}</Text>
      </TouchableOpacity>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollview}
        stickyHeaderIndices={[]}
        stickyHeaderHiddenOnScroll={true}
        contentOffset={{x:0, y:0}}
        decelerationRate={'normal'}
        disableIntervalMomentum={true}
        onContentSizeChange={(e) => console.log('hello',e)}
        onMomentumScrollBegin={()=> console.log('onMomentumScrollBegin')}
        onScroll={()=>console.log('onScroll')}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl 
            refreshing={scrollviewRefreshing} 
            onRefresh={()=> {
              setScrollviewRefreshing(true);
              let wait = new Promise((res,rej)=> {setTimeout(res,3000)});
              wait.then(()=> setScrollviewRefreshing(false));
            }}
            colors={["red","blue","brown"]}
            progressBackgroundColor={"yellow"}
            size={"large"}
          />
        }>
        
        <Header />
        <View
          style={{
            
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Editsss <Text style={styles.highlight}>App.js</Text> to changesss this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks/>
          <View
            style={{flexDirection: "row",height:200}}
            onMoveShouldSetResponder={(e)=> {console.log('onMoveShouldSetResponder');return true}}
            onResponderGrant={(e)=>console.log('onResponderGrant',e)}
            onResponderMove={(e)=>console.log('onResponderMOve',e)}
            
          >
            <View style={{backgroundColor: "blue",flex:0.5}}>
              <Text style={{color:'white'}}>{'testing Text'}
                <Text style={{fontSize:20}}>{' inline text'}</Text>
              </Text>
              <Text style={{color:'yellow',fontWeight:'bold'}} numberOfLines={1} ellipsizeMode={'middle'}>{'new line text new line text new line text'}</Text>
              <Text style={{color:'white'}} >{'websparks'}</Text>
            </View>
            <View style={{backgroundColor: "red",flex:0.5}}/>
            <Text selectable={true} selectionColor={'pink'}> ... </Text>
          </View>
          
            <Image 
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}} 
              style={{width:50,height:50}}
              onLoad={async ()=>{ let mypromise = await Image.queryCache(['https://reactnative.dev/img/tiny_logo.png']); console.log('mypromise',mypromise)}}
            />
            <Image 
              source={require('./images/milk.jpg')} 
              style={{height:200,width:400}} 
              resizeMethod={'resize'}
              resizeMode={'center'}
            />
            <KeyboardAvoidingView 
              behavior={"height"}
            >
              <View 
                style={{height:300,
                        margin:10,
                        borderColor: 'black',
                        borderWidth: 2,}}>
                <Text>{textOne}</Text>
                <TextInput
                  style={{backgroundColor:'lightgrey'}}
                  onChangeText={setChangeTextOne}
                  value={textOne}
                  autoCapitalize={'sentences'}
                  textAlign={'center'}
                  underlineColorAndroid={'green'}
                />
                <Text>{textTwo}</Text>
                <TextInput
                  style={{  margin: 12, borderWidth: 5, padding: 10, backgroundColor:'darkgrey' }}
                  onChangeText={setChangeTextTwo}
                  value={textTwo}
                  multiline
                  numberOfLines={4}
                  maxLength={40}
                />
                <Switch 
                  onValueChange={(e)=> setSwitchValue(e)}
                  thumbColor={switchValue?'white':'yellow'}
                  trackColor={{false:'pink',true:'black'}}
                  value={switchValue}/>
              </View>
            </KeyboardAvoidingView>
            <Button
              title={"Go Second Page? modal status :"+String(modalVisible)}
              onPress={()=> {setDisplayModal(!modalVisible)}}
            />
            <Button
              title="Go Third Page?"
              onPress={()=> {navigation.navigate("Third")}}
            />
        </View>
      </ScrollView>
      <View style={{backgroundColor:'pink',padding:20,flex:1}}>
        <FlatList
          data={sampleData}
          keyExtractor={item => item.id}
          renderItem={({index,item,separators}) => <Item 
            data={{index,item,separators}} 
            onPress={()=> {
              setSelectedItemId(item.id);
              separators.highlight();
            }}
            backgroundColor={item.id === selectedItemId ? 'green': 'white'}
            />}
          extraData={selectedItemId}
          ItemSeparatorComponent={({highlighted})=> <View style={{height: 2, width: 20, backgroundColor:`${highlighted ? 'red': 'black'}`}}/>}
        />       
      </View>
    </View>
  );
};

const SectionListItem = ({data, onPress, backgroundColor})=> {
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={{backgroundColor,margin:5}}>
      <Text>{data}</Text>
    </TouchableOpacity>
  )
}

//if want to use LayoutAnimation in Android--
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
//--

const Second = ({navigation}) => {

  const [chosenData, setChosenData]=useState();
  const [refreshing,setRefreshing]=useState(true);
  const [pressableState, setPressableState]= useState();
  const [rippleColor, setRippleColor]=useState();
  const [rippleOverflow, setRippleOverflow]=useState(false);
  const [dimension, setDimensions] = useState({ window: Dimensions.get("window"), screen: Dimensions.get("screen")})
  const [layoutAnimatedState, setLayoutAnimatedState] = useState(false);
  const drawerRef=useRef();

  const isEven = (Math.floor(Math.random()*10))%2 == 0;

  const containerStyle = {
    backgroundColor: isEven ? Colors.lighter : Colors.darker,
  }

  useEffect(()=> {

  },[])

  useEffect(()=> {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", ()=> {
      Alert.alert("Alert","This is an alert because you trigger backhandler", [
        {
          text: "Cancel", 
          onPress: ()=> null, 
          style: "cancel"
        },
        {text: "Yes", onPress: ()=> { Alert.alert("You press yes")}}
      ]);
      return true;
    })

    return ()=> backHandler.remove();
  }, [])

  //animation--

  const animOpacity = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(animOpacity, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  }

  const fadeOut =()=> {
    Animated.timing(animOpacity, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      easing: Easing.quad,
    }).start();
  }

  useEffect(()=> {
    fadeIn();
  },[])


  //--

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition={'left'}
      renderNavigationView={()=> (
        <View>
          <Text>Drawer</Text>
          <Button
            title="Close Drawer"
            onPress={()=> drawerRef.current.closeDrawer()}
          />
        </View>
      )}
      
    >
    <SafeAreaView style={{containerStyle}}>
      <Button
        title="open drawer"
        onPress={()=> drawerRef.current.openDrawer()}
      />
      <Button
          title="Back to Home"
          onPress={()=> navigation.navigate('Home')}
        />
      <TouchableHighlight
        onPress={()=> navigation.navigate('Home')}
        activeOpacity={0}
        underlayColor={'green'}
      >
        <View>
          <Text>TouchableHighlight 'back to home'</Text>
        </View>
      </TouchableHighlight>
      <TouchableOpacity
        activeOpacity={0}
      >
       <View>
          <Text>TouchableOpacity 'back to home'</Text>
        </View>
      </TouchableOpacity>
      <TouchableNativeFeedback
        onPress={()=> {
          const randomColor = "#000000".replace(/0/g, ()=> Math.floor((Math.random()*16)).toString(16));
          setRippleColor(randomColor);
          setRippleOverflow(!rippleOverflow);
        }}
        background={TouchableNativeFeedback.Ripple(rippleColor,rippleOverflow)}
      >
        <View style={{borderColor: 'black', borderWidth:1, height:40, backgroundColor:"#999999"}}>
          <Text>TouchableNativeFeedback with Ripple</Text>
        </View>
      </TouchableNativeFeedback>
      <Pressable
        onPressIn={()=> setPressableState("onPressIn") }
        onPressOut={()=> setPressableState("onPressOut") }
        onPress={() => setPressableState("onPress")}
        onLongPress={() =>setPressableState("onLongPress")}
      >
        {(props) => {
          console.log('322props',props); // {pressed : false}
          return (
          <View style={{backgroundColor: `${props.pressed ? 'grey' : 'lightgrey'}`}}>
            <Text>Pressable state {pressableState}</Text>
            <ActivityIndicator />
          </View>
          )
        }}
      </Pressable>
      <Animated.View style={{backgroundColor: 'powderblue', opacity: animOpacity, flexDirection:'row'}}>
          <Text style={{flex:3}}>
            Animated.View tag for view to be animated; 
            Animated.Value to set initial animation e.g. opacity value; 
            Animated.timing to change animation state to another value; 
            the reference Animated.Value is passed inside Animated.View tag's style attributes
          </Text>
          <Button title="fade out" style={{flex:1}} onPress={fadeOut}/>
          <Text>{" "}</Text>
          <Button title="fade in" style={{flex:1}} onPress={fadeIn}/>
      </Animated.View>
      <Text>Window</Text>
      {Object.entries(dimension.window).map(i=> <Text key={`dimensionWindow-${i[0]}`}> {i[0]}-{i[1]}</Text>)} 
      {/* <Text>Screen</Text>
      {Object.entries(dimension.screen).map(([key,value])=> <Text> {key}-{value}</Text>)}  */}
      {layoutAnimatedState &&  <Text> This is animated via LayoutAnimation </Text>}
      <Button 
        onPress={()=> {
          LayoutAnimation.configureNext({
            duration: 300,
            create: 
            {
               type: LayoutAnimation.Types.easeInEaseOut,
               property: LayoutAnimation.Properties.opacity,
            },
            update: 
            {
               type: LayoutAnimation.Types.easeInEaseOut,
            }
           });
        //by setting layoutAnimation configNext before set state,
        //the view dependent on the state will be animated automatically when layout changes due to state changes.
        setLayoutAnimatedState(!layoutAnimatedState);
        }} 
        title="Toggle layoutAnimatedState"
      />
      <SectionList
        sections={sectionListData}
        keyExtractor={(item,index)=> item+index}
        renderItem={({index,item,section,separators})=>{
          return (
            <SectionListItem 
              data={item}
              onPress={()=> setChosenData(section.title+item+index) }
              backgroundColor={chosenData === section.title+item+index? "green": "white"}
            />
          )
        } }
        renderSectionHeader={({section})=> (
          <Text style={{backgroundColor:'pink', fontWeight:'bold'}}> { section.title }</Text>
        )}
        extraData={chosenData}
        refreshing={refreshing}
        onRefresh={()=> { setRefreshing(false)}}
        ItemSeparatorComponent={({highlighted,section,})=> <View style={{height:5,backgroundColor:'rgba(0,100,0,0.1)'}}></View>}
        SectionSeparatorComponent={({highlighted,section,})=> <View style={{height:5,backgroundColor:'rgba(0,0,100,0.3)'}}></View>}
        stickySectionHeadersEnabled={true}
      />
     {/* https://reactnative.dev/docs/backhandler */}
    </SafeAreaView>
    </DrawerLayoutAndroid>
  )
}

const Third = ({navigation})=> {

  const [initialUrl, setInitialUrl] = useState('processing');

  const handleOpenUrl = async ()=> {

    const url = "https://google.com"
    const isSupportedUrl = await Linking.canOpenURL(url);
    console.log('isSupportedUrl',isSupportedUrl)
    await Linking.openURL(url);
    if(isSupportedUrl) {
      await Linking.openURL(url);
    }
  }

  const handleOpenSetting = async () => {
    await Linking.openSettings();
  }

  const handleRunGetInitialUrl = async ()=> {
    const theInitialUrl = await Linking.getInitialURL();
    setInitialUrl(theInitialUrl);
  }

  return <ScrollView>
    <Button
      title="Back to Home"
      onPress={() => { navigation.navigate("Home") }}
    />
    <Text> Linking props: canOpenUrl , openUrl</Text>
    <Button title='open url' onPress={handleOpenUrl} />
    <Text> Linking props: openSettings</Text>
    <Button title='open setting' onPress={handleOpenSetting} />
    <Text> Linking props: getInitialUrl</Text>
    <Text> The InitialUrl is {initialUrl}</Text>
    <Button title='Run getInitialUrl' onPress={handleRunGetInitialUrl} />
    <Text> Linking props: sendIntent</Text>
    <Button title='sendIntent on android.intent.action.POWER_USAGE_SUMMARY' onPress={async () => {
      try {
        await Linking.sendIntent('android.intent.action.POWER_USAGE_SUMMARY')
      } catch(e) {
        Alert.alert(e.message)
      }
    }} />
    <Button title='sendIntent on android.settings.APP_NOTIFICATION_SETTINGS' onPress={async () => {
      try {
        await Linking.sendIntent('android.settings.APP_NOTIFICATION_SETTINGS', 
        [{"android.provider.extra.APP_PACKAGE": "com.facebook.katana" }])
      } catch(e) {
        Alert.alert(e.message)
      }
    }} />
    <View style={{flexDirection: 'row'}}>
      <Image
        source={require('./images/milk.jpg')}
        style={{ height: 100, width: 50}}
      />
      <Text style={{flex:1}}>getPixelSizeForLayout Height Size (100): {PixelRatio.getPixelSizeForLayoutSize(100)}</Text>
      <Text style={{flex:1}}>getPixelSizeForLayout Width Size (50): {PixelRatio.getPixelSizeForLayoutSize(50)}</Text>
    </View>
    <Text style={{borderBottomColor: 'red', borderBottomWidth: StyleSheet.hairlineWidth}}>Platform.constants</Text>
    <Text>{JSON.stringify(Platform.constants, null, 10) }</Text>
    <Button onPress={ async ()=> {
      try {
        const result = await Share.share({
          message: 'share message',
          title: 'share title'
        }, {dialogTitle: 'share dialogTitle'})
        console.log('result.action',result.action)
        console.log('Share.sharedAction',Share.sharedAction)
        console.log('Share.dismissedAction',Share.dismissedAction)
        console.log('result.activityType',result.activityType)
      } catch(err) {
        Alert.alert('err.message')
      }
    }} title='Open Share'/>
    <Button title='Vibrate(not vibrating)' onPress={()=> {Vibration.vibrate()}} />
    <Button title='PermissionsAndroid(not showing persmission modal)' onPress={async ()=> {
      try {
        const checkPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {title:' title', 
          message: 'message', 
          buttonNeutral:'btn neutral', 
          buttonNegative:'btn negative', 
          buttonPositive:'btn positive'})

        console.log('checkPermission',checkPermission)
        console.log('PermissionsAndroid.RESULTS.GRANTED',PermissionsAndroid.RESULTS.GRANTED)
      } catch(err) {
        alert(err.message)
      }
    }}/>
    <Button title='ToasTAndroid(not working)' onPress={()=> {
     ToastAndroid.show("what a toast", ToastAndroid.SHORT)
    }}/>
  </ScrollView>
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
