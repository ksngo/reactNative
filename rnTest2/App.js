/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
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
    paddingTop: 80,
    height: 800,
  }

  return (
    <SafeAreaView style={containerStyle}>
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
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll={true}
        contentOffset={{x:0, y:0}}
        decelerationRate={'normal'}
        disableIntervalMomentum={true}
        onContentSizeChange={(e) => console.log('hello',e)}
        onMomentumScrollBegin={()=> console.log('onMomentumScrollBegin')}
        onScroll={()=>console.log('onScroll')}
        contentContainerStyle={styles.contentContainerStyle}>
        
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
            <Button
              title="Go Second Screen"
              onPress={()=> navigation.navigate('Second')}
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
     {/* continue from https://reactnative.dev/docs/sectionlist */}
      
    </SafeAreaView>
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

const Second = ({navigation}) => {

  const [chosenData, setChosenData]=useState();
  const [refreshing,setRefreshing]=useState(true);

  const isEven = (Math.floor(Math.random()*10))%2 == 0;

  const containerStyle = {
    backgroundColor: isEven ? Colors.lighter : Colors.darker,
  }

  return (
    <SafeAreaView style={{containerStyle}}>
      <Button
          title="Back to Home"
          onPress={()=> navigation.navigate('Home')}
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
  )
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
