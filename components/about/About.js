import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Footer from '../footer/Footer';

const About = ({navigation}) => {
  return (
    <>
    <View style={styles.upperheader}>
                    <View style={styles.upperheadercontent}>
                    <View style={styles.username}>
                        
                        <Text style={styles.usernamestyles}>About</Text>
                       
                    </View>
                    </View>
               </View>
    
    <View style={styles.container}>
         
      <View style={styles.imageRow}>
        <View style={styles.imageContainer}>
          <Image source={require('../images/suraj.png')}  style={styles.image} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../images/purv.png')}  style={styles.image} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../images/tushar.png')}  style={styles.image} />
        </View>
        <View style={styles.imageContainer}>
          <Image source={require('../images/robin.png')}  style={styles.image} />
        </View>
      </View>
      <Text style={styles.description}>
      IBD Companion is a comprehensive mobile application designed to support individuals living with Inflammatory Bowel Disease (IBD) in managing their health and well-being. Developed by a team of passionate students, including Suraj, Parv, Tushar, and Robin, this app offers a wide range of features to empower IBD patients on their journey towards better health.
      </Text>
    </View>
    <View>
        <Footer />
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'white'
  },
  imageRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  imageContainer: {
    borderRadius: 50, // Make the container round
    overflow: 'hidden', // Ensure the image is clipped to the container
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40, // Make the image round
  },
  
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
    color:'black',
  },
  upperheader:{
    backgroundColor: 'blueviolet',
    height:100
},
upperheadercontent:{
    top:40,
    display:'flex',
    flexDirection:'row',
},
username:{
   left:10
},
usernamestyle:{
    color:'white',
    fontWeight:"bold",
    fontSize:25
},
usernamestyles:{
    color:'white',
    
    fontSize:20
},
});

export default About;
