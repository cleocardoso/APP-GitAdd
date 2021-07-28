import React from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity} from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';
import Theme from '../styles/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign'; 

export function Input({placeholder,onPress,onChangeText}) {
  return (
    <View style={ styles.container}>
      <TextInput style={styles.inputText} placeholder={placeholder}
        placeholderTextColor={Theme.colors.gray2}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
         <AntDesign name="right" size={20} color={Theme.colors.gray2}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        marginTop:40,
        width: '100%',
        height: 65,
        backgroundColor: '#FFFFFF',
        flexDirection:'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    inputText:{
      flex: 1,
      height: '100%',
      backgroundColor: '#FFFFFF',
      paddingLeft: 20,
      color: Theme.colors.gray,
      fontFamily: Theme.fonts.rebotoRegular,
      fontSize: 17,
      
    },
    button:{
      padding: 15,
      backgroundColor: '#FFFFFF',
      borderLeftWidth:1,
      borderLeftColor: Theme.colors.gray3,
    }
});