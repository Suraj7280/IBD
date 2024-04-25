import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet,  ScrollView ,Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../footer/Footer';


const Symptoms = ({navigation}) => {
 

  useEffect(() => {
    const getUsername = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      setUsername(storedUsername);
    };
    getUsername();
  }, []);
  const [username, setUsername] = useState('');
  const [date, setDate] = useState('');
  const [stoolConsistency, setStoolConsistency] = useState('');
  const [painPassingStool, setPainPassingStool] = useState('');
  const [stoolColor, setStoolColor] = useState('');
  const [stoolFrequency, setStoolFrequency] = useState('');
  const [mucousInStool, setMucousInStool] = useState('');
  const [bloodInStool, setBloodInStool] = useState('');
  const [painLocation, setPainLocation] = useState('');
  const [fever, setFever] = useState('');
  const [nausea, setNausea] = useState('');
  const [flatulence, setFlatulence] = useState('');


  const handleFormSubmit = () => {
    const formData = {
   
     username,
      date,
      stoolConsistency:stoolConsistency===''?0:stoolConsistency,
      painPassingStool: painPassingStool ==='yes' || painPassingStool==='Yes' || painPassingStool==='YES' ? 1 :0,
      stoolColor,
      stoolFrequency:stoolFrequency===''?0:stoolFrequency,
      mucousInStool: mucousInStool ==='yes' ? 1 : 0,
      bloodInStool: bloodInStool ==='yes' ? 1 : 0,
      painLocation,
      fever: fever ==='yes' ? 1 : 0,
      nausea: nausea ==='yes' ? 1 : 0,
      flatulence: flatulence ==='yes' ? 1 : 0,

    };

    console.log('Form Data:', formData);
   // Implement API call to send formData to the backend
    fetch('http://10.0.2.2:3000/symptoms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form data submitted:', data);
        // Reset form after successful submission
        setUsername('');
        setDate('');
        setStoolConsistency('');
        setPainPassingStool('');
        setStoolColor('');
        setStoolFrequency('');
        setMucousInStool('');
        setBloodInStool('');
        setPainLocation('');
        setFever('');
        setNausea('');
        setFlatulence('');
      })
      .catch(error => {
        console.error('Error submitting form data:', error);
   });




  };

 
  
  

  return (
    <>
       <View style={styles.header}>
        <Text style={styles.headerText}>Fill Symptom Details</Text>
      </View>
      <ScrollView style={{flex:0.8}}>
        <View >
      <View style={{padding:2, }}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Date</Text>
      <TextInput
        style={styles.input}
        placeholder="Formate:DD/MM/YYYY"
        value={date}
        onChangeText={setDate}
      />
     </View>
      </View>
      <View style={{padding:2, backgroundColor:'white'}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Stool Consistency</Text>
      <TextInput
        style={styles.input}
        placeholder="Range: (1-10)"
        value={stoolConsistency}
        onChangeText={setStoolConsistency}
      />
     </View>
      </View>
      <View style={{padding:2, }}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Stool Color</Text>
      <TextInput
        style={styles.input}
        placeholder="example: yellow , red etc"
        value={stoolColor}
        onChangeText={setStoolColor}
      />
     </View>
      </View>
     
      <View style={{padding:2, backgroundColor:'white'}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Stool Frequency</Text>
      <TextInput
        style={styles.input}
        placeholder="Range (1-10)"
        value={stoolFrequency}
        onChangeText={setStoolFrequency}
      />
     </View>
      </View>
     
      <View style={{padding:2, }}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}>Pain Location</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Upper Abdomen,Lower Abdomen,Both "
        value={painLocation}
        onChangeText={setPainLocation}
      />
     </View>
      </View>

      <View style={{padding:2, backgroundColor:'white'}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}> Pain Passing Stool</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Yes or No"
        value={painPassingStool}
        onChangeText={setPainPassingStool}
      />
     </View>
      </View>

      <View style={{padding:2, }}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}> Mucous In Stool</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Yes or No "
        value={mucousInStool}
        onChangeText={setMucousInStool}
      />
     </View>
      </View>

      <View style={{padding:2, backgroundColor:'white'}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}> Blood In Stool</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Yes or No "
        value={bloodInStool}
        onChangeText={setBloodInStool}
      />
     </View>
      </View>
      <View style={{padding:2, }}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}> Fever</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Yes or No "
        value={fever}
        onChangeText={setFever}
      />
     </View>
      </View>
     
      <View style={{padding:2, backgroundColor:'white'}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}> Nausea</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Yes or No "
        value={nausea}
        onChangeText={setNausea}
      />
     </View>
      </View>

      <View style={{padding:2,}}>
        <View style={styles.dateconstainer}>
      <Text style={styles.textdesign}> Flatulence </Text>
      <TextInput
        style={styles.input}
        placeholder="ex: Yes or No "
        value={flatulence}
        onChangeText={setFlatulence}
      />
     </View>
      </View>
      
     
     
      <Button title="Submit" onPress={handleFormSubmit} />
      </View>
    </ScrollView>
    <View style={{flex:0.13}}>
      <Footer />
    </View>
    
    </>
  );
};

const styles = StyleSheet.create({
  dateconstainer:{
    alignItems:'center',
    
    top:0,
    height:90,
    //borderTopEndRadius:50,
    //borderBottomStartRadius:50, 
    
 
  },
  textdesign:{
    top:5,
    fontSize:20,
    color:'black',
    
   
  },
    input: {
      width: '80%',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      padding: 5,
      marginBottom: 10,
      top:6,
      backgroundColor:'white'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
      },
      header: {
        height: 70,
        backgroundColor: 'blueviolet',
        justifyContent: 'center',
        
      },
      headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white',
        left:20
      },
  });
  
  export default Symptoms;