import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet, Text, TouchableOpacity,Image } from 'react-native';
import Login from '../loginandregistrationpage/Login';

const SCREEN_WIDTH = Dimensions.get('window').width;
const PAGE_COUNT = 3;
const INTERVAL_DURATION = 2000;

const FirstScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      // Move to the next slide
      setCurrentIndex((prevIndex) =>
        prevIndex === PAGE_COUNT - 1 ? 0 : prevIndex + 1
      );
      flatListRef.current.scrollToIndex({
        animated: true,
        index: currentIndex === PAGE_COUNT - 1 ? 0 : currentIndex + 1,
      });
    }, INTERVAL_DURATION);

    return () => clearInterval(interval);
  }, [currentIndex]);

 

  
  const renderItem = ({ item }) => {
    let content;
    switch (item) {
      case 0:
        content = <View>
          <Image
              source={require('../images/community.png')}
              style={{height:220, width:400}}
            />
          <Text style={styles.content}>Community for IBD Fighters</Text>
          <Text style={styles.content1}>Welcome to our inclusive community for IBD Fighters, offering support, understanding, and solidarity in navigating life with Inflammatory Bowel Disease. Join us today!</Text>
        </View>;
        break;
      case 1:
        content = <View >
          <View><Image
        source={require('../images/doctor1.png')} 

        style={{height: 240, width: 400,top:-10}}
      />
            </View>
        <Text style={styles.contentheading}>Empowering IBD Patients</Text>
        <Text style={styles.content2}>A supportive community where every voice is heard, every challenge is understood, and every triumph is celebrated. </Text>
        </View>;
        break;
      case 2:
        content = <View>
          <Image
        source={require('../images/health2.png')} 

        style={{height: 220, width: 400}}
      />
          <Text style={styles.contentheading1}>Building Resilience Against IBD</Text>
          <Text style={styles.content3}>Discover understanding, support, and resilience in our community. Together, we navigate the challenges of living with Inflammatory Bowel Disease. </Text>
        </View>;
        break;
      default:
        content = null;
    }

    return (
      <View style={styles.page}>
        {content}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={[0, 1, 2]} // Three screens
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toString()}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        onScroll={(event) => {
          setCurrentIndex(Math.floor(event.nativeEvent.contentOffset.x / SCREEN_WIDTH));
        }}
        onScrollToIndexFailed={() => {}}
      />
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate(Login)}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blueviolet',
    opacity:1
  },
  skipButton: {
    position: 'absolute',
    backgroundColor: 'blue',
    borderRadius: 5,
    bottom: 30,
    
    width:'20%',
    left:300,
    height:50,
    opacity:0.9
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
    top:10,
    fontSize:20
  },
 
  content:{
    color:'white',
    top:20,
    fontWeight:'bold',
    fontSize:25,
    textAlign:"center"
  },
  content1:{
    color:'white',
    top:20,
    fontWeight:'bold',
    fontSize:15,
    textAlign:"center",
    padding:14
  },
  content2:{
    color:'white',
    top:0,
    fontWeight:'bold',
    fontSize:15,
    textAlign:"center",
    padding:14
  },
  contentheading:{
    color:'white',
    top:0,
    fontWeight:'bold',
    fontSize:25,
    textAlign:"center"
  },
  content3:{
    color:'white',
    top:10,
    fontWeight:'bold',
    fontSize:15,
    textAlign:"center",
    padding:14
  },
  contentheading1:{
    color:'white',
    top:10,
    fontWeight:'bold',
    fontSize:25,
    textAlign:"center"
  }
});

export default FirstScreen;
