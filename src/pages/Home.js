import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import GlobalStyles from '../styles/GlobalStyles';
import Theme from '../styles/Theme';
import {Input} from '../components/Input';
import { ItemGit } from '../components/ItemGit'; 
import api from '../services/Api';

export function Home( { navigation} ) { 
  const [ nickname,setNickname ] = useState('');
  const [ users,setUsers ] = useState([]); 

  function navigationDetails( login){
      navigation.navigate('details', {user: login } );
  }

  async function handleSearchUser( ){
    try { 
      response = await api.get('/users/' + nickname);
      const {data} = response;

      const obj = {
        id: data.id,
        nome: data.name,
        login: data.login,
      }

      setUsers( oldValue => [...oldValue, obj ] );
      setNickname(''); 
    } catch (error) {
      console.error(error);
    } 
  }

  return (

    <View style={GlobalStyles.screenContainer}> 
      <AntDesign name="github" size={98} color={Theme.colors.primary} />  
      <Text style={styles.title}>GIT.Networking </Text>
      <Input placeholder="Digite o nickname do usuário"  onChangeText={setNickname} 
       onPress={ handleSearchUser } />

     
      <FlatList  data={users}  
          keyExtractor={item => item.id.toString()} 
          renderItem={ ({item}) =>  (
              <ItemGit name={item.login} onPress={ () => navigationDetails( item.login )}/>
          ) }
      />  
    </View>

  );
}

const styles = StyleSheet.create({
  title:{
    fontSize: 30,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.primary,
  }
})