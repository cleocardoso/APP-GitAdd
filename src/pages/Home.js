import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View,FlatList ,Keyboard} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import GlobalStyles from '../styles/GlobalStyles';
import Theme from '../styles/Theme';
import { Input } from '../components/Input';
import { ItemGit } from '../components/ItemGit'; 
import api from '../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Home( { navigation} ) { 
  const [ nickname,setNickname ] = useState('');
  const [ users,setUsers ] = useState([]); 

  const keyAsyncStorage = "@git:Usuarios";

  function navigationDetails( login, index){
      navigation.navigate('details', {user: login, index: index , deletar} );
  }
  async function clear() {
    await AsyncStorage.clear();
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
      const vetData = [...users, data]
      await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(vetData));

      Keyboard.dismiss();
      //console.log(obj);
      //console.log(data);
    } catch (error) {
      Alert.alert("Erro ao salvar nicknames");
      console.error(error);
    } 
  }
  async function deletar(id, index) {
    //const newData = gits.filter(item => item.id != id);
    users.splice(index, 1)
    //setUsers(users); 
    await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(users));
    await loadData()
  }
  async function loadData() {
    try {
      const retorno = await AsyncStorage.getItem(keyAsyncStorage);
      const dadosGits = await JSON.parse(retorno)
      console.log('loadData -> ', dadosGits);
      setUsers(dadosGits || []);
    } catch (error) {
      Alert.alert("Erro na leitura  dos gitss");
    }
  }
  useEffect(() => {
    // clear()
    loadData();
  }, []);

  return (

    <View style={GlobalStyles.screenContainer}> 
      <AntDesign name="github" size={98} color={Theme.colors.primary} />  
      <Text style={styles.title}>GIT.Networking </Text>
      <Input placeholder="Digite o nickname do usuário"  onChangeText={setNickname} 
       onPress={ handleSearchUser } />

     
      <FlatList  data={users}  
          keyExtractor={item => item.id.toString()} 
          renderItem={ ({item, index}) =>  (
              <ItemGit name={item.login} onPress={ () => navigationDetails( item.login , index)}/>
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