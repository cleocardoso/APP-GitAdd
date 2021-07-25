import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Theme from '../styles/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 


export function ItemGit({name, onPress }) {
  return (
    <View style={ styles.container}>
      <Text style={styles.nickname}>{name}</Text>
      <View style={styles.separador}></View>  

      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={ onPress } >
            <Ionicons name="ios-eye-outline" size={25} color={Theme.colors.gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginTop:15,
        width: '90%',
        height: 50,
        backgroundColor:'#DEE4E4',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
    },
    nickname:{
        paddingLeft: 30,
        fontSize: 17,
        fontFamily: Theme.fonts.rebotoRegular,
    },
     
    button:{
        padding:15,
    }
   
});