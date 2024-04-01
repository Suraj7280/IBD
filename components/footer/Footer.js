import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faSearch, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import Dairy from '../dairy/Dairy';
import { useNavigation } from '@react-navigation/native';
import Userprofile from '../userprofile/Userprofile';
import Home from '../home/Home';
import Search from '../search/Search';

const Footer = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate(Home)}><FontAwesomeIcon icon={faHome} style={styles.icon} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(Dairy)}><FontAwesomeIcon icon={faPlusCircle} style={styles.icon} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(Search)}><FontAwesomeIcon icon={faSearch} style={styles.icon} /></TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(Userprofile)}><FontAwesomeIcon icon={faUser} style={styles.icon} /></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    backgroundColor: 'blueviolet',
    paddingVertical: 30,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'blueviolet',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    color: 'white',
    fontSize: 30,
    fontWeight:'bold'
  },
});

export default Footer;
