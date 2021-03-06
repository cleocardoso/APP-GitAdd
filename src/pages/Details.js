import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, Keyboard ,FlatList} from 'react-native';
import { ButtonDelete } from '../components/ButtonDelete';
import GlobalStyles from '../styles/GlobalStyles';
import Theme from '../styles/Theme';
import api from '../services/Api';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation'

export function Details({ route, navigation }) {

  const [user, setUser] = useState({});
 

  async function carregarUsuarios(nickname) {
    try {
      response = await api.get('/users/' + nickname);
      const { data } = response;

      const obj = {
        id: data.id,
        name: data.name,
        login: data.login,
        company: data.company,
        bio: data.bio,
        avatar_url: data.avatar_url,
        url: data.url,
        followers: data.followers,
        public_repos: data.public_repos,
      }
      setUser(obj);
      //console.log(obj);
      //console.log(data);

    } catch (error) {
     
      console.error(error);
    }
  }
  
  function remove(){
     route.params.deletar(user, route.params.index)
     navigation.pop()
  }

  useEffect(() => {
    const { user } = route.params;
    carregarUsuarios(user);
  }, []);

  return (
    <View style={GlobalStyles.screenContainer}>
      <View style={styles.perfil}>
        <Image style={styles.tinyLogo} source={{ uri: user.avatar_url }} />
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.textSmall}>{user.url}</Text>
        {user.company && <Text style={styles.textRegular}>Empresa: {user.company}</Text>}

        <Text style={styles.textRegular}> {user.bio}</Text>

      </View>

      <View style={styles.info}>

        <View >
          <Text style={styles.titleInfo}>Repositórios</Text>
          <View style={styles.infoCount}>
            <MaterialCommunityIcons name="source-repository" size={50} color="black" />
            <Text style={styles.textCount}>{user.public_repos}</Text>
          </View>
        </View>

        <View >
          <Text style={styles.titleInfo}>Seguidores</Text>
          <View style={styles.infoCount}>
            <FontAwesome5 name="users" size={40} color="black" />
            <Text style={styles.textCount}>{user.followers}</Text>
          </View>
        </View>
      </View>
    
      <ButtonDelete name={user} onPress={() => remove()}/>
       
    </View>

  );
}

const styles = StyleSheet.create({
  perfil: {
    alignItems: 'center',
  },
  info: {
    marginTop: 70,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
  },
  infoCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textCount: {
    fontSize: 25,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.black
  },
  titleInfo: {
    fontSize: 22,
    fontFamily: Theme.fonts.rebotoRegular,
  },
  title: {
    fontSize: 30,
    fontFamily: Theme.fonts.robotoBold,
    color: Theme.colors.primary,
  },
  textSmall: {
    fontSize: 14,
    fontFamily: Theme.fonts.rebotoRegular,
    color: Theme.colors.gray
  },
  textRegular: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: Theme.fonts.rebotoRegular,
    color: Theme.colors.gray
  },

  tinyLogo: {
    width: 140,
    height: 140,
    borderRadius: 90,
  },
  button: {
    width: 140,
    height: 140,
    borderRadius: 90,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

})